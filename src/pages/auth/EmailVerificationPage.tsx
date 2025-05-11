import { useEffect, useState } from "react";
import {
  applyActionCode,
  checkActionCode,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "@/Firebase/firebase";
import { useNavigate } from "react-router-dom";

type Props = {
  oobCode: string;
};

const EmailVerificationPage = ({ oobCode }: Props) => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    checkActionCode(auth, oobCode)
      .then(() => {
        return applyActionCode(auth, oobCode);
      })
      .then(() => {
        setError("");
        setMessage(
          "Twój adres e-mail został zweryfikowany. Możesz się teraz zalogować."
        );
        setTimeout(() => navigate("/login"), 3000);
      })
      .catch(() => {
        // plan B – jeśli applyActionCode się nie powiedzie, spróbuj zalogować się tymczasowo (jeśli znasz login testowy)
        setMessage(
          "Spróbuj ponownie zalogować się – możliwe, że adres został już zweryfikowany."
        );
        setTimeout(() => navigate("/login"), 3000);
      })
      .finally(() => setLoading(false));
  }, [oobCode, navigate]);

  return (
    <div
      style={{ maxWidth: "400px", margin: "2rem auto", textAlign: "center" }}
    >
      {loading && <p>Trwa weryfikacja adresu e-mail...</p>}
      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default EmailVerificationPage;
