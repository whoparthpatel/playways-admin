// ConfirmationModal.js

import React from "react";

const ConfirmationModal = ({ isOpen, onCancel, onConfirm, message }) => {
  return (
    isOpen && (
      <div
        className="modal fade show"
        tabIndex="-1"
        role="dialog"
        style={{ display: "block" }}
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Confirm Action</h5>
              <button
                type="button"
                className="btn-close"
                onClick={onCancel}
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <p>{message}</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onCancel}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={onConfirm}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ConfirmationModal;
