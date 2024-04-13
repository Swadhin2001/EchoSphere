import * as z from "zod"

export const sign_up = z.object({
    username: z.string().min(2, 'Invalid Username').max(50),
    password: z.string().min (8, 'Password require minimum of 8 characters'),
    name: z.string().min(2, 'Invalid Name').max(50),
    email: z.string().email('Enter a valid Email address'),
})

export const sign_in = z.object({
    email: z.string().email('Enter a valid Email address'),
    password: z.string().min (8, 'Password require minimum of 8 characters'),
})