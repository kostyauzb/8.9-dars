import React from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../firebase";
import { useEffect, useState } from "react";

const Protected = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    auth.authStateReady().finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <>
        <h1>Loading...</h1>
      </>
    );
  } else {
    if (auth.currentUser) {
      return <>{children}</>;
    }
    return <Navigate to={"/login"} />;
  }
};

export default Protected;
