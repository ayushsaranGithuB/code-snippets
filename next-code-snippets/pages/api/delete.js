// admin only page
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";

// import appwrite
const sdk = require("node-appwrite");

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
  
  if (!session) {
    res.status(401).json({ error: "Unauthorized: Must be logged In" });
    return;
  }
  if (session.user.email !== process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
    res.status(401).json({ error: "Unauthorized: Must be an admin" });
    return;
  }

  const { id } = req.body;

  async function deleteSnippet() {
    const response = await databases.deleteDocument("public", "snippets", id);
    return response;
  }

  const response = await deleteSnippet();
  // console.log(response);

  res.status(200).json(response);
}
