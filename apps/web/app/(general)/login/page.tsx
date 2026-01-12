"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { supabase as sharedSupabase } from "sgk-commanders-shared";
import { usersSchema } from "sgk-commanders-shared/dist/zodSchema";

const supabase = sharedSupabase.supabase

type LoginFormValues = {
  email: string;
  code: string;
  remember?: boolean;
};

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [step, setStep] = React.useState<"email"|"code">("email");

  const form = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      code: "",
      remember: false,
    },
    mode: "onTouched",
  });

  async function onSubmit(values: LoginFormValues) {

    if (step === "email") {
      try {
        usersSchema.pick({email:true}).parse({email:values.email})
       
      } catch (error) {
        console.log("Invalid email");
        console.log(error);
      }
    }

    // Try sign in with email/password using Supabase
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithOtp({
        email: values.email,
        options:{
          shouldCreateUser:true,
          data:{name:"Nkaze Anderson", email:values.email, phone:683403750, home_address:"Diedo, douala, cmr", accepted_terms:true} 
        }
      });
       setStep("code")
       console.log(data);
       
      if (error) throw error;

      // successful login -> redirect to dashboard
      router.push("/dashboard");
    } catch (err) {
      console.error("Email sign-in failed:", err);
      alert("Email sign-in failed. You can try anonymous login instead.");
    } finally {
      setLoading(false);
    }
  }

  async function handleAnonymousSignIn() {
    setLoading(true);
    try {
      // Prefer explicit anonymous sign-in if available
      // (some supabase versions expose signInAnonymously)
      // @ts-ignore
      if (
        supabase.auth &&
        typeof supabase.auth.signInAnonymously === "function"
      ) {
        // @ts-ignore
        const { data, error } = await supabase.auth.signInAnonymously();
        if (error) throw error;
      } else {
        // Fallback: create a temporary user with a generated email + password
        const email = `anon-${Date.now()}@example.com`;
        const password =
          Math.random().toString(36).slice(-10) +
          Date.now().toString(36).slice(-4);
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
        });
        if (signUpError) throw signUpError;
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (signInError) throw signInError;
      }

      // On success redirect to dashboard
      router.push("/dashboard");
    } catch (err) {
      console.error("Anonymous sign-in failed:", err);
      alert("Anonymous sign-in failed. Check console for details.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Sign in to your account</CardTitle>
          <CardDescription>
            Enter your email to continue.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">

              {
                step === "email" ?

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="you@example.com"
                          type="email"
                          {...field}
                          required
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                  :
                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>OTP Code</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="OTP code"
                          {...field}
                          required
                          minLength={6}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              }

              <Button type="submit" className="w-full">
                Sign in
              </Button>

              <div className="text-sm text-muted-foreground flex justify-between">
                <Link href="#" className="underline-offset-4 hover:underline">
                  Forgot password?
                </Link>
            
              </div>
            </form>
          </Form>
        </CardContent>
        <CardFooter />
      </Card>
    </div>
  );
}
