"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2 } from "lucide-react";

type User = {
  id: string;
  name: string;
  email: string;
  photoUrl?: string;
};

export default function UserCard() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const accessKey = localStorage.getItem("accessKey");

        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}`, {
          headers: {
            Authorization: `Bearer ${accessKey}`,
          },
        });

        setUser(response.data);
      } catch (err: any) {
        setError("Failed to fetch user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return (
      <Card className="w-[350px]">
        <CardContent className="flex items-center justify-center py-10">
          <Loader2 className="h-6 w-6 animate-spin" />
        </CardContent>
      </Card>
    );
  }

  if (error || !user) {
    return (
      <Card className="w-[350px]">
        <CardContent className="py-6 text-center text-sm text-red-500">
          {error || "No user found"}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-[350px] shadow-md">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar>
          <AvatarImage src={user.photoUrl} alt={user.name} />
          <AvatarFallback>
            {user.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div>
          <CardTitle className="text-lg">{user.name}</CardTitle>
          <p className="text-sm text-muted-foreground">{user.email}</p>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">User ID: {user.id}</p>
      </CardContent>
    </Card>
  );
}
