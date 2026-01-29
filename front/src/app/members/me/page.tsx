"use client";

import withLogin from "@/global/auth/hoc/withLogin";
import { useAuthContext } from "@/global/auth/hooks/useAuth";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { Calendar, Clock, User } from "lucide-react";

export default withLogin(function Page() {
  const { loginMember } = useAuthContext();

  return (
    <div className="container mx-auto px-4 py-6">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage
                src={loginMember.profileImageUrl}
                alt={`${loginMember.name} 프로필`}
              />
              <AvatarFallback className="text-2xl">
                {loginMember.name?.[0]}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <CardTitle className="text-2xl">{loginMember.name}</CardTitle>
              <CardDescription className="mt-1">내 프로필</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Separator className="mb-6" />

          <div className="grid gap-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-muted">
                <User className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">회원 ID</div>
                <div className="font-medium">{loginMember.id}</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-muted">
                <Calendar className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">가입일</div>
                <div className="font-medium">
                  {new Date(loginMember.createdAt).toLocaleString("ko-KR")}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-muted">
                <Clock className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">최근 수정일</div>
                <div className="font-medium">
                  {new Date(loginMember.modifiedAt).toLocaleString("ko-KR")}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
});
