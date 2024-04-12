import { ID, Query } from "appwrite";
import { account, avatar, database, setupInfo } from "./config";
import { signUpUser } from "@/types";


export default async function signUp (user:signUpUser) {
    try {
        const newAccount  = await account.create(
            ID.unique(),
            user.email,
            user.password,
            user.name,
        )
        if (!newAccount) throw Error;
        
        const avatarUrl = avatar.getInitials(user.name);

        const saveData = saveCollectiontoDb ({
            accountID: newAccount.$id,
            username: user.username,
            name: newAccount.name,
            email: newAccount.email,
            imageURL: avatarUrl
        })
        // return newAccount;
        console.log ("success")
        return saveData;
    } 
    catch (error) {
        console.log("signUp function problem: ",error);    
    }
}

export async function saveCollectiontoDb (user:{
    accountID: string,
    username?: string,
    email : string,
    name: string,
    imageURL: URL
}){
    try{
        const newUser = await database.createDocument(
            setupInfo.databaseId,
            setupInfo.usersCollectionId,
            ID.unique(),
            user,
        )

        return newUser;
    }
    catch(e){
        console.log (e);
    }
}

export async function signinAccount (user: {
    email: string,
    password: string
}) {
    try{
        const session = await account.createEmailSession(user.email, user.password);

        return session;
    }
    catch(e){
        console.log(e);
    }
}

export async function getCurrentUser () {
    try{
        const currentAccount = await account.get();
        if (!currentAccount) throw Error;

        const currentUser = await database.listDocuments (
            setupInfo.databaseId,
            setupInfo.usersCollectionId,
            [Query.equal('accountID', currentAccount.$id)]
        )
        if (!currentUser) throw Error;
        return currentUser.documents[0];
    }
    catch (e){
        console.log (e);
        return null;
    }
}