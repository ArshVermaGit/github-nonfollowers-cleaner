import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { LoginButton } from "@/components/auth/login-button";

export default async function Home() {
  const session = await auth();

  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 p-8">
      <div className="flex max-w-md flex-col items-center gap-4 text-center">
        <h1 className="text-4xl font-bold tracking-tight">
          GitHub Non-Followers Cleaner
        </h1>
        <p className="text-lg text-muted-foreground">
          Instantly find out who doesn&apos;t follow you back on GitHub and clean
          up your following list with one click.
        </p>
      </div>
      <div className="w-full max-w-xs">
        <LoginButton />
      </div>
    </div>
  );
}
