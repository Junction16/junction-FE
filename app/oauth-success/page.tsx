"use client";

import { redirect, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

function OauthSuccessContent() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const accessToken = searchParams.get("accessToken");
    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
      redirect("/");
    }
  }, [searchParams]);

  return null;
}

export default function OauthSuccess() {
  return (
    <Suspense fallback={<div></div>}>
      <OauthSuccessContent />
    </Suspense>
  );
}
