"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import { Suspense, useEffect, useState } from "react";

import withAdmin from "@/global/auth/hoc/withAdmin";
import type { components } from "@/global/backend/apiV1/schema";
import client from "@/global/backend/client";
import PaginationType1 from "@/global/components/PaginationType1";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Search, X } from "lucide-react";

type PageDtoMemberWithUsernameDto =
  components["schemas"]["PageDtoMemberWithUsernameDto"];
type KwType = "ALL" | "USERNAME" | "NICKNAME";
type Sort =
  | "ID"
  | "ID_ASC"
  | "USERNAME"
  | "USERNAME_ASC"
  | "NICKNAME"
  | "NICKNAME_ASC";

const KW_TYPE_LABELS: Record<KwType, string> = {
  ALL: "전체",
  USERNAME: "아이디",
  NICKNAME: "닉네임",
};

const SORT_OPTIONS: { value: Sort; label: string }[] = [
  { value: "ID", label: "최신순" },
  { value: "ID_ASC", label: "오래된순" },
  { value: "USERNAME", label: "아이디순" },
  { value: "USERNAME_ASC", label: "아이디 역순" },
  { value: "NICKNAME", label: "닉네임순" },
  { value: "NICKNAME_ASC", label: "닉네임 역순" },
];

function PageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);

  const page = Number(searchParams.get("page") || "1");
  const kw = searchParams.get("kw") || "";
  const kwType = (searchParams.get("kwType") as KwType) || "ALL";
  const sort = (searchParams.get("sort") as Sort) || "ID";

  const [memberPage, setMemberPage] =
    useState<PageDtoMemberWithUsernameDto | null>(null);

  useEffect(() => {
    client
      .GET("/member/api/v1/adm/members", {
        params: {
          query: {
            page,
            kw: kw || undefined,
            kwType: kw ? (kwType as never) : undefined,
            sort: sort as never,
          },
        },
      })
      .then((res) => {
        if (res.data) {
          setMemberPage(res.data);
        }
      });
  }, [page, kw, kwType, sort]);

  const handleClearSearch = () => {
    router.push(`?page=1&sort=${sort}`);
  };

  if (memberPage == null) return <div className="p-4">로딩중...</div>;

  const members = memberPage.content;

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold text-center my-4">회원 목록</h1>

      <div className="flex items-center flex-wrap gap-2 mb-6">
        <div
          className="relative w-full sm:w-auto"
          role="button"
          onClick={() => setOpen(true)}
        >
          <Input
            readOnly
            placeholder="검색어를 입력해주세요."
            className="pr-10 w-full cursor-pointer"
            value={kw ? `${KW_TYPE_LABELS[kwType]} : ${kw}` : ""}
            autoComplete="off"
          />
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 px-3 hover:bg-transparent"
          >
            <Search className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex-grow"></div>

        {kw && (
          <div className="flex items-center gap-2 text-sm bg-muted px-3 py-1.5 rounded-md">
            <span className="text-muted-foreground">
              {KW_TYPE_LABELS[kwType]}:
            </span>
            <span className="font-medium">{kw}</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-5 w-5 ml-1 hover:bg-background/50"
              onClick={handleClearSearch}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        )}

        <span className="text-sm text-muted-foreground">
          총 {memberPage.pageable.totalElements}명
        </span>

        <Select
          value={sort}
          onValueChange={(value) => {
            router.push(`?page=1&sort=${value}&kwType=${kwType}&kw=${kw}`);
          }}
        >
          <SelectTrigger className="w-[130px]">
            <SelectValue placeholder="정렬" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {SORT_OPTIONS.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-xl">검색</DialogTitle>
            <DialogDescription className="sr-only">회원 검색</DialogDescription>
          </DialogHeader>
          <form
            className="flex flex-col gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target as HTMLFormElement);
              const searchKw = formData.get("kw") as string;
              const searchKwType = formData.get("kwType") as string;
              router.push(
                `?page=1&sort=${sort}&kwType=${searchKwType}&kw=${searchKw}`,
              );
              setOpen(false);
            }}
          >
            <div className="space-y-2">
              <label className="text-sm font-medium">검색 타입</label>
              <Select name="kwType" defaultValue={kwType}>
                <SelectTrigger>
                  <SelectValue placeholder="검색 타입" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="ALL">전체</SelectItem>
                    <SelectItem value="USERNAME">아이디</SelectItem>
                    <SelectItem value="NICKNAME">닉네임</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">검색어</label>
              <Input
                placeholder="검색어를 입력해주세요."
                type="text"
                name="kw"
                defaultValue={kw}
                autoComplete="off"
                autoFocus
              />
            </div>

            <Button type="submit">검색</Button>
          </form>
        </DialogContent>
      </Dialog>

      <PaginationType1
        className="my-6"
        totalPages={memberPage.pageable.totalPages}
        currentPageNumber={page}
        baseQueryString={searchParams.toString()}
      />

      {members.length === 0 ? (
        <div className="flex flex-col min-h-[calc(100dvh-280px)] items-center justify-center py-12 text-muted-foreground">
          <Search className="h-8 w-8 mb-2" />
          <p>회원이 없습니다.</p>
        </div>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {members.map((member) => (
            <li key={member.id}>
              <Link href={`./members/${member.id}`}>
                <Card className="hover:bg-accent/50 transition-colors cursor-pointer">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 break-all">
                      <Badge variant="outline">{member.id}</Badge>
                      {member.username}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-4">
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-foreground">
                          {member.name}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(member.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </li>
          ))}
        </ul>
      )}

      <PaginationType1
        className="my-6"
        totalPages={memberPage.pageable.totalPages}
        currentPageNumber={page}
        baseQueryString={searchParams.toString()}
      />
    </div>
  );
}

export default withAdmin(function Page() {
  return (
    <Suspense fallback={<div className="p-4">로딩중...</div>}>
      <PageContent />
    </Suspense>
  );
});
