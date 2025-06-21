"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import type { TodoResponse } from "@/types/types";
import { CREATE_TODO } from "@/graphql/mutation";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import Loading from "../layout/Loading";
import { GET_ALL_TODOS } from "@/graphql/queries";

const inputFormSchema = z.object({
  title: z.string().min(2).max(50),
  description: z.string().max(200).optional(),
});

function TodoInputForm() {
  const [showDescription, setShowDescription] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const form = useForm<z.infer<typeof inputFormSchema>>({
    resolver: zodResolver(inputFormSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });
  const [addTodoMutation, { loading }] = useMutation<{
    createTodo: TodoResponse;
  }>(CREATE_TODO, { refetchQueries: [GET_ALL_TODOS] });

  const handleDescriptionVisibility = () => {
    setShowDescription((prev) => !prev);
    if (!showDescription) {
      form.setValue("description", "");
    }
  };
  const onSubmit = async (formData: z.infer<typeof inputFormSchema>) => {
    try {
      setError(null); // Clear previous errors
      console.log("Submitting form data:", formData);

      // Ensure the description is not empty string but null/undefined if not provided
      const description = formData.description?.trim()
        ? formData.description
        : null;

      const { data } = await addTodoMutation({
        variables: {
          input: {
            title: formData.title.trim(),
            description: description,
          },
        },
      });

      if (data?.createTodo?.success && data?.createTodo?.todo) {
        toast.success(data.createTodo.message || "Todo created successfully");
        // Reset form after successful submission
        form.reset({ title: "", description: "" });
      } else {
        toast.error(data?.createTodo?.message || "Failed to create todo");
      }
    } catch (error) {
      console.error("Submission error:", error);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError(String(error));
      }
      toast.error("An error occurred while creating the todo");
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <Form {...form}>
      {" "}
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-4xl mx-auto mt-24 space-y-6"
      >
        {" "}
        <div className="flex gap-4 items-start">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input
                    placeholder="Enter Title"
                    {...field}
                    className="bg-white/80 border-[#6949ff]/20 text-gray-800 placeholder:text-gray-400 focus:border-[#6949ff] focus:ring-[#6949ff]/20 h-11"
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <Button
            type="button"
            onClick={handleDescriptionVisibility}
            className="bg-white/80 hover:bg-white text-[#6949ff] border border-[#6949ff]/30 hover:border-[#6949ff] transition-colors h-11"
          >
            {showDescription ? "Remove Description" : "Add Description"}
          </Button>
          <Button
            type="submit"
            className="bg-gradient-to-r from-[#6949ff] to-[#c961ff] hover:from-[#5f41e8] hover:to-[#b154e8] text-white transition-all h-11"
          >
            Submit
          </Button>
        </div>
        {showDescription && (
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#6949ff] font-semibold">
                  Description
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter description"
                    type="text-area"
                    {...field}
                    className="bg-white/80 border-[#6949ff]/20 text-gray-800 placeholder:text-gray-400 focus:border-[#6949ff] focus:ring-[#6949ff]/20"
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
        )}
      </form>
    </Form>
  );
}

export default TodoInputForm;
