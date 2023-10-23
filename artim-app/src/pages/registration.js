// pages/registration.js
import React from "react";
import RegistrationForm from "../components/RegistrationForm";
import { Toaster } from "react-hot-toast";

const RegistrationPage = () => {
  return (
    <div>
      <RegistrationForm />
      <Toaster />
    </div>
  );
};

export default RegistrationPage;
