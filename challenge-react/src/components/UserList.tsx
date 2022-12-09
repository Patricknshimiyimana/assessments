import userPic from "../assets/user.png";
import { Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
const UserList = () => {
  let navigate = useNavigate();
  return (
    <>
      <div
        className="table-wrapper"
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "0.8rem",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "30px",
          }}
        >
          <Link
            style={{
              fontSize: "22px",
              fontWeight: "100",
              textDecoration: "none",
              color: "gray",
            }}
            to={"/"}
          >
            <h4>data</h4>
          </Link>
          <Link
            style={{
              fontSize: "22px",
              fontWeight: "100",
              textDecoration: "none",
              color: "gray",
            }}
            to={"/users"}
          >
            <h4>users</h4>
          </Link>
        </div>

        <Button
          className="btn logout-btn"
          onClick={() => {
            localStorage.removeItem("userToken");
            navigate("/login");
          }}
        >
          Logout
        </Button>
      </div>
      <div className="userList">
        <header>
          <h1>Users List</h1>
        </header>
        <div className="usersContainer">
          <div className="user">
            <div className="image">
              <img src={userPic}></img>
            </div>
            <div className="desc">
              <h2>Patrick Nshimiyimana</h2>
              <p>Pharmacist</p>
            </div>
          </div>
          <div className="user">
            <div className="image">
              <img src={userPic}></img>
            </div>
            <div className="desc">
              <h2>Patrick Nshimiyimana</h2>
              <p>Pharmacist</p>
            </div>
          </div>
          <div className="user">
            <div className="image">
              <img src={userPic}></img>
            </div>
            <div className="desc">
              <h2>Patrick Nshimiyimana</h2>
              <p>Pharmacist</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserList;
