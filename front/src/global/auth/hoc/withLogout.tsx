"use client";

import { useAuthContext } from "@/global/auth/hooks/useAuth";

export default function withLogout<P extends object>(
  Component: React.ComponentType<P>,
) {
  return function WithLogoutComponent(props: P) {
    const { isLogin } = useAuthContext();

    if (isLogin) {
      return (
        <div className="flex-1 flex justify-center items-center text-xl font-medium">
          이미 로그인 되었습니다.
        </div>
      );
    }

    return <Component {...props} />;
  };
}
