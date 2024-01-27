"use client"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { sign_up } from "@/lib/FormSchema"
import { Link } from "react-router-dom"
import signUp from "@/lib/appwrite/api"
const SignUpForm = () => {

  const form = useForm<z.infer<typeof sign_up>>({
    resolver: zodResolver(sign_up),
    defaultValues: {
      username: '',
      password: '',
      name:'',
      email: '',
    },
  })

  async function onSubmit(values: z.infer<typeof sign_up>) {
    try {
      const newUser = await signUp(values);
      console.log(newUser)
    } 
    catch (error) {
      console.log (error);  
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="Password" {...field} type="password"/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />          
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} type="email"/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Sign Up</Button>
        <div>Already have an account? <Link to = '/sign-in'>Sign In</Link></div>
      </form>
    </Form>
  )
}

export default SignUpForm