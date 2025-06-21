"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Loading from "@/app/loading/page";

export default function Logout() {
  const router = useRouter();

  useEffect(() => {
    localStorage.removeItem("token");
    sessionStorage.clear();

    router.push("/login");
  }, [router]);

  return (
    <div>
      <h2>Logging you out...</h2>
      <Loading />
    </div>
  );
}
