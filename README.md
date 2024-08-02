# Code Snippets App

Simple code-snippet's viewer for personal use
Best used as a stand-alone Chrome based app 

![https://i.postimg.cc/x16GnHhd/code-snippets.png](https://i.postimg.cc/x16GnHhd/code-snippets.png)

## Stack
- Next.js
- Appwrite - to save snippets and provide OAuth login

## To-Use

Not entirely setup for distribution, but feel free to use and tweak to your likining.

### Remember to change these details

- Setup .env details

```
APPWRITE_DATABASE_ENDPOINT=''
APPWRITE_PROJECT_ID=''
APPWRITE_API_KEY=''

// For OAuth App Client
GITHUB_ID=''
GITHUB_SECRET=''

// your email, must match email reported by OAuth provider
NEXT_PUBLIC_ADMIN_EMAIL='' 

// For Next-Auth
NEXTAUTH_SECRET = ''
NEXTAUTH_URL = ''
```

### Also you will find hard-coded database, collection and attribute names. Change these to match your setup

```
  // Ex. - Search API Call
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
    
    ```
