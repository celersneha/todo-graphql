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
import { CREATE_USER } from "@/graphql/mutation";
import type { AuthResponse } from "@/types/types";
import { toast } from "sonner";

const registerSchema = z.object({
  username: z.string().min(2).max(50),
  email: z
    .string()
    .email("Invalid email address")
    .nonempty("Email is required"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .nonempty("Password is required"),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

function RegisterForm() {
  const { login } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });
  const [registerMutation] = useMutation<{
    createUser: AuthResponse;
  }>(CREATE_USER);

  const onSubmit = async (formData: RegisterFormValues) => {
    try {
      const { data } = await registerMutation({
        variables: {
          input: {
            username: formData.username,
            email: formData.email,
            password: formData.password,
          },
        },
      });
      if (
        data?.createUser?.success &&
        data?.createUser?.token &&
        data?.createUser?.user
      ) {
        login(data.createUser.token, data.createUser.user);
        toast.success(data?.createUser?.message || "Registration successful", {
          duration: 3000,
        });
        setError(null);
      } else {
        toast.error(data?.createUser?.message || "Registration failed", {
          duration: 3000,
        });
        setError(data?.createUser?.message || "Registration failed");
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("An error occurred during registration. Please try again.", {
        duration: 3000,
      });
      setError("An error occurred during registration. Please try again.");
    }
  };

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
                <Input placeholder="Enter Username" {...field} />
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

export default RegisterForm;
