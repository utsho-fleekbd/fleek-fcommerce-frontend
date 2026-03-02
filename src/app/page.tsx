"use client";

import useAuthStore from "@/store/authStore";
import UserCard from "./_components/user-card";
import AuthTabs from "./_components/auth-tabs";

export default function Home() {
  const { authenticated } = useAuthStore();

  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      {authenticated ? <UserCard /> : <AuthTabs />}
    </div>
  );
}
