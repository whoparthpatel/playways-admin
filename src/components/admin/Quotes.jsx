import React, { useEffect, useState } from "react";
import Modal from "../Modal";
import "../Assets/CSS/Quotes.css";
import adminApis from "../apis/AdminApis";
import { Link } from "react-router-dom";
import "../Assets/CSS/AdminQuotes.css"
import ConfirmationModal from "../ConfirmationModal";
import ToastMessages from "../ToastMessages";

const Quotes = () => {
  const [quotes, setQuotes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newQuote, setNewQuote] = useState({ name: "", quote: "" });
  const [selectedQuoteId, setSelectedQuoteId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [quoteToDelete, setQuoteToDelete] = useState(null); 
  const [toast, setToast] = useState({
    show: false,
    type: "",
    message: "",
  });

  useEffect(() => {
    fetchQuotes();
    const interval = setInterval(() => {
      fetchQuotes();
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const fetchQuotes = async () => {
    try {
      const response = await adminApis.fetchQuotes();
      setQuotes(response.data.quotes);
    } catch (error) {
      console.error("Error fetching quotes:", error);
    }
  };

  const handleAddQuote = async () => {
    try {
      await adminApis.addQuote(newQuote);
      fetchQuotes();
      setShowModal(false);
      setNewQuote({ name: "", quote: "" });
      setToast({
        show: true,
        type: "success",
        message: "Quote added successfully.",
      });
    } catch (error) {
      setToast({
        show: true,
        type: "error",
        message: "Failed to add quote. Please try again.",
      });
      console.error("Error adding quote:", error);
    }
  };

  const handleUpdateQuote = async (id) => {
    try {
      const quoteToUpdate = quotes.find((quote) => quote._id === id);
      if (!quoteToUpdate) {
        console.error("Quote not found");
        return;
      }
      setNewQuote({ name: quoteToUpdate.name, quote: quoteToUpdate.quote });
      setSelectedQuoteId(id);
      setShowModal(true);
      setIsEditing(true);
    } catch (error) {
      console.error("Error updating quote:", error);
      setToast({
        show: true,
        type: "error",
        message: "Failed to update quote. Please try again.",
      });
    }
  };
  
  const handleUpdateSubmit = async () => {
    try {
      await adminApis.updateQuote(selectedQuoteId, newQuote);
      fetchQuotes(); 
      setIsEditing(false);
      setShowModal(false); 
      setToast({
        show: true,
        type: "success",
        message: "Quote updated successfully.",
      });
    } catch (error) {
      console.error("Error updating quote:", error);
      setToast({
        show: true,
        type: "error",
        message: "Failed to update quote. Please try again.",
      });
    }
  };
  
    const handleDeleteQuote = async (id) => {
      try {
        await adminApis.deleteQuote(id);
        fetchQuotes();
        setShowDeleteConfirmation(false);
        setToast({
          show: true,
          type: "success",
          message: "Quote deleted successfully.",
        });
      } catch (error) {
        console.error("Error deleting quote:", error);
        setToast({
          show: true,
          type: "error",
          message: "Failed to delete quote. Please try again.",
        });
      }
    };

  const openDeleteConfirmation = (quote) => {
    setQuoteToDelete(quote);
    setShowDeleteConfirmation(true);
  };

  const handleConfirmDelete = () => {
    if (quoteToDelete) {
      handleDeleteQuote(quoteToDelete._id);
    }
  };

  const handleCloseDeleteConfirmation = () => {
    setShowDeleteConfirmation(false);
  };

  return (
    <div className="container mt-2">
            
      {/* Sitemap Path */}
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb mt-2">
          <li className="breadcrumb-item">
            <Link to="/admin/" className="text-warning">
              Admin
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Quotes
          </li>
        </ol>
      </nav>

      <h1 className="mb-4">Quotes</h1>
      <button
        className="btn btn-golden mb-3"
        onClick={() => setShowModal(true)}
      >
        Add New Quote
      </button>
      <div
        className=""
        // style={{ maxHeight: "74vh", overflowY: "auto" }}
      >
        {quotes.map((quote) => (
          <div key={quote._id} className="card mb-3">
            <div className="card-body">
              <h5 className="card-title">Name: {quote.name}</h5>
              <p className="card-text">Quote: {quote.quote}</p>
              <div className="btn-group">
                <button
                  className="btn btn-sm btn-warning "
                  onClick={() => handleUpdateQuote(quote._id)}
                >
                  Update
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => openDeleteConfirmation(quote)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <ToastMessages
          show={toast.show}
          onClose={() => setToast({ ...toast, show: false })}
          type={toast.type}
          message={toast.message}
        />
      <Modal
        title={isEditing ? "Update Quote" : "Add New Quote"} // Dynamic title based on edit mode
        fields={[
          {
            label: "Name",
            type: "text",
            value: newQuote.name,
            onChange: (value) => setNewQuote({ ...newQuote, name: value }),
          },
          {
            label: "Quote",
            type: "text",
            value: newQuote.quote,
            onChange: (value) => setNewQuote({ ...newQuote, quote: value }),
          },
        ]}
        handleSubmit={isEditing ? handleUpdateSubmit : handleAddQuote} // Dynamic submit handler based on edit mode
        handleClose={() => setShowModal(false)}
        buttonText={isEditing ? "Update Quote" : "Add Quote"} // Dynamic button text based on edit mode
        showModal={showModal}
      />
      <ConfirmationModal
        isOpen={showDeleteConfirmation}
        onCancel={handleCloseDeleteConfirmation}
        onConfirm={handleConfirmDelete}
        message="Are you sure you want to delete this quote?"
      />
    </div>
  );
};

export default Quotes;
