import React, { lazy, useEffect, Suspense } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { themeChange } from "theme-change";
import checkAuth from "./app/auth";
import initializeApp from "./app/init";
import { Spinner } from "@nextui-org/spinner";
// Importing pages
const Layout = lazy(() => import("./containers/Layout"));
const Login = lazy(() => import("./pages/Login"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const Register = lazy(() => import("./pages/Register"));
const Profile = lazy(() => import("./pages/protected/profile"));
const Providers = lazy(() => import("./pages/protected/providers"));
const Digitalwallet = lazy(() => import("./pages/protected/digitalwallet"));
const Departments = lazy(() => import("./pages/protected/departments"));

initializeApp();

const token = checkAuth();
function App() {
  useEffect(() => {
    themeChange(false);
  }, []);

  return (
    <>
      <Router>
        <Suspense
          fallback={
            <div className="w-full h-screen flex justify-center items-center">
              <Spinner
                color="primary"
                size="xl" // Adjust size to make sure it's visible
                style={{ width: "180px", height: "180px" }}
              />
            </div>
          }
        >
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/providers" element={<Providers />} />
            <Route path="/digitalwallet" element={<Digitalwallet />} />
            <Route
              path="/departments/:departmentId"
              element={<Departments />}
            />

            {/* Place new routes over this */}
            <Route path="/app/*" element={<Layout />} />

            <Route
              path="*"
              element={<Navigate to={token ? "/app/Home" : "/login"} replace />}
            />
          </Routes>
        </Suspense>
      </Router>
    </>
  );
}

export default App;
