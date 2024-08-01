// import appwrite
const sdk = require("node-appwrite");
const { Query, ID } = require("node-appwrite");

// setup Client
const client = new sdk.Client();

// import dotenv
require("dotenv").config();

client
  .setEndpoint(process.env.APPWRITE_DATABASE_ENDPOINT)
  .setProject(process.env.APPWRITE_PROJECT_ID)
  .setKey(process.env.APPWRITE_API_KEY);

const databases = new sdk.Databases(client);

// Express Setup
const express = require("express");
const app = express.Router();

app.get("/", async (req, res) => {
  async function getSnippets() {
    var snippets = await databases.listDocuments("public", "snippets", [
      Query.orderDesc("$updatedAt"),
    ]);
    return snippets;
  }

  const response = await getSnippets();

  res.render("home", { snippets: response.documents });
});

app.get("/search", async (req, res) => {
  const keyword = req.query.keyword;
  async function searchSnippets() {
    let results = await databases.listDocuments("public", "snippets", [
      Query.or([
        Query.search("title", keyword),
        Query.search("snippet", keyword),
        Query.contains("tags", keyword),
      ]),
    ]);

    return results;
  }

  const results = await searchSnippets();

  res.render("search", { snippets: results.documents, keyword: keyword });
});

// View a snippet
app.get("/snippet/:id", async (req, res) => {
  const id = req.params.id;

  async function getSnippet() {
    const response = await databases.getDocument("public", "snippets", id);

    return response;
  }

  const response = await getSnippet();

  res.render("home", { snippets: [response] });
});

// Create a new snippet
app.get("/create", (req, res) => {
  res.render("create");
});

app.post("/create", async (req, res) => {
  const { title, snippet, tags } = req.body;

  // split tags by comma into an array
  const tagArray = tags.split(",");
  const tagsTrimmed = tagArray.map((tag) => tag.trim());
  // remove empty tags
  const tagsFiltered = tagsTrimmed.filter((tag) => tag !== "");

  async function createSnippet() {
    const response = await databases.createDocument(
      "public",
      "snippets",
      ID.unique(),
      {
        title: title,
        snippet: snippet,
        tags: tagsFiltered,
      }
    );

    return response;
  }

  const response = await createSnippet();
  console.log(response);

  res.redirect("/snippet/" + response.$id);
});

// Edit a snippet
app.get("/edit/:id", async (req, res) => {
  const id = req.params.id;

  async function getSnippet() {
    const response = await databases.getDocument("public", "snippets", id);

    return response;
  }

  const snippet = await getSnippet();

  res.render("edit", { snippet: snippet });
});

app.post("/edit/:id", async (req, res) => {
  const id = req.params.id;
  const { title, snippet, tags } = req.body;

  // split tags by comma into an array
  const tagArray = tags.split(",");
  const tagsTrimmed = tagArray.map((tag) => tag.trim());
  // remove empty tags
  const tagsFiltered = tagsTrimmed.filter((tag) => tag !== "");

  async function updateSnippet() {
    const response = await databases.updateDocument("public", "snippets", id, {
      title: title,
      snippet: snippet,
      tags: tagsFiltered,
    });

    return response;
  }

  const response = await updateSnippet();
  console.log(response);

  res.redirect("/snippet/" + id);
});

module.exports = app;
