"use client";

import { GiUnicorn } from "react-icons/gi";

export default function Page() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-4">
      <GiUnicorn className="h-16 w-16" />
      <h1 className="text-3xl font-bold">10xunicon</h1>
      <p className="text-xl text-muted-foreground">도전하세요.</p>
    </div>
  );
}
