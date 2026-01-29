"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { Suspense, useEffect, useState } from "react";

import withAdmin from "@/global/auth/hoc/withAdmin";
import type { components } from "@/global/backend/apiV1/schema";
import client from "@/global/backend/client";
import PaginationType1 from "@/global/components/PaginationType1";

type PageDtoMemberWithUsernameDto =
  components["schemas"]["PageDtoMemberWithUsernameDto"];

function PageContent() {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page") || "1");

  const [memberPage, setMemberPage] =
    useState<PageDtoMemberWithUsernameDto | null>(null);

  useEffect(() => {
    client
      .GET("/member/api/v1/adm/members", {
        params: {
          query: {
            page,
          },
        },
      })
      .then((res) => {
        if (res.data) {
          setMemberPage(res.data);
        }
      });
  }, [page]);

  if (memberPage == null) return <div>로딩중...</div>;

  const members = memberPage.content;

  return (
    <>
      <h1>회원 목록</h1>

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
