import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";
import { useAuth } from "@/context/AuthContext";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "@/graphql/mutation";
import type { AuthResponse } from "@/types/types";
import { toast } from "sonner";

const loginSchema = z.object({
  email: z
    .string()
    .email("Invalid email address")
    .nonempty("Email is required"),
  password: z.string().nonempty("Password is required"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

function LoginForm() {
  const { login } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [loginMutation] = useMutation<{
    loginUser: AuthResponse;
  }>(LOGIN_USER);
  const onSubmit = async (formData: LoginFormValues) => {
    try {
      const { data } = await loginMutation({
        variables: {
          input: {
            email: formData.email,
            password: formData.password,
          },
        },
      });

      if (
        data?.loginUser?.success &&
        data?.loginUser?.token &&
        data?.loginUser?.user
      ) {
        login(data.loginUser.token, data.loginUser.user);
        toast.success(data?.loginUser?.message || "Login successful!", {
          duration: 3000,
        });
        setError(null);
      } else {
        toast.error(
          data?.loginUser?.message || "Login failed. Please try again.",
          {
            duration: 3000,
          }
        );
        setError(data?.loginUser?.message || "Login failed. Please try again.");
      }
    } catch (err) {
      setError("Invalid email or password. Please try again.");
    }
  };
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
                <Input placeholder="Enter Email" type="email" {...field} />
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
                <Input
                  placeholder="Enter Password"
                  type="password"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

export default LoginForm;
