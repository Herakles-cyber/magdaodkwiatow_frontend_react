import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  verifyPasswordResetCode,
  confirmPasswordReset,
} from "firebase/auth";
import { auth } from "@/Firebase/firebase";

type Props = {
  oobCode: string;
};

const NewPasswordPage = ({ oobCode }: Props) => {
  const [verified, setVerified] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    verifyPasswordResetCode(auth, oobCode)
      .then(() => setVerified(true))
      .catch(() => {
        setError("Nieprawidłowy lub wygasły link resetujący hasło.");
      });
  }, [oobCode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (newPassword !== confirmPassword) {
      setError("Hasła nie są takie same.");
      return;
    }

    if (newPassword.length < 8) {
      setError("Hasło musi mieć co najmniej 8 znaków.");
      return;
    }

    try {
      await confirmPasswordReset(auth, oobCode, newPassword);
      setMessage("Hasło zostało zmienione. Możesz się teraz zalogować.");
      setNewPassword("");
      setConfirmPassword("");
      setTimeout(() => navigate("/login"), 3000);
    } catch {
      setError("Wystąpił błąd przy zmianie hasła. Spróbuj ponownie.");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "2rem auto", textAlign: "center" }}>
      <h2>Ustaw nowe hasło</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {message && <p style={{ color: "green" }}>{message}</p>}

      {verified && (
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Nowe hasło"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            style={{ width: "100%", marginBottom: "1rem" }}
          />
          <input
            type="password"
            placeholder="Potwierdź hasło"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            style={{ width: "100%", marginBottom: "1rem" }}
          />
          <button type="submit" style={{ width: "100%" }}>
            Zmień hasło
          </button>
        </form>
      )}
    </div>
  );
};

export default NewPasswordPage;
