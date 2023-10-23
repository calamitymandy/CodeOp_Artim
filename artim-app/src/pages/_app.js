import "../styles/globals.css";
import * as React from "react";
import { NextUIProvider } from "@nextui-org/react";
import { Toaster } from "react-hot-toast";
import Menu from "./Menu";
import { AuthProvider } from "../components/AuthContext";

export default function App({ Component, pageProps }) {
  return (
    <>
      <NextUIProvider>
        <AuthProvider>
          <div className="app">
            <Menu />
            <main className="max-w-screen-lg w-full mx-auto px-5 my-6">
              <Toaster />
              <Component {...pageProps} />
              <Toaster />
            </main>
          </div>
        </AuthProvider>
      </NextUIProvider>
    </>
  );
}
