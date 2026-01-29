"use client";

import Link from "next/link";

import { use, useEffect, useState } from "react";

import withAdmin from "@/global/auth/hoc/withAdmin";
import type { components } from "@/global/backend/apiV1/schema";
import client from "@/global/backend/client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { ArrowLeft, Calendar, Clock, Shield, User } from "lucide-react";

type MemberWithUsernameDto = components["schemas"]["MemberWithUsernameDto"];

export default withAdmin(function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: idStr } = use(params);
  const id = parseInt(idStr);

  const [member, setMember] = useState<MemberWithUsernameDto | null>(null);

  useEffect(() => {
    client
      .GET("/member/api/v1/adm/members/{id}", {
        params: {
          path: {
            id,
          },
        },
      })
      .then((res) => res.data && setMember(res.data));
  }, [id]);

  if (member == null) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-muted-foreground">로딩중...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <Button variant="ghost" asChild>
          <Link href="/adm/members">
            <ArrowLeft className="mr-2 h-4 w-4" />
            목록으로
          </Link>
        </Button>
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage
                src={member.profileImageUrl}
                alt={`${member.name} 프로필`}
              />
              <AvatarFallback className="text-2xl">
                {member.name?.[0]}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <CardTitle className="text-2xl">{member.name}</CardTitle>
                {member.admin && (
                  <Badge variant="default">
                    <Shield className="mr-1 h-3 w-3" />
                    관리자
                  </Badge>
                )}
              </div>
              <CardDescription className="mt-1">
                @{member.username}
              </CardDescription>
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
                <div className="font-medium">{member.id}</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-muted">
                <Calendar className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">가입일</div>
                <div className="font-medium">
                  {new Date(member.createdAt).toLocaleString("ko-KR")}
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
                  {new Date(member.modifiedAt).toLocaleString("ko-KR")}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
});
