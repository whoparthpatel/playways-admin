import React from "react";
import Logo from "./imgs/Logo.png";

const UserProfileModal = ({ userData, onClose }) => {
  return (
    <div
      className="modal fade show"
      tabIndex="-1"
      role="dialog"
      style={{ display: "block" }}
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">User Profile</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="row mb-3">
              <div className="col-md-6">
                <img
                  src={
                    `${process.env.REACT_APP_baseUrl}${userData.ProfileImg}` ||
                    Logo
                  }
                  className="img-fluid rounded"
                  alt="User"
                  style={{ aspectRatio: "1/1", objectFit: "cover" }}
                />
              </div>
              <div className="col-md-6">
                <h2>User Profile</h2>
                <p>Name: {userData.userName}</p>
                <p>Email: {userData.email}</p>
                <p>Phone: {userData.phone}</p>
                <p>Is Prime User: {userData.IsPrimeUser ? "Yes" : "No"}</p>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileModal;
