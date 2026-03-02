import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SignUpTab from "./sign-up-tab";
import SignInTab from "./sign-in-tab";

export default function AuthTabs() {
  return (
    <Tabs defaultValue="sign-up" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="sign-up">Sign Up</TabsTrigger>
        <TabsTrigger value="sign-in">Sign In</TabsTrigger>
      </TabsList>
      <TabsContent value="sign-up">
        <SignUpTab />
      </TabsContent>
      <TabsContent value="sign-in">
        <SignInTab />
      </TabsContent>
    </Tabs>
  );
}
