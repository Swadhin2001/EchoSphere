import { Client, Account, Databases, Storage, Avatars } from "appwrite";

export const setupInfo = {
    projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
    endpoint: import.meta.env.VITE_APPWRITE_API_ENDPOINT_URL,
    storageId: import.meta.env.VITE_APPWRITE_STORAGE_ID,
    databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
    savesCollectionId: import.meta.env.VITE_APPWRITE_SAVES_COLLECTIONS_ID,
    usersCollectionId: import.meta.env.VITE_APPWRITE_USERS_COLLECTIONS_ID,
    postsCollectionId: import.meta.env.VITE_APPWRITE_POSTS_COLLECTIONS_ID,
}

export const client = new Client();

client.setEndpoint (setupInfo.endpoint);
client.setProject (setupInfo.projectId);

export const account = new Account(client);
export const database = new Databases(client);
export const storage = new Storage(client);
export const avatar = new Avatars(client);