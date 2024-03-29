import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import FormInput from "./FormInput";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";
const Login = () => {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const handleLogin = async () => {
    setLoading(true);
    await signInWithPopup(auth, googleProvider).then(() => {
      // const user = result.user;
      navigate("/");
      setLoading(false);
    });
  };

  const handleSignUp = async () => {
    setLoading(true);
  };

  const handleLogin1 = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/"); // Redirect to homepage after successful signup
    } catch (error: any) {
      console.error("Error signing up:", error.message);
      toast.error(error.message)
      // Handle error, you can show error message to user using toast or any other method
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <div className="relative bg-base-100 flex flex-col justify-center min-h-screen overflow-hidden px-6">
        <div className="bg-base-100 p-6 m-auto rounded-md shadow-md max-w-[600px] w-full">
          <h1 className="text-center text-3xl font-bold">Signup</h1>
          <form onSubmit={handleLogin1} className="mt-6">
            <FormInput
              name="email"
              label="Email"
              placeholder="example@gmail.com"
              type="email"
            />
            <FormInput
              name="password"
              label="Password"
              placeholder="Password"
              type="password"
            />
            <div className="mt-6">
              <button
                type="submit"
                className="w-full uppercase btn btn-active btn-neutral"
              >
                Login
              </button>
            </div>
          </form>

          <div className="mt-3">
            {loading ? (
              <button
                type="button"
                className="w-full btn-disabled uppercase btn btn-active btn-neutral"
              >
                Google <span className="loading loading-xs"></span>
              </button>
            ) : (
              <button
                onClick={() => {
                  handleLogin();
                }}
                type="button"
                className="w-full uppercase btn btn-active btn-neutral"
              >
                Google
              </button>
            )}
          </div>

          <p className="mt-8 text-xs font-light tracking-[1px] text-center">
            Don't have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-purple-600 hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
