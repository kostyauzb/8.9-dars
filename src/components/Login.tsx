import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const handleLogin = () => {
    signInWithPopup(auth, googleProvider).then(() => {
      // const user = result.user;
      navigate("/");
    });
  };
  return (
    <div>
      <button onClick={handleLogin}>login google</button>
    </div>
  );
};

export default Login;
