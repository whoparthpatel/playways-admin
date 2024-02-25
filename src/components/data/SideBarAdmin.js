// import { FaDashcube, FaGamepad } from "react-icons/fa";

import {
    FaBook,
    FaDashcube,
    FaDollarSign,
    FaGamepad,
    FaLaptop,
    FaQuoteRight,
    FaRegComments,
    FaUser,
    FaUserTie,
  } from "react-icons/fa";
  
  const SideBarAdmin = [
    {
      title: "Dashboard",
      path: "/admin/dashboard",
      icon: <FaDashcube className="text-golden" />,
      cName: "nav-text",
    },
    {
      title: "User",
      path: "/admin/users",
      icon: <FaUser className="text-golden" />,
      cName: "nav-text",
    },
    {
      title: "Hosts",
      path: "/admin/hosts",
      icon: <FaUserTie className="text-golden" />,
      cName: "nav-text",
    },
    {
      title: "Bookings",
      path: "/admin/bookings",
      icon: <FaBook className="text-golden" />,
      cName: "nav-text",
    },
    {
      title: "Quotes",
      path: "/admin/quotes",
      icon: <FaQuoteRight className="text-golden" />,
      cName: "nav-text",
    },
    {
      title: "Feedback",
      path: "/admin/feedbacks",
      icon: <FaRegComments className="text-golden" />,
      cName: "nav-text",
    },
    {
      title: "Games",
      path: "/admin/games",
      icon: <FaGamepad className="text-golden" />,
      cName: "nav-text",
    },
    {
      title: "Payments",
      path: "/admin/payments",
      icon: <FaDollarSign className="text-golden" />,
      cName: "nav-text text-dark",
    },
    {
      title: "GameStations",
      icon: <FaLaptop className="text-golden" />,
      path: "/admin/gameStations",
      cName: "nav-text",
    },
  ];
  
  export default SideBarAdmin;
  