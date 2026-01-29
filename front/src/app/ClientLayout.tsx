"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { useAuthContext } from "@/global/auth/hooks/useAuth";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";

import {
  Copyright,
  LogIn,
  LogOut,
  Menu,
  MessageCircle,
  MonitorCog,
  User,
  UserRoundSearch,
} from "lucide-react";

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const authState = useAuthContext();
  const router = useRouter();
  const pathname = usePathname();

  const { loginMember, isLogin, isAdmin, logout: _logout } = authState;

  const isAdminPage = pathname.startsWith("/adm");

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL as string;
  const frontendBaseUrl = process.env.NEXT_PUBLIC_FRONTEND_BASE_URL as string;
  const redirectUrl = encodeURIComponent(`${frontendBaseUrl}/members/me`);

  const loginUrl = (providerTypeCode: string) =>
    `${apiBaseUrl}/oauth2/authorization/${providerTypeCode}?redirectUrl=${redirectUrl}`;

  const logout = () => {
    _logout(() => router.replace("/"));
  };

  return (
    <>
      <header className="border-b">
        {/* Mobile Header */}
        <div className="flex sm:hidden py-1 px-2">
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader className="sr-only">
                <DrawerTitle>메뉴</DrawerTitle>
                <DrawerDescription>전체 메뉴</DrawerDescription>
              </DrawerHeader>
              <div className="max-h-[calc(100dvh-150px)] px-4 pb-4 overflow-y-auto">
                <nav className="flex flex-col gap-1">
                  <DrawerClose asChild>
                    <Button
                      variant="ghost"
                      className="w-full justify-start"
                      asChild
                    >
                      <Link href="/">
                        <span className="mr-2">🦄</span> 홈
                      </Link>
                    </Button>
                  </DrawerClose>

                  {isAdmin && (
                    <DrawerClose asChild>
                      <Button
                        variant="ghost"
                        className="w-full justify-start"
                        asChild
                      >
                        <Link href="/adm/members">
                          <UserRoundSearch className="mr-2 h-4 w-4" /> 회원관리
                        </Link>
                      </Button>
                    </DrawerClose>
                  )}

                  <Separator className="my-2" />

                  {!isLogin && (
                    <>
                      <DrawerClose asChild>
                        <Button
                          variant="ghost"
                          className="w-full justify-start"
                          asChild
                        >
                          <Link href="/members/login">
                            <LogIn className="mr-2 h-4 w-4" /> 로그인
                          </Link>
                        </Button>
                      </DrawerClose>
                      <DrawerClose asChild>
                        <Button
                          variant="ghost"
                          className="w-full justify-start"
                          asChild
                        >
                          <a href={loginUrl("kakao")}>
                            <MessageCircle className="mr-2 h-4 w-4" /> 카카오
                            로그인
                          </a>
                        </Button>
                      </DrawerClose>
                      <DrawerClose asChild>
                        <Button
                          variant="ghost"
                          className="w-full justify-start"
                          asChild
                        >
                          <a href={loginUrl("google")}>구글 로그인</a>
                        </Button>
                      </DrawerClose>
                    </>
                  )}

                  {isLogin && (
                    <>
                      <DrawerClose asChild>
                        <Button
                          variant="ghost"
                          className="w-full justify-start"
                          asChild
                        >
                          <Link href="/members/me">
                            <User className="mr-2 h-4 w-4" /> 내 정보
                          </Link>
                        </Button>
                      </DrawerClose>
                      <DrawerClose asChild>
                        <Button
                          variant="ghost"
                          className="w-full justify-start"
                          onClick={logout}
                        >
                          <LogOut className="mr-2 h-4 w-4" /> 로그아웃
                        </Button>
                      </DrawerClose>
                    </>
                  )}
                </nav>
              </div>
            </DrawerContent>
          </Drawer>

          <Button variant="ghost" asChild>
            <Link href="/">
              <span className="mr-1">🦄</span> 10xunicon
            </Link>
          </Button>

          <div className="flex-grow" />

          {!isLogin && (
            <Button variant="ghost" size="sm" asChild>
              <Link href="/members/login">
                <LogIn className="h-4 w-4" />
              </Link>
            </Button>
          )}

          {isLogin && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Avatar className="h-7 w-7">
                    <AvatarImage src={loginMember.profileImageUrl} />
                    <AvatarFallback>{loginMember.name?.[0]}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/members/me">
                    <User className="mr-2 h-4 w-4" /> 내 정보
                  </Link>
                </DropdownMenuItem>
                {isAdmin && (
                  <DropdownMenuItem asChild>
                    <Link href="/adm/members">
                      <MonitorCog className="mr-2 h-4 w-4" /> 관리자
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4" /> 로그아웃
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        {/* Desktop Header */}
        <div className="hidden sm:flex container mx-auto py-1 px-4">
          <Button variant="ghost" asChild>
            <Link href="/">
              <span className="mr-1">🦄</span> 10xunicon
            </Link>
          </Button>

          {isAdminPage && (
            <>
              <Button variant="ghost" asChild>
                <Link href="/adm/members">
                  <UserRoundSearch className="mr-2 h-4 w-4" /> 회원관리
                </Link>
              </Button>
            </>
          )}

          <div className="flex-grow" />

          {!isLogin && (
            <>
              <Button variant="ghost" asChild>
                <Link href="/members/login">
                  <LogIn className="mr-2 h-4 w-4" /> 로그인
                </Link>
              </Button>
              <Button variant="ghost" asChild>
                <a href={loginUrl("kakao")}>
                  <MessageCircle className="mr-2 h-4 w-4" /> 카카오
                </a>
              </Button>
              <Button variant="ghost" asChild>
                <a href={loginUrl("google")}>구글</a>
              </Button>
            </>
          )}

          {isLogin && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={loginMember.profileImageUrl} />
                    <AvatarFallback>{loginMember.name?.[0]}</AvatarFallback>
                  </Avatar>
                  {loginMember.name}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/members/me">
                    <User className="mr-2 h-4 w-4" /> 내 정보
                  </Link>
                </DropdownMenuItem>
                {isAdmin && (
                  <DropdownMenuItem asChild>
                    <Link href="/adm/members">
                      <MonitorCog className="mr-2 h-4 w-4" /> 관리자
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4" /> 로그아웃
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </header>

      <main className="flex-1 flex flex-col">{children}</main>

      <footer className="border-t py-4">
        <div className="container mx-auto px-4 flex justify-center items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Copyright className="h-4 w-4" /> 2026 10xunicon
          </span>
          {isAdmin && !isAdminPage && (
            <Button variant="link" size="sm" asChild>
              <Link href="/adm/members">
                <MonitorCog className="mr-1 h-4 w-4" /> 관리자
              </Link>
            </Button>
          )}
        </div>
      </footer>
    </>
  );
}
