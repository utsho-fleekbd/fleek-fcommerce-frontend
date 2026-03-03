"use client";

import { useAuth } from "@/providers/auth-provider";
import { User } from "@/types/user";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { redirect } from "next/navigation";
import { toast } from "sonner";
import UserCard from "./_components/user-card";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export default function DashboardPage() {
  const { user, reFetchUser } = useAuth();
  const {
    data: users,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["fetch-all-users"],
    queryFn: () =>
      axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/users`)
        .then((res) => res.data),
  });

  if (!user) {
    toast("You have to be authenticated in order to access this page.");
    redirect("/sign-up");
  }

  if (user!.role === "USER") redirect("/dashboard/profile");

  if (isLoading) {
    return (
      <Card className="w-100">
        <CardContent className="flex items-center justify-center py-10">
          <Loader2 className="h-10 w-10 animate-spin" />
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card className="w-100">
        <CardContent className="py-6 text-center text-red-500">
          {error.message}
        </CardContent>
      </Card>
    );
  }

  return (
    <ul>
      {users.map((user: User) => (
        <li key={user.id}>
          <UserCard user={user} reFetchUser={reFetchUser} />
        </li>
      ))}
    </ul>
  );
}
