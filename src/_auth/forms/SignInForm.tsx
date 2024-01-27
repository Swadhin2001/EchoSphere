"use client"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { sign_in } from "@/lib/FormSchema"



const SignInForm = () => {

  const form = useForm<z.infer<typeof sign_in>>({
    resolver: zodResolver(sign_in),
    defaultValues: {
      username: '',
      password: '',
    },
  })

  function onSubmit(values: z.infer<typeof sign_in>) {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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