import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/Firebase/firebase";
import { useNavigate } from "react-router-dom";

const ResetPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    try {
      await sendPasswordResetEmail(auth, email);
      setSuccessMessage(
        "Link do resetowania hasła został wysłany na Twój adres e-mail."
      );
      setEmail("");
    } catch (error: any) {
      if (error.code === "auth/invalid-email") {
        setErrorMessage("Nieprawidłowy adres e-mail.");
      } else if (error.code === "auth/user-not-found") {
        setErrorMessage("Nie znaleziono konta z tym adresem e-mail.");
      } else {
        setErrorMessage("Wystąpił błąd. Spróbuj ponownie.");
      }
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "2rem auto" }}>
      <h2>Resetowanie hasła</h2>

      <form onSubmit={handleResetPassword}>
        <input
          type="email"
          placeholder="Podaj swój adres e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: "100%", marginBottom: "1rem" }}
        />
        <button type="submit" style={{ width: "100%" }}>
          Wyślij link resetujący
        </button>
      </form>

      {successMessage && (
        <p style={{ color: "green", marginTop: "1rem" }}>{successMessage}</p>
      )}
      {errorMessage && (
        <p style={{ color: "red", marginTop: "1rem" }}>{errorMessage}</p>
      )}

      <p style={{ marginTop: "2rem" }}>
        <a href="/login" style={{ color: "#2f855a", fontWeight: "bold" }}>
          Powrót do logowania
        </a>
      </p>
    </div>
  );
};

export default ResetPasswordPage;
