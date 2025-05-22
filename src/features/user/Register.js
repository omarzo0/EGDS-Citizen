import { useState } from "react";
import { Link } from "react-router-dom";
import ErrorText from "../../components/Typography/ErrorText";
import InputText from "../../components/Input/InputText";

function Register() {
  const INITIAL_REGISTER_OBJ = {
    first_name: "",
    middle_name: "",
    last_name: "",
    national_id: "",
    phone_number: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [registerObj, setRegisterObj] = useState(INITIAL_REGISTER_OBJ);

  const submitForm = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    // Basic validation
    if (registerObj.first_name.trim() === "")
      return setErrorMessage("First name is required!");
    if (registerObj.middle_name.trim() === "")
      return setErrorMessage("Middle name is required!");
    if (registerObj.last_name.trim() === "")
      return setErrorMessage("Last name is required!");
    if (registerObj.national_id.trim() === "")
      return setErrorMessage("National ID is required!");
    if (registerObj.phone_number.trim() === "")
      return setErrorMessage("Phone number is required!");
    if (registerObj.email.trim() === "")
      return setErrorMessage("Email is required!");
    if (registerObj.password.trim() === "")
      return setErrorMessage("Password is required!");
    if (registerObj.password !== registerObj.confirmPassword)
      return setErrorMessage("Passwords don't match!");

    try {
      setLoading(true);
      const response = await fetch(
        "http://localhost:5000/api/citizen/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            first_name: registerObj.first_name,
            middle_name: registerObj.middle_name,
            last_name: registerObj.last_name,
            national_id: registerObj.national_id,
            phone_number: registerObj.phone_number,
            email: registerObj.email,
            password: registerObj.password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      // Redirect to profile completion if needed, or to dashboard
      if (data.data.profileComplete) {
        window.location.href = "/dashboard";
      } else {
        window.location.href = "/complete-profile";
      }
    } catch (error) {
      setErrorMessage(error.message || "An error occurred during registration");
    } finally {
      setLoading(false);
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
                defaultValue={registerObj.first_name}
                updateType="first_name"
                containerStyle="mt-4"
                labelTitle="First Name"
                updateFormValue={updateFormValue}
                required
              />
              <InputText
                defaultValue={registerObj.middle_name}
                updateType="middle_name"
                containerStyle="mt-4"
                labelTitle="Middle Name"
                updateFormValue={updateFormValue}
                required
              />
              <InputText
                defaultValue={registerObj.last_name}
                updateType="last_name"
                containerStyle="mt-4"
                labelTitle="Last Name"
                updateFormValue={updateFormValue}
                required
              />
              <InputText
                defaultValue={registerObj.national_id}
                updateType="national_id"
                containerStyle="mt-4"
                labelTitle="National Id"
                updateFormValue={updateFormValue}
                required
              />
              <InputText
                defaultValue={registerObj.phone_number}
                type="tel"
                updateType="phone_number"
                containerStyle="mt-4"
                labelTitle="Phone Number"
                updateFormValue={updateFormValue}
                required
              />
              <InputText
                defaultValue={registerObj.email}
                type="email"
                updateType="email"
                containerStyle="mt-4"
                labelTitle="Email"
                updateFormValue={updateFormValue}
              />
              <InputText
                defaultValue={registerObj.password}
                type="password"
                updateType="password"
                containerStyle="mt-4"
                labelTitle="Password"
                updateFormValue={updateFormValue}
                required
              />
              <InputText
                defaultValue={registerObj.confirmPassword}
                type="password"
                updateType="confirmPassword"
                containerStyle="mt-4"
                labelTitle="Confirm Password"
                updateFormValue={updateFormValue}
                required
              />
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
              {loading ? "Processing..." : "Register"}
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
