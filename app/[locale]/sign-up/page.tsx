"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

type SignUpValues = {
  name: string;
  email: string;
  password: string;
};

export default function SignUpPage() {
  const form = useForm<SignUpValues>({
    defaultValues: { name: "", email: "", password: "" },
    mode: "onTouched",
  });

  function onSubmit(values: SignUpValues) {
    // TODO: integrate API
    console.log("sign-up submit", values);
  }

  return (
      <div className="mx-auto w-full max-w-md px-4 py-10">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div
                  className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-primary/10 blur-[120px]"></div>
              <div
                  className="absolute bottom-[10%] right-[10%] w-[30%] h-[30%] rounded-full bg-purple-500/10 blur-[100px]"></div>
          </div>
          <Card className="shadow-lg">
              <CardHeader>
                  <CardTitle className="text-2xl">Create your account</CardTitle>
                  <CardDescription>Join thousands of writers building their audience.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 gap-3">
                      <Button variant="outline" className="w-full">
                          Continue with Google
                      </Button>
                      <Button variant="outline" className="w-full">
                          Continue with GitHub
                      </Button>
                  </div>

                  <div className="relative py-2">
                      <div className="absolute inset-0 flex items-center" aria-hidden="true">
                          <span className="w-full border-t border-gray-200 dark:border-border-dark"/>
                      </div>
                      <div className="relative flex justify-center text-xs">
                          <span
                              className="bg-white dark:bg-surface-dark px-2 text-gray-500">Or continue with email</span>
                      </div>
                  </div>

                  <Form {...form}>
                      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
                          <FormField
                              control={form.control}
                              name="name"
                              render={({field}) => (
                                  <FormItem>
                                      <FormLabel>Full name</FormLabel>
                                      <FormControl>
                                          <Input placeholder="Jane Doe" autoComplete="name" {...field} />
                                      </FormControl>
                                      <FormMessage/>
                                  </FormItem>
                              )}
                          />

                          <FormField
                              control={form.control}
                              name="email"
                              render={({field}) => (
                                  <FormItem>
                                      <FormLabel>Email</FormLabel>
                                      <FormControl>
                                          <Input type="email" placeholder="you@example.com"
                                                 autoComplete="email" {...field} />
                                      </FormControl>
                                      <FormMessage/>
                                  </FormItem>
                              )}
                          />

                          <FormField
                              control={form.control}
                              name="password"
                              render={({field}) => (
                                  <FormItem>
                                      <FormLabel>Password</FormLabel>
                                      <FormControl>
                                          <Input type="password" placeholder="••••••••"
                                                 autoComplete="new-password" {...field} />
                                      </FormControl>
                                      <FormMessage/>
                                  </FormItem>
                              )}
                          />

                          <Button type="submit" className="w-full">Create account</Button>
                      </form>
                  </Form>

                  <p className="text-xs text-gray-500 dark:text-gray-400">
                      By continuing, you agree to our <Link href="#" className="text-primary hover:underline">Terms of
                      Service</Link> and <Link href="#" className="text-primary hover:underline">Privacy Policy</Link>.
                  </p>
              </CardContent>
              <CardFooter className="flex items-center justify-center">
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                      Already have an account? {" "}
                      <Link href="#" className="text-primary hover:underline">Log in</Link>
                  </p>
              </CardFooter>
          </Card>
      </div>
  );
}
