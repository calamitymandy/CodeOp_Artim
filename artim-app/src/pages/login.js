import React from "react";
import LoginForm from "../components/LoginForm";
import { Toaster } from "react-hot-toast";
import { useAuth } from "../components/AuthContext";
import { useRouter } from "next/router";

const LoginPage = () => {
  const router = useRouter();
  const { isLogged } = useAuth();

  if (isLogged) {
    router.push("/");
  } else
    return (
      <div
        className=""
        style={{
          backgroundColor: "white", // Replace with your desired color code
        }}
      >
        <LoginForm />
        <Toaster />
      </div>
    );
};

export default LoginPage;
