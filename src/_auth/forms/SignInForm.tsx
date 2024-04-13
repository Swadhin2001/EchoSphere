"use client"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { sign_in } from "@/lib/validation"
import { toast } from "@/components/ui/use-toast"
import { useUserContext } from "@/context/AuthContext"
import { useSigninAccount } from "@/lib/react-query/queriesAndMutation"



const SignInForm = () => {
  const navigate = useNavigate();

  const {mutateAsync:signinAccount} = useSigninAccount();
  const {checkAuthUser} = useUserContext();
  const form = useForm<z.infer<typeof sign_in>>({
    resolver: zodResolver(sign_in),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function onSubmit(values: z.infer<typeof sign_in>) {
    try{
      const session = await signinAccount({
        email: values.email,
        password: values.password,
      })
  
      if (!session){
        return toast({
          title: "Sign in Failed. Please try again",
          variant: "destructive"
        })
      }
  
      const isLoggedIn = await checkAuthUser();
      if (!isLoggedIn){
        return toast({
          title: "Sign in Failed. Please try again",
          variant: "destructive"
        })
      }
      else{
        navigate ('/');
        form.reset();
      }
      console.log(values)
    }
    catch (e){
      console.log (e);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
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
                <Input placeholder="Password" {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Sign In</Button>
        <div>Haven't an account? <Link to = '/sign-up' className="text-[violet]">Sign Up</Link></div>
      </form>
    </Form>
  )
}

export default SignInForm