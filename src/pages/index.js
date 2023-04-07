import PageLayout from "@/components/common/PageLayout";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/login");
  }, []);

  return (
    <PageLayout>
      <h1>Loading...</h1>
    </PageLayout>
  );
}
