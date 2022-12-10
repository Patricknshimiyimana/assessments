import { Button } from "antd";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Table from "./Table";
import "./index.scss";

const Layout: React.FC = () => {
  const [datas, setDatas] = useState<any>();
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
      const getData = async () => {
        const res = await fetch("http://localhost:4000/api/userData", {
          method: "GET",
          credentials: "include",
          headers: {
            authorization: `Bearer ${bearer_token.replaceAll('^"|"$', "")}`,
            "Content-Type": "application/json",
          },
        });

        const data = await res.json();
        setDatas(data);
      };

      getData();
    }
  }, []);

  console.log(datas);

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
        <h2 style={{ textAlign: "center", color: "#67CD79" }}>
          {user.role === "Patient" && "Patient illnesses 2000 - 2002"}
          {user.role === "Pharmacist" && "Most bought drugs 2000 - 2002"}
          {user.role === "Physician" && "Physicians missions 2000 - 2002"}
        </h2>
        {user.role === "Admin" && (
          <div style={{ textAlign: "center", color: "#67CD79" }}>
            <h1>Admin data - All tables</h1>
            <h4>Table1 - Patient illnesses 2000 - 2002</h4>
            <h4>Table2 - Most bought drugs 2000 - 2002</h4>
            <h4>Table3 - Physicians missions 2000 - 2002</h4>
          </div>
        )}

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
