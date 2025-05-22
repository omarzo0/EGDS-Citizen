import { useState } from "react";
import { Link } from "react-router-dom";
import ErrorText from "../../components/Typography/ErrorText";
import InputText from "../../components/Input/InputText";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAuthData } from "../common/authSlice";

function Login() {
  const INITIAL_LOGIN_OBJ = {
    password: "",
    national_id: "",
  };

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loginObj, setLoginObj] = useState(INITIAL_LOGIN_OBJ);
  const dispatch = useDispatch();

  const submitForm = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (loginObj.national_id.trim() === "")
      return setErrorMessage("Email is required!");
    if (loginObj.password.trim() === "")
      return setErrorMessage("Password is required!");

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:5000/api/citizen/login",
        {
          national_id: loginObj.national_id,
          password: loginObj.password,
        }
      );

      if (response.data?.status === "success") {
        const token = response.data?.data?.accessToken;
        const userId = response.data?.data?.id;

        if (!token) {
          throw new Error("No access token received");
        }

        localStorage.setItem("token", token);
        if (userId) localStorage.setItem("citizenId", userId);

        dispatch(
          setAuthData({
            id: userId,
            accessToken: token,
          })
        );

        window.location.href = "/app/home";
      } else if (response.data?.status === "error") {
        throw new Error(response.data?.error?.message || "Login failed");
      } else {
        throw new Error("Unexpected response format");
      }
    } catch (err) {
      console.error("Login error details:", err);

      // Handle axios errors and backend error responses
      const errorMsg =
        err.response?.data?.error?.message ||
        err.response?.data?.message ||
        err.message ||
        "Login failed. Please try again.";

      setErrorMessage(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage("");
    setLoginObj({ ...loginObj, [updateType]: value });
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center">
      <div className="card w-full max-w-md shadow-xl">
        <div className="bg-base-100 rounded-xl p-8">
          <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
          <form onSubmit={(e) => submitForm(e)}>
            <div className="mb-4">
              <InputText
                type="num"
                defaultValue={loginObj.national_id}
                updateType="national_id"
                containerStyle="mt-4"
                labelTitle="national_id"
                updateFormValue={updateFormValue}
              />

              <InputText
                defaultValue={loginObj.password}
                type="password"
                updateType="password"
                containerStyle="mt-4"
                labelTitle="Password"
                updateFormValue={updateFormValue}
              />
            </div>

            <div className="text-right text-primary">
              <Link to="/forgot-password">
                <span className="text-sm inline-block hover:text-primary hover:underline hover:cursor-pointer transition duration-200">
                  Forgot Password?
                </span>
              </Link>
            </div>

            <ErrorText styleClass="mt-8">{errorMessage}</ErrorText>
            <button
              type="submit"
              className={
                "btn mt-2 w-full bg-black text-white" +
                (loading ? " loading" : "")
              }
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            <div className="text-center mt-4">
              Don't have an account?{" "}
              <Link to="/register">
                <span className="inline-block hover:text-primary hover:underline hover:cursor-pointer transition duration-200">
                  Register
                </span>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
