import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import LandingIntro from "./LandingIntro";
import ErrorText from "../../components/Typography/ErrorText";
import InputText from "../../components/Input/InputText";

function Register() {
  const INITIAL_REGISTER_OBJ = {
    name: "",
    password: "",
    emailId: "",
  };

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [registerObj, setRegisterObj] = useState(INITIAL_REGISTER_OBJ);

  const submitForm = (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (registerObj.name.trim() === "")
      return setErrorMessage("Name is required! (use any value)");
    if (registerObj.emailId.trim() === "")
      return setErrorMessage("Email Id is required! (use any value)");
    if (registerObj.password.trim() === "")
      return setErrorMessage("Password is required! (use any value)");
    else {
      setLoading(true);
      // Call API to check user credentials and save token in localstorage
      localStorage.setItem("token", "DumyTokenHere");
      setLoading(false);
      window.location.href = "/app//app/settings-profile";
    }
  };

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage("");
    setRegisterObj({ ...registerObj, [updateType]: value });
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center">
      <div className="card w-full max-w-lg shadow-xl">
        <div className="bg-base-100 rounded-xl p-8">
          <h2 className="text-2xl font-semibold mb-4 text-center">Register</h2>
          <form onSubmit={(e) => submitForm(e)}>
            <div className="mb-4">
              <InputText
                defaultValue={registerObj.name}
                updateType="name"
                containerStyle="mt-4"
                labelTitle="First Name"
                updateFormValue={updateFormValue}
              />
              <InputText
                defaultValue={registerObj.name}
                updateType="name"
                containerStyle="mt-4"
                labelTitle="Second Name"
                updateFormValue={updateFormValue}
              />
              <InputText
                defaultValue={registerObj.emailId}
                updateType="emailId"
                containerStyle="mt-4"
                labelTitle="National Id"
                updateFormValue={updateFormValue}
              />
              <InputText
                defaultValue={registerObj.emailId}
                type="tel"
                updateType="emailId"
                containerStyle="mt-4"
                labelTitle="Phone Number"
                updateFormValue={updateFormValue}
              />
              <InputText
                defaultValue={registerObj.password}
                type="password"
                updateType="password"
                containerStyle="mt-4"
                labelTitle="Password"
                updateFormValue={updateFormValue}
              />
              <InputText
                defaultValue={registerObj.password}
                type="password"
                updateType="password"
                containerStyle="mt-4"
                labelTitle="Confirm Password"
                updateFormValue={updateFormValue}
              />
            </div>

            <ErrorText styleClass="mt-8">{errorMessage}</ErrorText>
            <button
              type="submit"
              className={
                "btn mt-2 w-full bg-black text-white" +
                (loading ? " loading" : "")
              }
            >
              Register
            </button>

            <div className="text-center mt-4">
              Already have an account?{" "}
              <Link to="/login">
                <span className="inline-block text-black hover:text-primary hover:underline hover:cursor-pointer transition duration-200">
                  Login
                </span>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
