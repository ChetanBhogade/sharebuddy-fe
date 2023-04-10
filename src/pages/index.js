import PageLayout from "@/components/common/PageLayout";
import { GlobalContext } from "@/contexts/GlobalContext";
import { getLoggedInUserDetails } from "@/services/auth";
import { getErrorMessage } from "@/utils/commonFunctions";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const { setIsBackdropLoading, setSnackbar, setUser, user } =
    useContext(GlobalContext);

  const {
    isLoading,
    data: userData,
    error,
  } = useQuery({
    queryKey: ["getLoggedInUserDetails"],
    queryFn: getLoggedInUserDetails,
    onError: (error) => {
      console.log("mutation registerUser on error: ", error);
      setSnackbar({
        isOpen: true,
        message: getErrorMessage(error),
        severity: "error",
      });
      setIsBackdropLoading(false);
      if (error?.response?.status === 401) {
        router.push("/login");
      }
    },
  });

  console.log("query response: ", { isLoading, userData, error });

  const handleRedirect = (userData) => {
    setIsBackdropLoading(isLoading);
    if (!userData) return;

    if (userData && userData.response) {
      console.log("setting user data is: ", userData?.response);
      setUser(userData?.response);
    }
    if (
      userData &&
      (!userData?.response?.is_mobile_number_verified ||
        !userData?.response?.is_email_verified)
    ) {
      router.push("/verify");
    } else {
      router.push("/profile");
    }
  };

  useEffect(() => {
    handleRedirect(userData);
  }, [userData]);

  return (
    <PageLayout>
      <h1>Loading...</h1>
    </PageLayout>
  );
}
