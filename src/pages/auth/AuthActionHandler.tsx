import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import EmailVerificationPage from "@/pages/auth/EmailVerificationPage";
import NewPasswordPage from "../NewPasswordPage"; // dopasuj ścieżkę do Twojej struktury

const AuthActionHandler = () => {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode");
  const oobCode = searchParams.get("oobCode");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!mode || !oobCode) {
      setError("Brak wymaganych parametrów w linku.");
    }
  }, [mode, oobCode]);

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  if (mode === "verifyEmail") {
    return <EmailVerificationPage oobCode={oobCode!} />;
  }

  if (mode === "resetPassword") {
    return <NewPasswordPage oobCode={oobCode!} />;
  }

  return <p style={{ color: "orange" }}>Nieznany typ akcji: {mode}</p>;
};

export default AuthActionHandler;
