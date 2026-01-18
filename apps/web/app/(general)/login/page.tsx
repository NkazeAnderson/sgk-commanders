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
import { Spinner } from "@/components/ui/spinner";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { supabase as sharedSupabase } from "sgk-commanders-shared";
import { usersSchema } from "sgk-commanders-shared/dist/zodSchema";


type LoginFormValues = {
  email: string;
  code: string;
  remember?: boolean;
};

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [step, setStep] = React.useState<"email"|"code">("email");
  const emailRef = React.useRef<string>("");
  
  const supabase = sharedSupabase.supabase
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
      emailRef.current = values.email;
      try {
        usersSchema.pick({email:true}).parse({email:values.email})
       
      } catch (error) {
        console.log("Invalid email");
        console.log(error);
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

    } catch (err) {
      console.error("Email sign-in failed:", err);
      alert("Email sign-in failed. You can try anonymous login instead.");
    } finally {
      setLoading(false);
    }
    }
    else if (step === "code") {
      // Try verify OTP code using Supabase
      setLoading(true); 
      try {
        const { error } = await supabase.auth.verifyOtp({
          email: emailRef.current,
          token: values.code,
          type: "email",
        });
        if (error) {
          throw error;
        }
          // successful login -> redirect to dashboard
      router.push("/dashboard");
    }
    catch (err) {
      console.error("OTP verification failed:", err);
      alert("OTP verification failed. Please check the code and try again.");
    }}

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
                {loading && <Spinner />}
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
