"use client";

import { useRouter } from "next/navigation";

import withLogout from "@/global/auth/hoc/withLogout";
import { useAuthContext } from "@/global/auth/hooks/useAuth";
import client from "@/global/backend/client";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { LogIn, Shield } from "lucide-react";

export default withLogout(function Page() {
  const router = useRouter();
  const { setLoginMember } = useAuthContext();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;

    const usernameInput = form.elements.namedItem(
      "username",
    ) as HTMLInputElement;
    const passwordInput = form.elements.namedItem(
      "password",
    ) as HTMLTextAreaElement;

    usernameInput.value = usernameInput.value.trim();

    if (usernameInput.value.length === 0) {
      toast.error("아이디를 입력해주세요.");
      usernameInput.focus();
      return;
    }

    if (usernameInput.value.length < 2) {
      toast.error("아이디를 2자 이상 입력해주세요.");
      usernameInput.focus();
      return;
    }

    passwordInput.value = passwordInput.value.trim();

    if (passwordInput.value.length === 0) {
      toast.error("비밀번호를 입력해주세요.");
      passwordInput.focus();
      return;
    }

    if (passwordInput.value.length < 2) {
      toast.error("비밀번호를 2자 이상 입력해주세요.");
      passwordInput.focus();
      return;
    }

    client
      .POST("/member/api/v1/members/login", {
        body: {
          username: usernameInput.value,
          password: passwordInput.value,
        },
      })
      .then((res) => {
        if (res.error) {
          toast.error(res.error.msg);
          return;
        }

        setLoginMember(res.data.data.item);

        toast.success(res.data.msg);
        router.replace(`/adm/members`);
      });
  };

  return (
    <div className="flex-1 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl flex items-center justify-center gap-2">
            <Shield className="h-6 w-6" />
            관리자 로그인
          </CardTitle>
          <CardDescription>관리자 계정으로 로그인하세요</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="username">아이디</Label>
              <Input
                id="username"
                type="text"
                name="username"
                placeholder="아이디를 입력하세요"
                autoFocus
                maxLength={30}
                autoComplete="username"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">비밀번호</Label>
              <Input
                id="password"
                type="password"
                name="password"
                placeholder="비밀번호를 입력하세요"
                maxLength={30}
                autoComplete="current-password"
              />
            </div>
            <Button type="submit" className="w-full mt-2">
              <LogIn className="mr-2 h-4 w-4" />
              로그인
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
});
