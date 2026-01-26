"use client";
import { Button } from "@/components/ui/button";
import { Calendar, LogOut, Mail, Shield } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  if (status === "loading") {
    return (
      <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
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
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-6">
          {/* Cover gradient */}
          <div className="h-32 bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500"></div>

          {/* Profile content */}
          <div className="px-8 pb-8">
            {/* Avatar */}
            <div className="relative -mt-16 mb-4">
              <div className="w-32 h-32 bg-linear-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-xl border-4 border-white">
                {getInitials(session.user.name)}
              </div>
            </div>

            {/* Name and Role */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {session.user.name}
              </h1>

              <div className="flex items-center justify-between">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                    {session.user.role}
                  </span>
                </div>
                <div>
                  <p className="text-green-600 font-medium">● Active</p>
                </div>
              </div>
            </div>

            {/* Info Grid */}
            <div className="space-y-4">
              {/* Email */}
              <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <div className="shrink-0">
                  <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <Mail className="w-5 h-5 text-indigo-600" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-500 mb-1">
                    Email Address
                  </p>
                  <p className="text-gray-900 break-all">
                    {session.user.email}
                  </p>
                </div>
              </div>

              {/* Role */}
              <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <div className="shrink-0">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Shield className="w-5 h-5 text-purple-600" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-500 mb-1">
                    Account Role
                  </p>
                  <p className="text-gray-900 capitalize">
                    {session.user.role}
                  </p>
                </div>
              </div>

              {/* Session Expiry */}
              <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <div className="shrink-0">
                  <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-pink-600" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-500 mb-1">
                    Session Expires
                  </p>
                  <p className="text-gray-900">{formattedExpiry}</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex gap-4">
              <Button
                asChild
                className="flex-1 bg-indigo-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-indigo-700 transition-colors shadow-lg hover:shadow-xl"
              >
                <Link href="/updatepassword">Edit Password</Link>
              </Button>
              <Button
                variant={"outline"}
                onClick={() => signOut({ callbackUrl: "/login" })}
                className="px-6 py-3 rounded-xl font-medium border-2 border-gray-200 cursor-pointer text-gray-700 flex items-center gap-2"
              >
                <LogOut className="w-5 h-5" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
