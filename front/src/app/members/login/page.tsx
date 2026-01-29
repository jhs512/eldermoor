"use client";

import withLogout from "@/global/auth/hoc/withLogout";
import { FaGoogle } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { LogIn, MessageCircle } from "lucide-react";

export default withLogout(function Page() {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL as string;
  const frontendBaseUrl = process.env.NEXT_PUBLIC_FRONTEND_BASE_URL as string;
  const redirectUrl = encodeURIComponent(`${frontendBaseUrl}/members/me`);

  const loginUrl = (providerTypeCode: string) =>
    `${apiBaseUrl}/oauth2/authorization/${providerTypeCode}?redirectUrl=${redirectUrl}`;

  return (
    <div className="flex-1 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl flex items-center justify-center gap-2">
            <LogIn className="h-6 w-6" />
            로그인
          </CardTitle>
          <CardDescription>소셜 계정으로 로그인하세요</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2">
            <Button variant="outline" className="w-full" asChild>
              <a href={loginUrl("kakao")}>
                <MessageCircle className="mr-2 h-4 w-4" />
                카카오로 로그인
              </a>
            </Button>
            <Button variant="outline" className="w-full" asChild>
              <a href={loginUrl("google")}>
                <FaGoogle className="mr-2 h-4 w-4" />
                구글로 로그인
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
});
