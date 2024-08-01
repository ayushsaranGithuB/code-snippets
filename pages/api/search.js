import { client, databases } from "../../lib/initAppwrite";
import { Query } from "appwrite";

export default async function handler(req, res) {
  const keyword = req.body.keyword;
  console.log("keyword is", keyword);
  const result = await databases.listDocuments(
    "public", // databaseId
    "snippets", // collectionId
    [
      Query.or([
        Query.search("title", keyword),
        Query.search("snippet", keyword),
        Query.contains("tags", keyword),
      ]),
    ] // queries (optional)
  );
  res.status(200).json(result.documents);
}
