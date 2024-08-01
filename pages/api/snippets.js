import { client, databases } from "../../lib/initAppwrite";
import { Query } from "node-appwrite";

export default async function handler(req, res) {
  const result = await databases.listDocuments(
    "public", // databaseId
    "snippets", // collectionId
    [Query.orderDesc("$updatedAt")] // queries (optional)
  );

  res.status(200).json(result.documents);
}
