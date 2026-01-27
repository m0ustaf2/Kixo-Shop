"use client";
import { Button } from "@/components/ui/button";
import { Calendar, LogOut, Mail, Shield } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  if (status === "loading") {
    return (
      <div className="min-h-screen  flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen  flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-xl">
          <p className="text-gray-600">Please sign in to view your profile</p>
        </div>
      </div>
    );
  }

  const expiresDate = new Date(session.expires);
  const formattedExpiry = expiresDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-background text-foreground">
      <div className="max-w-3xl mx-auto">
        {/* Header Card */}
        <div className="mb-6 overflow-hidden rounded-3xl bg-card text-card-foreground shadow-2xl">
          {/* Cover gradient */}
          <div className="h-32 bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500" />

          {/* Profile content */}
          <div className="px-8 pb-8">
            {/* Avatar */}
            <div className="relative -mt-16 mb-4">
              <div
                className="
              flex h-32 w-32 items-center justify-center rounded-full
              bg-linear-to-br from-indigo-600 to-purple-600
              text-4xl font-bold text-white
              shadow-xl
              border-4 border-background
            "
              >
                {getInitials(session.user.name)}
              </div>
            </div>

            {/* Name and Role */}
            <div className="mb-6">
              <h1 className="mb-2 text-3xl font-bold capitalize">
                {session.user.name}
              </h1>

              <div className="flex items-center justify-between">
                <span
                  className="
                inline-flex items-center rounded-full px-3 py-1 text-sm font-medium
                bg-indigo-100 text-indigo-800
                dark:bg-indigo-500/15 dark:text-indigo-300
              "
                >
                  {session.user.role}
                </span>

                <p className="font-medium text-green-600 dark:text-green-400">
                  ● Active
                </p>
              </div>
            </div>

            {/* Info Grid */}
            <div className="space-y-4">
              {/* Email */}
              <div
                className="
              flex items-start space-x-4 rounded-xl p-4
              bg-muted transition-colors
              hover:bg-muted/80
            "
              >
                <div className="shrink-0">
                  <div
                    className="
                  flex h-10 w-10 items-center justify-center rounded-lg
                  bg-indigo-100
                  dark:bg-indigo-500/15
                "
                  >
                    <Mail className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="mb-1 text-sm font-medium text-muted-foreground">
                    Email Address
                  </p>
                  <p className="break-all">{session.user.email}</p>
                </div>
              </div>

              {/* Role */}
              <div
                className="
              flex items-start space-x-4 rounded-xl p-4
              bg-muted transition-colors
              hover:bg-muted/80
            "
              >
                <div className="shrink-0">
                  <div
                    className="
                  flex h-10 w-10 items-center justify-center rounded-lg
                  bg-purple-100
                  dark:bg-purple-500/15
                "
                  >
                    <Shield className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="mb-1 text-sm font-medium text-muted-foreground">
                    Account Role
                  </p>
                  <p className="capitalize">{session.user.role}</p>
                </div>
              </div>

              {/* Session Expiry */}
              <div
                className="
              flex items-start space-x-4 rounded-xl p-4
              bg-muted transition-colors
              hover:bg-muted/80
            "
              >
                <div className="shrink-0">
                  <div
                    className="
                  flex h-10 w-10 items-center justify-center rounded-lg
                  bg-pink-100
                  dark:bg-pink-500/15
                "
                  >
                    <Calendar className="h-5 w-5 text-pink-600 dark:text-pink-400" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="mb-1 text-sm font-medium text-muted-foreground">
                    Session Expires
                  </p>
                  <p>{formattedExpiry}</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex gap-4">
              <Button
                size="lg"
                asChild
                className="
              flex-1 rounded-xl font-medium
              bg-indigo-600 text-white
              hover:bg-indigo-700
              shadow-lg hover:shadow-xl
            "
              >
                <Link href="/updatepassword">Edit Password</Link>
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={() => signOut({ callbackUrl: "/login" })}
                className="
              rounded-xl font-medium
              border-2 border-border
              text-foreground
              flex items-center gap-2
            "
              >
                <LogOut className="h-5 w-5" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
