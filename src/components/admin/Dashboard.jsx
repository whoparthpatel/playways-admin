import React, { useState, useEffect } from "react";
// import Modal from "../Modal";
import adminApis from "../apis/AdminApis";
import { Link } from "react-router-dom";
import "../Assets/CSS/AdminDashboard.css";
import { FaGamepad, FaLaptop, FaUser, FaUserTie } from "react-icons/fa";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  // const [isEditing, setIsEditing] = useState(false);
  // const [editedUserId, setEditedUserId] = useState("");
  // const [searchTerm, setSearchTerm] = useState("");
  // const [searchResults, setSearchResults] = useState([]);
  // const [showModal, setShowModal] = useState(false);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalGameStations, setTotalGameStations] = useState(0);
  const [totalGames, setTotalGames] = useState(0);
  // const [totalBookings, setTotalBookings] = useState(0);
  const [totalHosts, setTotalHosts] = useState(0);
  // const [userData, setUserData] = useState({
  //   userName: "",
  //   email: "",
  //   phone: "",
  //   password: "",
  // });
  // const [userToDelete, setUserToDelete] = useState(null);
  // const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    fetchUsers();
    fetchGameStations();
    fetchGames();
    // fetchBookings();
    fetchHosts();

    const interval = setInterval(() => {
      fetchUsers();
      fetchGameStations();
      fetchGames();
      // fetchBookings();
      fetchHosts();
    }, 200000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setTotalUsers(users.length);
  }, [users]);

  const fetchUsers = async () => {
    try {
      const response = await adminApis.fetchUsers();
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchGames = async () => {
    try {
      const response = await adminApis.fetchGames();
      setTotalGames(response.data.games.length);
    } catch (error) {
      console.error("Error fetching games:", error);
    }
  };

  // const fetchBookings = async () => {
  //   try {
  //     const response = await adminApis.fetchBookings();
  //     setTotalBookings(response.data.bookings.length);
  //   } catch (error) {
  //     console.error("Error fetching bookings:", error);
  //   }
  // };

  const fetchGameStations = async () => {
    try {
      const response = await adminApis.fetchGameStations();
      setTotalGameStations(response.data.gameStations.length);
      // console.log(response.data);
    } catch (error) {
      console.error("Error fetching game stations:", error);
    }
  };

  const fetchHosts = async () => {
    try {
      const response = await adminApis.fetchHosts();
      setTotalHosts(response.data.hosts.length);
    } catch (error) {
      console.error("Error fetching game stations:", error);
    }
  };

  return (
    <div className="container">
      {/* Sitemap Path */}
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb mt-2">
          <li className="breadcrumb-item">
            <Link to="/admin/" className="text-warning">
              Admin
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Dashboard
          </li>
        </ol>
      </nav>

      <h1 className="mb-4">Dashboard</h1>

      {/* cards */}
      <div className="row mb-3">
        <div className="col-md-3 md-mb-0 mb-2">
          <div className="card h-100 bg-golden bg-opacity-75 shadow">
            <div className="card-body text-center">
              <div className="row">
                <div className="col-md-8 text-white">
                  <h1 className="card-title">{totalUsers}</h1>
                  <p className="card-text">Total Users</p>
                </div>
                <div className="col-md-4 d-flex align-items-center justify-content-center text-center ">
                  <Link to={"/admin/users"} className="btn btn-light btn-lg">
                    <FaUser />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className=" col-md-3 md-mb-0 mb-2">
          <div className="card h-100 bg-golden bg-opacity-75 shadow">
            <div className="card-body text-center">
              <div className="row">
                <div className="col-md-8 text-white">
                  <h1 className="card-title">{totalHosts}</h1>
                  <p className="card-text">Total Hosts</p>
                </div>
                <div className="col-md-4 d-flex align-items-center justify-content-center text-center">
                  <Link to={"/admin/hosts"} className="btn btn-light btn-lg">
                    <FaUserTie />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className=" col-md-3 md-mb-0 mb-2">
          <div className="card h-100 bg-golden bg-opacity-75 shadow">
            <div className="card-body text-center">
              <div className="row">
                <div className="col-md-8 text-white">
                  <h1 className="card-title">{totalGames}</h1>
                  <p className="card-text">Total Games</p>
                </div>
                <div className="col-md-4 d-flex align-items-center justify-content-center text-center">
                  <Link to={"/admin/games"} className="btn btn-light btn-lg">
                    <FaGamepad />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className=" col-md-3 md-mb-0 mb-2">
          <div className="card h-100 bg-golden bg-opacity-75 shadow">
            <div className="card-body text-center">
              <div className="row">
                <div className="col-md-8 text-white">
                  <h1 className="card-title">{totalGameStations}</h1>
                  <p className="card-text">Total GameStations</p>
                </div>
                <div className="col-md-4 d-flex align-items-center justify-content-center text-center">
                  <Link
                    to={"/admin/gameStations"}
                    className="btn btn-light btn-lg"
                  >
                    <FaLaptop />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
