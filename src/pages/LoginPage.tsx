import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, getRedirectResult } from "firebase/auth";
import { auth } from "@/Firebase/firebase";
import GoogleLoginButton from "@/components/auth/GoogleLoginButton";
import useAuth from "@/hooks/useAuth";
import { signOut } from "firebase/auth";
import { useSearchParams } from "react-router-dom";
import { applyActionCode } from "firebase/auth";

const LoginPage = () => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [searchParams] = useSearchParams();
  const isVerified = searchParams.get("mode") === "verifyEmail";

  useEffect(() => {
    const mode = searchParams.get("mode");
    const oobCode = searchParams.get("oobCode");

    if (mode === "verifyEmail" && oobCode) {
      applyActionCode(auth, oobCode)
        .then(() => {
          console.log("Email successfully verified!");
          // Usuwamy reload, nie robimy tutaj nic więcej
        })
        .catch((error) => {
          console.error("Error verifying email:", error);
        });
    }
  }, [searchParams]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      await userCredential.user.reload();

      if (!userCredential.user.emailVerified) {
        setError("Aby się zalogować, najpierw potwierdź swój adres e-mail.");
        setEmail("");
        setPassword("");
        await signOut(auth);
        return;
      }

      navigate("/success");
    } catch (err: any) {
      if (err.code === "auth/invalid-email") {
        setError("Nieprawidłowy adres e-mail.");
      } else if (err.code === "auth/user-disabled") {
        setError("To konto zostało zablokowane.");
      } else if (err.code === "auth/user-not-found") {
        setError("Nie znaleziono konta o podanym adresie e-mail.");
      } else if (
        err.code === "auth/wrong-password" ||
        err.code === "auth/invalid-credential"
      ) {
        setError("Nieprawidłowy e-mail lub hasło.");
      } else if (err.code === "auth/too-many-requests") {
        setError(
          "Zbyt wiele nieudanych prób logowania. Spróbuj ponownie za chwilę."
        );
      } else {
        setError("Wystąpił nieznany błąd. Spróbuj ponownie.");
      }
    }
  };

  useEffect(() => {
    getRedirectResult(auth)
      .then((result) => {
        if (result?.user) {
          const user = result.user;
          localStorage.setItem(
            "user",
            JSON.stringify({
              name: user.displayName,
              email: user.email,
              uid: user.uid,
            })
          );
          navigate("/success");
        }
      })
      .catch((error) => {
        console.error("Błąd po redirect:", error);
      });
  }, [navigate]);

  useEffect(() => {
    if (auth.currentUser && auth.currentUser.emailVerified) {
      navigate("/success");
    }
  }, [navigate]);

  return (
    <div style={{ maxWidth: "400px", margin: "2rem auto" }}>
      <h2>Zaloguj się</h2>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: "100%", marginBottom: "1rem" }}
        />
        <input
          type="password"
          placeholder="Hasło"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ width: "100%", marginBottom: "1rem" }}
        />
        {isVerified && (
          <p
            style={{ color: "green", fontWeight: "bold", marginBottom: "1rem" }}
          >
            Twoje konto zostało pomyślnie zweryfikowane. Możesz się teraz
            zalogować.
          </p>
        )}
        <button type="submit" style={{ width: "100%" }}>
          Zaloguj się
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <p style={{ marginTop: "1rem" }}>
        Nie masz konta?{" "}
        <a href="/register" style={{ color: "#2f855a", fontWeight: "bold" }}>
          Zarejestruj się
        </a>
      </p>

      <hr style={{ margin: "2rem 0" }} />
      <h3>Lub zaloguj się przez Google</h3>
      <GoogleLoginButton />
    </div>
  );
};

export default LoginPage;