"use client";

import axios from "axios";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { User } from "@/types/user";

export default function UserCard({
  user,
  reFetchUser,
}: {
  user: User;
  reFetchUser: () => Promise<void>;
}) {
  const updateStatus = async () => {
    await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/users/${user!.id}`, {
      status: user!.status === "ACTIVE" ? "INACTIVE" : "ACTIVE",
    });
    await reFetchUser();
  };

  return (
    <>
      <Card className="w-100 shadow-md">
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar>
            <AvatarImage src={user!.photoUrl} alt={user!.name} />
            <AvatarFallback>{user!.name}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-lg">{user!.name}</CardTitle>
            <p className="text-sm text-muted-foreground">{user!.email}</p>
          </div>
        </CardHeader>
        <CardContent>
          <Button onClick={updateStatus}>
            Mark as {user!.status === "ACTIVE" ? "Inactive" : "Active"}
          </Button>
        </CardContent>
      </Card>
    </>
  );
}
