import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const checkAuth = () => {
  // Check both localStorage and cookies for token
  const TOKEN = Cookies.get("token") || localStorage.getItem("token");

  try {
    const decodedToken = jwtDecode(TOKEN);
    const currentTime = Date.now() / 1000;

    if (decodedToken.exp < currentTime) {
      clearAuth();
      return null;
    }

    // Set axios default headers
    axios.defaults.headers.common["Authorization"] = `Bearer ${TOKEN}`;

    return TOKEN;
  } catch (error) {
    clearAuth();
    return null;
  }
};

const clearAuth = () => {
  Cookies.remove("token");
  localStorage.removeItem("token");
  localStorage.removeItem("citizenId");
};

export default checkAuth;
