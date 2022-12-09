import { FC } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Table from "./components/Table";
import Register from "./components/Register";
import Login from "./components/Login";
import UserList from "./components/UserList";

const App: FC = () => {
  const RequireAuth = ({ children }: any) => {
    return localStorage.getItem("userToken")?.length &&
      localStorage.getItem("userToken") ? (
      children
    ) : (
      <Navigate to="/login" replace />
    );
  };

  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <RequireAuth>
              <Table />
           </RequireAuth>
          }
        />
        <Route
          path="/users"
          element={
            <RequireAuth>
              <UserList />
           </RequireAuth>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
