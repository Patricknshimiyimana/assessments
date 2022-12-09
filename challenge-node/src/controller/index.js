import {
  patientTable,
  pharmacistsTable,
  phyisicianTable,
  adminTable,
} from "../data";
import axios from "axios";

export const tomcatWelcome = async (req, res) => {
  try {
    const api = await axios.get("http://localhost:8080/UserServlet");
    console.log(api.data);
    return res.status(api.status).json(api.data);
  } catch (error) {
    console.log(error);
    return res.json({ error: error });
  }
};

export const login = async (req, res) => {
  try {
    const api = await axios.post(
      "http://localhost:8080/UserServlet/login",
      req.body
    );
    console.log(api.data);
    return res.json(api.data);
  } catch (error) {
    console.log(error);
    return res.json({ error: error.response.data.message });
  }
};

export const register = async (req, res) => {
  try {
    const api = await axios.post(
      "http://localhost:8080/UserServlet/register",
      req.body
    );
    console.log(api.data);
    return res.json(api.data);
  } catch (error) {
    console.log(error);
    return res.json({ error: error.response.data.message });
  }
};

export const getAllUsers = async (req, res) => {
  let role = req.user.role;

  if (role !== "Admin") {
    return res.status(403).json({ message: "Unauthorized!" });
  }
  try {
    const api = await axios.get(
      "http://localhost:8080/UserServlet/getAllUsers"
    );
    console.log(api.data);
    return res.json(api.data);
  } catch (error) {
    console.log(error);
    return res.json({ error: error.response.data.message });
  }
};

export const fetchData = async (req, res) => {
  try {
    let role = req.user.role;
    if (role === "Patient") {
      const data = await patientTable();
      return res.status(200).json({
        message: "Fetched patient data successfully!",
        data,
        adminData: false,
      });
    } else if (role === "Admin") {
      const data = await adminTable();
      return res.status(200).json({
        message: "Fetched admin data successfully!",
        data,
        adminData: true,
      });
    } else if (role === "Pharmacist") {
      const data = await pharmacistsTable();
      return res.status(200).json({
        message: "Fetched pharmacist data successfully!",
        data,
        adminData: false,
      });
    } else if (role === "Physician") {
      const data = await phyisicianTable();
      return res.status(200).json({
        message: "Fetched pharmacian data successfully!",
        data,
        adminData: false,
      });
    } else {
      return res.status(400).json({ msg: "Data not found" });
    }
  } catch (error) {
    console.log("error", error);
    return res.status(400).json({ msg: "bad request", error });
  }

  // try {
  //   let user = req.user;
  //   let isAdmin = user.role === "Admin";
  //   let isPharmacist = user.role === "Pharmacist";
  //   let isPhysician = user.role === "Physician";
  //   let isPatient = user.role === "Patient";

  //   console.log(isPharmacist);
  //   if (isAdmin) {
  //     const adminData = await adminTable();
  //     return res
  //       .status(200)
  //       .json({ message: "Fetched admin data successfully!", adminData });
  //   } else if (isPharmacist) {
  //     const pharmacistData = await pharmacistsTable();
  //     return res.status(200).json({
  //       message: "Fetched pharmacist data successfully!",
  //       pharmacistData,
  //     });
  //   } else if (isPhysician) {
  //     const physicianData = await phyisicianTable();
  //     return res.status(200).json({
  //       message: "Fetched phsysician data successfully!",
  //       physicianData,
  //     });
  //   } else if (isPatient) {
  //     const patientData = await patientTable();
  //     return res
  //       .status(200)
  //       .json({ message: "Fetched patient data successfully!", patientData });
  //   } else {
  //     return res.status(400).json({ message: "No data found for this user" });
  //   }
  // } catch (error) {
  //   console.log(error);
  //   return res.json({ error: error.message });
  // }
};
