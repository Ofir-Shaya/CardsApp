import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/auth.context";

const SignOut = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    logout();
    navigate("/");
  }, [logout, navigate]);

  return null;
};
export default SignOut;
