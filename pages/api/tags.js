import { client, databases } from "../../lib/initAppwrite";
import { Query } from "node-appwrite";

export default async function handler(req, res) {
  const result = await databases.listDocuments(
    "public", // databaseId
    "snippets", // collectionId
    [] // queries (optional)
  );

  let tags = [];

  result.documents.forEach((doc) => {
    tags = tags.concat(doc.tags);
  });

  tags = [...new Set(tags)];

  res.status(200).json(tags);
}
