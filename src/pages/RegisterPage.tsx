import { Link } from "react-router-dom";
import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { auth } from "@/Firebase/firebase";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);
  const [newsletterConsent, setNewsletterConsent] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

    if (!name.trim()) {
      setError("Podaj imię.");
      return;
    }

    if (!emailRegex.test(email)) {
      setError("Podaj poprawny adres e-mail.");
      return;
    }

    if (!passwordRegex.test(password)) {
      setError(
        "Hasło musi mieć min. 8 znaków, zawierać 1 dużą literę i znak specjalny (!@#$%^&*)."
      );
      return;
    }

    if (!acceptedPrivacy) {
      setError("Musisz zaakceptować politykę prywatności (RODO).");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(userCredential.user, {
        displayName: name,
      });

      await sendEmailVerification(userCredential.user);
      await signOut(auth);

      setSuccessMessage(
        "Konto zostało utworzone. Na Twój e-mail został wysłany link aktywacyjny. Po jego potwierdzeniu możesz się zalogować."
      );

      setName("");
      setEmail("");
      setPassword("");
      setAcceptedPrivacy(false);
      setNewsletterConsent(false);
    } catch (err: any) {
      if (err.code === "auth/email-already-in-use") {
        setError(
          "Konto z tym adresem e-mail już istnieje. Zaloguj się lub użyj innego adresu."
        );
      } else if (err.code === "auth/invalid-email") {
        setError("Nieprawidłowy adres e-mail.");
      } else if (err.code === "auth/weak-password") {
        setError(
          "Hasło jest zbyt słabe. Wybierz silniejsze hasło (min. 8 znaków, wielka litera, znak specjalny)."
        );
      } else {
        setError("Wystąpił błąd: " + err.message);
      }
    }
  };

  return (
    <form
      onSubmit={handleRegister}
      style={{ maxWidth: "400px", margin: "2rem auto" }}
    >
      <h2>Rejestracja</h2>

      <input
        type="text"
        placeholder="Imię"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ width: "100%", marginBottom: "1rem" }}
      />

      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ width: "100%", marginBottom: "1rem" }}
      />

      <input
        type="password"
        placeholder="Hasło (min. 8 znaków, wielka litera, znak specjalny)"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ width: "100%", marginBottom: "1rem" }}
      />

      <div style={{ marginBottom: "1rem" }}>
        <label>
          <input
            type="checkbox"
            checked={acceptedPrivacy}
            onChange={(e) => setAcceptedPrivacy(e.target.checked)}
          />{" "}
          *Akceptuję{" "}
          <a
            href="/polityka-prywatnosci"
            target="_blank"
            rel="noopener noreferrer"
          >
            Politykę Prywatności (RODO)
          </a>
        </label>
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label>
          <input
            type="checkbox"
            checked={newsletterConsent}
            onChange={(e) => setNewsletterConsent(e.target.checked)}
          />{" "}
          Chcę otrzymywać newsletter z poradami i promocjami
        </label>
      </div>

      <button type="submit" style={{ width: "100%" }}>
        Zarejestruj się
      </button>

      {successMessage && (
        <p style={{ color: "green", marginTop: "1rem" }}>{successMessage}</p>
      )}
      {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}

      <p style={{ marginTop: "1rem" }}>
        Masz już konto?{" "}
        <Link to="/login" style={{ color: "#2f855a", fontWeight: "bold" }}>
          Zaloguj się!
        </Link>
      </p>
    </form>
  );
}
