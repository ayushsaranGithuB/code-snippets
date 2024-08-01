import { client, databases } from "@/lib/initAppwrite";

export default async function handler(req, res) {
  const { id } = req.query;
  const response = await databases.getDocument("public", "snippets", id);

  res.status(200).json(response);
}
