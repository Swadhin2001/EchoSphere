import {
    useQuery,
    useMutation,
    useQueryClient,
    useInfiniteQuery
} from '@tanstack/react-query'
import signUp, { signinAccount } from '../appwrite/api'
import { signUpUser } from '@/types'

export const useCreateUserAccount =()=>{
    return useMutation ({
        mutationFn: (user: signUpUser)=> signUp(user)
    })
}
export const useSigninAccount =()=>{
    return useMutation ({
        mutationFn: (user: {
            email: string,
            password: string
        })=> signinAccount(user)
    })
}