import { ID } from "appwrite";
import { account, avatar } from "./config";
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
        console.log ("success")
        return newAccount;
    } 
    catch (error) {
        console.log(error);    
    }
}