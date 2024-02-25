import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import NoPage from "./components/admin/NoPage";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AdminRoutes from "./components/Routes/adminRoutes";
import { AdminProvider } from "./components/context/AdminContext";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to={'/admin'}/>}/>
          <Route
            path="/admin/*"
            element={
              <AdminProvider>
                <AdminLayout />
              </AdminProvider>
            }
          />

          <Route path="*" element={<NoPage />} />
        </Routes>
      </Router>
    </>
  );
}

function AdminLayout() {
  return <AdminRoutes />;
}

export default App;
