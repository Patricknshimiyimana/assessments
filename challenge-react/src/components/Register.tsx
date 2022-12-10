import { Link, useNavigate } from "react-router-dom";
import lockSvg from "../assets/lock.svg";
import eyeSvg from "../assets/eye.svg";
import { useState } from "react";
import swal from "sweetalert2";
import axios from "axios";
import "../styles/style.scss";

const Register = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    gender: "",
    role: "",
    age: "",
  });

  const handleRegister = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log(userData);
    try {
      const res = await axios.post(
        "http://localhost:4000/api/register",
        userData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      res.data.error
        ? swal.fire("Failed!", res.data.error, "error")
        : swal.fire("Success", res.data.message, "success");
      res.data.message.includes("registered successfully!") &&
        navigate("/login");
    } catch (error: any) {
      console.log(error);
      swal.fire("Failed!", error.response.data.message, "error");
    }
  };

  return (
    <div className="fomContainer">
      <form onSubmit={handleRegister}>
        <div className="header">
          <h2>Register</h2>
          <p>
            Already signed up?{" "}
            <Link to="/login" className="link">
              Login
            </Link>
          </p>
        </div>
        <div className="input">
          <input
            type="email"
            placeholder="Your Email address"
            onChange={(e) => {
              setUserData({ ...userData, email: e.target.value });
            }}
            required
          />
        </div>
        <div className="input password-input">
          <input
            type="password"
            placeholder="Create a password"
            onChange={(e) => {
              setUserData({ ...userData, password: e.target.value });
            }}
            required
          />
          <div className="icon">
            <img src={eyeSvg} />
          </div>
        </div>
        <div className="input">
          <input
            type="text"
            placeholder="Enter your first name"
            onChange={(e) => {
              setUserData({ ...userData, firstName: e.target.value });
            }}
            required
          />
        </div>
        <div className="input">
          <input
            type="text"
            placeholder="Enter your last name"
            onChange={(e) => {
              setUserData({ ...userData, lastName: e.target.value });
            }}
            required
          />
        </div>
        <div className="input">
          <input
            type="number"
            placeholder="Enter your age"
            onChange={(e) => {
              setUserData({ ...userData, age: e.target.value });
            }}
            required
          />
        </div>
        <div className="radioContainer">
          <div className="radio">
            <input
              name="gender"
              type="radio"
              value="Male"
              // defaultChecked
              onChange={(e) => {
                setUserData({ ...userData, gender: e.target.value });
              }}
              required
            />
            <p>Male</p>
          </div>
          <div className="radio">
            <input
              name="gender"
              type="radio"
              value="Female"
              onChange={(e) => {
                setUserData({ ...userData, gender: e.target.value });
              }}
              required
            />
            <p>Female</p>
          </div>
        </div>
        <div className="input">
          <select
            name="roles"
            id="roles"
            onChange={(e) => {
              setUserData({ ...userData, role: e.target.value });
            }}
            required
          >
            <option>Select Role</option>
            <option value="Patient">Patient</option>
            <option value="Physician">Physician</option>
            <option value="Pharmacist">Pharmacist</option>
            <option value="Admin">Admin</option>
          </select>
        </div>
        <div className="btn-container">
          <div className="lock">
            <img src={lockSvg} />
          </div>
          <button className="submit-btn" type="submit">
            Sign up
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
