import axios from "axios";
import { useState } from "react";
const Login = () => {
  const URL = "http://localhost:8081/api/v1";
  const [userId, setuserId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${URL}/user/login`, { userId, password });
      const apiResponse = response.data;
      console.log(apiResponse);
      console.log(response.headers);
      if (apiResponse.responseStatus === "SUCCESS") {
        const jwtToken = response.headers["authorization"].split(" ")[1];
        localStorage.setItem("jwt-token", jwtToken);
        console.log("Login successful and jwt-token is stored in local storage:", jwtToken);
      } else {
        console.error("Login failed:", apiResponse.data);
      }
    } catch (error: any) {
      if (error.response) {
        const apiResponse = error.response.data;
        console.error("Login failed:", apiResponse);
      } else {
        console.error("Login failed:", error.message);
      }
    }
  };

  const handleLogout = () => {
    console.log("Logged out, JWT token removed from cookies.");
  };

  const handleCoffee = async (e: any) => {
    e.preventDefault();
    const jwtToken = localStorage.getItem("jwt-token");
    try {
      const response = await axios.get(`${URL}/coffee/all`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        withCredentials: true,
      });
      const data1 = await response.data;
      console.log(data1);
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  return (
    <div>
      <div>
        <label>Username:</label>
        <input type="text" value={userId} onChange={(e) => setuserId(e.target.value)} />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button onClick={handleLogin}>로그인 😊</button>
      <button onClick={handleLogout}>로그아웃</button>
      <button onClick={handleCoffee}>커피 내놔</button>
    </div>
  );
};

export default Login;
