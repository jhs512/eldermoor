"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import { Suspense, useEffect, useState } from "react";

import withAdmin from "@/global/auth/hoc/withAdmin";
import type { components } from "@/global/backend/apiV1/schema";
import client from "@/global/backend/client";
import PaginationType1 from "@/global/components/PaginationType1";

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

const KW_TYPE_OPTIONS: { value: KwType; label: string }[] = [
  { value: "ALL", label: "전체" },
  { value: "USERNAME", label: "아이디" },
  { value: "NICKNAME", label: "닉네임" },
];

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

  const buildQueryString = (params: Record<string, string | undefined>) => {
    const newParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value) newParams.set(key, value);
    });
    return newParams.toString();
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newKw = formData.get("kw") as string;
    const newKwType = formData.get("kwType") as string;
    const query = buildQueryString({
      page: "1",
      kw: newKw || undefined,
      kwType: newKw ? newKwType : undefined,
      sort,
    });
    router.push(`?${query}`);
  };

  const handleSortChange = (newSort: Sort) => {
    const query = buildQueryString({
      page: "1",
      kw: kw || undefined,
      kwType: kw ? kwType : undefined,
      sort: newSort,
    });
    router.push(`?${query}`);
  };

  const handleClearSearch = () => {
    const query = buildQueryString({
      page: "1",
      sort,
    });
    router.push(`?${query}`);
  };

  if (memberPage == null) return <div>로딩중...</div>;

  const members = memberPage.content;

  return (
    <>
      <h1>회원 목록</h1>

      <form
        key={`${kw}-${kwType}`}
        onSubmit={handleSearch}
        style={{ marginBottom: "20px" }}
      >
        <select name="kwType" defaultValue={kwType}>
          {KW_TYPE_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <input
          type="text"
          name="kw"
          defaultValue={kw}
          placeholder="검색어 입력"
          style={{ marginLeft: "5px" }}
        />
        <button type="submit" style={{ marginLeft: "5px" }}>
          검색
        </button>
        {kw && (
          <button
            type="button"
            onClick={handleClearSearch}
            style={{ marginLeft: "5px" }}
          >
            초기화
          </button>
        )}
      </form>

      <div style={{ marginBottom: "20px" }}>
        <label>
          정렬:{" "}
          <select
            value={sort}
            onChange={(e) => handleSortChange(e.target.value as Sort)}
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      {members.length == 0 && <div>회원이 없습니다.</div>}

      {members.length > 0 && (
        <>
          <ul>
            {members.map((member) => (
              <li key={member.id}>
                <Link href={`./members/${member.id}`}>
                  {member.id} : {member.username} / {member.name}
                </Link>
              </li>
            ))}
          </ul>
          <PaginationType1
            totalPages={memberPage.pageable.totalPages}
            currentPageNumber={page}
            baseQueryString={searchParams.toString()}
          />
        </>
      )}
    </>
  );
}

export default withAdmin(function Page() {
  return (
    <Suspense fallback={<div>로딩중...</div>}>
      <PageContent />
    </Suspense>
  );
});
