import { Client, Databases } from "appwrite";

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1") // Your API Endpoint
  .setProject("66a61090003ce158d647"); // Your project ID

const databases = new Databases(client);

export { client, databases };
