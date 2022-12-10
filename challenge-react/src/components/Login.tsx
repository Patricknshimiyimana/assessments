import { Link, useNavigate } from "react-router-dom";
import lockSvg from "../assets/lock.svg";
import eyeSvg from "../assets/eye.svg";
import swal from "sweetalert2";
import axios from "axios";
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:4000/api/login",
        { email, password },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(res);
      localStorage.setItem("userToken", JSON.stringify(res.data.payload))
      res.data.error
        ? swal.fire("Failed!", res.data.error, "error")
        : swal.fire("Success", res.data.message, "success");
      res.data.message.includes("logged in Successfully") &&
        navigate("/");
    } catch (error: any) {
      console.log(error);
      swal.fire("Failed!", error.response.data.message, "error");
    }
  };
  return (
    <div className="fomContainer">
      <form onSubmit={handleLogin}>
        <div className="header">
          <h2>Login</h2>
          <p>
            Don't have an account ?{" "}
            <Link to="/register" className="link">
              Register
            </Link>
          </p>
        </div>
        <div className="input">
          <input
            type="email"
            placeholder="Your Email address"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
          />
        </div>
        <div className="input password-input">
          <input
            type="password"
            placeholder="Enter your password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
          />
          <div className="icon">
            <img src={eyeSvg} />
          </div>
        </div>
        <div className="btn-container">
          <div className="lock">
            <img src={lockSvg} />
          </div>
          <button className="submit-btn" type="submit">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
