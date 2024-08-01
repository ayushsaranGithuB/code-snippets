// import appwrite
const sdk = require("node-appwrite");
const client = new sdk.Client();
// import Query
const { Query, ID } = require("node-appwrite");

// import dotenv
require("dotenv").config();
// console.log(process.env.APPWRITE_API_KEY);

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("66a61090003ce158d647")
  .setKey(process.env.APPWRITE_API_KEY);

const databases = new sdk.Databases(client);

// import express
const express = require("express");

// import body-parser
const bodyParser = require("body-parser");

// start app
const app = express();
// set port
const port = 3000;
// Middleware
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.use(express.static("public"));
// Middleware to parse URL-encoded data
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.get("/", async (req, res) => {
  async function getSnippets() {
    var snippets = await databases.listDocuments("public", "snippets", []);
    return snippets;
  }

  const response = await getSnippets();

  res.render("home", { snippets: response.documents });
});

// View a snippet
app.get("/:id", async (req, res) => {
  const id = req.params.id;

  async function getSnippet() {
    const response = await databases.getDocument("public", "snippets", id);

    return response;
  }

  const response = await getSnippet();

  res.render("home", { snippets: [response] });
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

  res.redirect("/");
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

  res.redirect("/" + id);
});

// listen on port
app.listen(port, () => {
  console.log(`Server is running on port ${port}. http://localhost:${port}`);
});
