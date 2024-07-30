"use client";

import { LoadingSpinner } from "@/assets/loading-spinner";
import {
  EditUserSchema,
  EditUserSchemaType,
  UserUsernameSchema,
} from "@/lib/schemas/users";
import { UsersTable } from "@/server/db/types";
import { useEditUserMutation } from "@/service/users";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { DayPicker } from "./ui/day-picker";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { SearchInput } from "./ui/search-input";
import { Textarea } from "./ui/textarea";

type UsernameAvailability = "loading" | "available" | "unavailable";

interface Props {
  user: UsersTable;
}

export function EditUserForm({ user }: Props) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const form = useForm<EditUserSchemaType>({
    resolver: zodResolver(EditUserSchema),
    defaultValues: {
      ...user,
      biography: user.biography ?? undefined,
      picture: user.picture ?? undefined,
      dateOfBirth: user.dateOfBirth ?? undefined,
    },
  });

  const [usernameAvailableStatus, setUsernameAvailableStatus] =
    useState<UsernameAvailability>("available");

  async function checkUsernameAvailability(username: string) {
    try {
      UserUsernameSchema.parse({ username });
    } catch (_error) {
      setUsernameAvailableStatus("unavailable");
      form.setError("username", {
        message: "Username is invalid",
        type: "validate",
      });
      return;
    }

    if (username === user.username) {
      setUsernameAvailableStatus("available");
      form.clearErrors("username");
      return;
    }

    try {
      setUsernameAvailableStatus("loading");
      const { data } = await axios.get<{ available: boolean }>(
        `/api/users/${username}/available`,
      );

      if (data.available) {
        setUsernameAvailableStatus("available");
        form.clearErrors("username");
      } else {
        setUsernameAvailableStatus("unavailable");
        form.setError("username", {
          message: "Username is already taken",
          type: "validate",
        });
      }
    } catch (_error) {
      setUsernameAvailableStatus("unavailable");
      form.setError("username", {
        message: "Could not check username availability",
        type: "validate",
      });
    }
  }

  const { mutate: editUser, isPending } = useEditUserMutation({
    onSuccess: (data) => {
      toast.success("User updated");
      queryClient.invalidateQueries({ queryKey: ["users", data.username] });
      queryClient.invalidateQueries({ queryKey: ["users", "me"] });
      queryClient.invalidateQueries({
        queryKey: ["users", data.username, "posts"],
      });
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
      router.refresh();
      router.push(`/users/${data.username}`);
    },
    onError: (error) => {
      const { response } = error;
      toast.error(response?.data ?? "Something went wrong");
    },
  });

  function onSubmit(data: EditUserSchemaType) {
    editUser({
      ...data,
      dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : undefined,
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-4">
        <div className="flex items-center gap-3">
          <FormField
            control={form.control}
            name="username"
            disabled={isPending}
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <div className="flex items-center gap-3">
                    <SearchInput
                      onSearch={(query) => {
                        checkUsernameAvailability(query);
                      }}
                      loading={usernameAvailableStatus === "loading"}
                      placeholder="type your username"
                      {...field}
                      onChange={(e) => {
                        setUsernameAvailableStatus("loading");
                        field.onChange(e);
                      }}
                    />

                    <AvailabilityStatus status={usernameAvailableStatus} />
                  </div>
                </FormControl>
                <FormDescription>This is your public username.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="firstName"
          disabled={isPending}
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder="type your username" {...field} />
              </FormControl>
              <FormDescription>This is your public first name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lastName"
          disabled={isPending}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input placeholder="type your username" {...field} />
              </FormControl>
              <FormDescription>This is your public last name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="dateOfBirth"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date of birth</FormLabel>
              <DayPicker
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                disabled={(date) =>
                  date > new Date() || date < new Date("1900-01-01")
                }
              />
              <FormDescription>
                Your date of birth is used to calculate your age.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="biography"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Biography</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormDescription>
                Tell us a little about yourself.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          isLoading={isPending}
          disabled={
            isPending ||
            usernameAvailableStatus === "unavailable" ||
            usernameAvailableStatus === "loading"
          }
        >
          Submit
        </Button>
      </form>
    </Form>
  );
}

function AvailabilityStatus({ status }: { status: UsernameAvailability }) {
  switch (status) {
    case "loading":
      return <LoadingSpinner fill="white" />;
    case "available":
      return <CheckCircleIcon className="h-6 w-6 text-green-500" />;
    case "unavailable":
      return <XCircleIcon className="h-6 w-6 text-red-500" />;
  }
}
