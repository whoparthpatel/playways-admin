import React from "react";

const Modal = ({
  title,
  fields,
  handleSubmit,
  handleClose,
  buttonText,
  showModal,
}) => {
  const handleFormSubmit = () => {
    handleSubmit(); // Handle form submission logic
    handleClose(); // Close the modal after form submission
  };

  return (
    <div
      className={`modal fade ${showModal ? "show" : ""}`}
      tabIndex="-1"
      style={{ display: showModal ? "block" : "none" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={handleClose}
            ></button>
          </div>
          <div className="modal-body">
            {/* Render form fields dynamically */}
            {fields.map((field, index) => (
              <div key={index} className="mb-3">
                <label className="form-label">{field.label}</label>
                {field.type === "text" && (
                  <input
                    type="text"
                    className="form-control"
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                )}
                {field.type === "file" && (
                  <input
                    type="file"
                    className="form-control"
                    onChange={field.onChange}
                  />
                )}
                {/* Add more conditions for other input types if needed */}
              </div>
            ))}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleClose}
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleFormSubmit}
            >
              {buttonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
