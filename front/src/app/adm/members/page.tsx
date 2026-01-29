"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import { Suspense, useEffect, useState } from "react";

import withAdmin from "@/global/auth/hoc/withAdmin";
import type { components } from "@/global/backend/apiV1/schema";
import {
  PathsMemberApiV1AdmMembersGetParametersQueryKwType,
  PathsMemberApiV1AdmMembersGetParametersQuerySort,
} from "@/global/backend/apiV1/schema";
import client from "@/global/backend/client";
import PaginationType1 from "@/global/components/PaginationType1";

type PageDtoMemberWithUsernameDto =
  components["schemas"]["PageDtoMemberWithUsernameDto"];

const KW_TYPE_OPTIONS = [
  {
    value: PathsMemberApiV1AdmMembersGetParametersQueryKwType.ALL,
    label: "전체",
  },
  {
    value: PathsMemberApiV1AdmMembersGetParametersQueryKwType.USERNAME,
    label: "아이디",
  },
  {
    value: PathsMemberApiV1AdmMembersGetParametersQueryKwType.NICKNAME,
    label: "닉네임",
  },
];

const SORT_OPTIONS = [
  {
    value: PathsMemberApiV1AdmMembersGetParametersQuerySort.ID,
    label: "최신순",
  },
  {
    value: PathsMemberApiV1AdmMembersGetParametersQuerySort.ID_ASC,
    label: "오래된순",
  },
  {
    value: PathsMemberApiV1AdmMembersGetParametersQuerySort.USERNAME,
    label: "아이디순",
  },
  {
    value: PathsMemberApiV1AdmMembersGetParametersQuerySort.USERNAME_ASC,
    label: "아이디 역순",
  },
  {
    value: PathsMemberApiV1AdmMembersGetParametersQuerySort.NICKNAME,
    label: "닉네임순",
  },
  {
    value: PathsMemberApiV1AdmMembersGetParametersQuerySort.NICKNAME_ASC,
    label: "닉네임 역순",
  },
];

function PageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = Number(searchParams.get("page") || "1");
  const kw = searchParams.get("kw") || "";
  const kwType =
    (searchParams.get(
      "kwType",
    ) as PathsMemberApiV1AdmMembersGetParametersQueryKwType) ||
    PathsMemberApiV1AdmMembersGetParametersQueryKwType.ALL;
  const sort =
    (searchParams.get(
      "sort",
    ) as PathsMemberApiV1AdmMembersGetParametersQuerySort) ||
    PathsMemberApiV1AdmMembersGetParametersQuerySort.ID;

  const [memberPage, setMemberPage] =
    useState<PageDtoMemberWithUsernameDto | null>(null);

  useEffect(() => {
    client
      .GET("/member/api/v1/adm/members", {
        params: {
          query: {
            page,
            kw: kw || undefined,
            kwType: kw ? kwType : undefined,
            sort,
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

  const handleSortChange = (
    newSort: PathsMemberApiV1AdmMembersGetParametersQuerySort,
  ) => {
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
            onChange={(e) =>
              handleSortChange(
                e.target
                  .value as PathsMemberApiV1AdmMembersGetParametersQuerySort,
              )
            }
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
