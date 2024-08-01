// admin only page
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";

// import appwrite
const sdk = require("node-appwrite");
const { Query, ID } = require("node-appwrite");

// setup Client
const client = new sdk.Client();

client
  .setEndpoint(process.env.APPWRITE_DATABASE_ENDPOINT)
  .setProject(process.env.APPWRITE_PROJECT_ID)
  .setKey(process.env.APPWRITE_API_KEY);

// console.log(process.env.APPWRITE_DATABASE_ENDPOINT);
// console.log(process.env.APPWRITE_PROJECT_ID);
// console.log(process.env.APPWRITE_API_KEY);

const databases = new sdk.Databases(client);

export default async function handler(req, res) {
  // admin only
  const session = await getServerSession(req, res, authOptions);
  if (!session || session.user.email !== process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

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
  // console.log(response);

  res.status(200).json(response);
}
