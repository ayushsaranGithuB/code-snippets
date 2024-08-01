// import appwrite
const sdk = require("node-appwrite");
const client = new sdk.Client();
// import Query
const { Query } = require("node-appwrite");

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("66a61090003ce158d647")
  .setKey(
    "ba4b15fe563644bfdc7c24cb6bcddba10feb9f534a781c70a650b3c21c44d7b4fecd40f7e165af24855225a65292ff01461bab27d6a878398ae645864b00dd4a03b6bf536aac72b71def8db6b664e12f4e5eb55201c63f29f212a8323114345088d8c78bc9d4f95683b78673521b7130cc2b5fff7631a6b5ba9de3efee11acd3"
  );

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

// Routes
app.get("/", async (req, res) => {
  async function getSnippets() {
    var snippets = await databases.listDocuments("public", "snippets", []);
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

// listen on port
app.listen(port, () => {
  console.log(`Server is running on port ${port}. http://localhost:${port}`);
});
