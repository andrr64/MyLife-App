'use client';

import LoadingPage from "@/components/LoadingPage";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { URLPath } from "./path";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push(URLPath.home);
  }, [])

  return (
    <LoadingPage />
  );
}
