import React, { useEffect, useState } from "react";
import adminApis from "../apis/AdminApis";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaTrash } from "react-icons/fa";
import ConfirmationModal from "../ConfirmationModal";
import ToastMessages from "../ToastMessages";

const Hosts = () => {
  const [hosts, setHosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [hostToDelete, setHostToDelete] = useState(null);
  const navigate = useNavigate();
  const [toast, setToast] = useState({
    show: false,
    type: "",
    message: "",
  });

  useEffect(() => {
    const fetchHosts = async () => {
      try {
        const response = await adminApis.fetchHosts();
        const hostsData = response.data.hosts;
        const hostsWithCounts = await Promise.all(
          hostsData.map(async (host) => {
            const countResponse = await adminApis.getCountOfStationsById(
              host._id
            );
            return {
              ...host,
              ...countResponse.data,
            };
          })
        );
        setHosts(hostsWithCounts);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching hosts:", error);
        setLoading(false);
      }
    };

    fetchHosts();

    const interval = setInterval(fetchHosts, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleDeleteHost = async (hostId) => {
    try {
      await adminApis.deleteHost(hostId);
      setHosts(hosts.filter((host) => host._id !== hostId));
      setShowDeleteConfirmation(false);
      setToast({
        show: true,
        type: "success",
        message: "Host deleted successfully.",
      });
    } catch (error) {
      console.error("Error deleting host:", error);
      setToast({
        show: true,
        type: "error",
        message: "Failed to delete host. Please try again.",
      });
    }
  };

  const openDeleteConfirmation = (host) => {
    setHostToDelete(host);
    setShowDeleteConfirmation(true);
  };

  const handleShowAllStations = (hostId) => {
    navigate(`/admin/hosts/${hostId}`);
  };

  return (
    <>
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
              Hosts
            </li>
          </ol>
        </nav>

        <h1 className="mt-4 mb-4">Hosts</h1>
        <div className="card">
          <div className="card-body">
            <h2 className="card-title mb-3">Host Details</h2>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Allowed</th>
                      <th>Pending</th>
                      <th>Rejected</th>
                      <th>Total</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {hosts.map((host) => (
                      <tr key={host._id}>
                        <td>{host._id}</td>
                        <td>{host.email}</td>
                        <td>{host.phone}</td>
                        <td>{host.allowed}</td>
                        <td>{host.pending}</td>
                        <td>{host.rejected}</td>
                        <td>{host.total}</td>
                        <td>
                          <button
                            onClick={() => handleShowAllStations(host._id)}
                            className="btn btn-transparent"
                          >
                            <FaEye className="text-primary" />
                          </button>
                          <button
                            onClick={() => openDeleteConfirmation(host)}
                            className="btn btn-transparent mr-2"
                          >
                            <FaTrash className="text-danger" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
          <ToastMessages
            show={toast.show}
            onClose={() => setToast({ ...toast, show: false })}
            type={toast.type}
            message={toast.message}
          />
        </div>
        <ConfirmationModal
          isOpen={showDeleteConfirmation}
          onCancel={() => setShowDeleteConfirmation(false)} // Close the delete confirmation modal on cancel
          onConfirm={() => handleDeleteHost(hostToDelete._id)} // Confirm deletion
          message={`Are you sure you want to delete host with ID ${
            hostToDelete ? hostToDelete._id : ""
          }?`}
        />
      </div>
    </>
  );
};

export default Hosts;
