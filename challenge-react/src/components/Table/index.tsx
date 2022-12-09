import { Button } from "antd";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Table from "./Table";
import "./index.scss";

const Layout: React.FC = () => {
  const [datas, setData] = useState<any>();
  const navigate = useNavigate();

  const bearer_token: any = localStorage
    .getItem("userToken")
    ?.replace(/['"]+/g, "");

  let user: any = jwt_decode(bearer_token);
  localStorage.setItem("user", JSON.stringify(user));
  console.log(user.role);

  useEffect(() => {
    const bearer_token = localStorage
      .getItem("userToken")
      ?.replace(/['"]+/g, "");

    if (bearer_token) {
      const result = async () => {
        const res = await fetch("http://localhost:4000/api/userData", {
          method: "GET",
          credentials: "include",
          headers: {
            authorization: `Bearer ${bearer_token.replaceAll('^"|"$', "")}`,
            "Content-Type": "application/json",
          },
        });

        const data = await res.json();
        setData(data);
      };

      result();
    }
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#F8F9FA",
      }}
    >
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

          {user.role === "Admin" && (
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
          )}
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
      <div>
        {datas && !datas.adminData ? (
          <Table datas={datas} adminData={datas.data} />
        ) : (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Table datas={datas} adminData={datas?.data[0]} />
            <Table datas={datas} adminData={datas?.data[1]} />
            <Table datas={datas} adminData={datas?.data[2]} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Layout;
