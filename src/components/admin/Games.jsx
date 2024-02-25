import React, { useEffect, useState } from "react";
import Modal from "../Modal";
import adminApis from "../apis/AdminApis";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import ConfirmationModal from "../ConfirmationModal";
import ToastMessages from "../ToastMessages";

const Games = () => {
  const [games, setGames] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [gameToDelete, setGameToDelete] = useState(null);
  const [gameData, setGameData] = useState({
    name: "",
    type: "",
    timing: "",
    description: "",
    slotPrice: "",
    image: null,
  });
  const [toast, setToast] = useState({
    show: false,
    type: "",
    message: "",
  });

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await adminApis.fetchGames();
        setGames(response.data.games);
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    };

    fetchGames();

    const interval = setInterval(fetchGames, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setGameData({ ...gameData, image: e.target.files[0] });
    }
  };

  const handleAddGame = async () => {
    try {
      if (!gameData.image) {
        setToast({
          show: true,
          type: "error",
          message: "Please select an image for the game.",
        });
        // console.error("Please select an image for the game.");
        return;
      }

      const formData = new FormData();
      formData.append("name", gameData.name);
      formData.append("type", gameData.type);
      formData.append("timing", gameData.timing);
      formData.append("description", gameData.description);
      formData.append("slotPrice", gameData.slotPrice);
      formData.append("image", gameData.image);

      const response = await adminApis.addGame(formData);

      if (response.status === 201) {
        setGames([...games, response.data.game]);
        setShowModal(false);
        setGameData({
          name: "",
          type: "",
          timing: "",
          description: "",
          slotPrice: "",
          image: null,
        });
        setToast({
          show: true,
          type: "success",
          message: "Game added successfully.",
        });
      }
    } catch (error) {
      setToast({
        show: true,
        type: "error",
        message: "Error adding game. Please try again.",
      });
      console.error("Error adding game:", error);
    }
  };

  const handleUpdateButtonClick = (game) => {
    setIsEditing(true);
    setSelectedGame(game);
    setGameData({
      name: game.name,
      type: game.type,
      timing: game.timing,
      description: game.description,
      slotPrice: game.slotPrice,
      image: null,
    });
    setShowModal(true);
  };

  const handleUpdateGame = async (id, updateData) => {
    try {
      const formData = new FormData();
      formData.append("name", updateData.name);
      formData.append("type", updateData.type);
      formData.append("timing", updateData.timing);
      formData.append("description", updateData.description);
      formData.append("slotPrice", updateData.slotPrice);

      if (updateData.image !== null) {
        formData.append("image", updateData.image);
      }

      const response = await adminApis.updateGames(id, formData);

      if (response.status === 200) {
        const updatedGames = games.map((game) =>
          game._id === id ? { ...game, ...updateData } : game
        );
        setGames(updatedGames);
        setToast({
          show: true,
          type: "success",
          message: "Game updated successfully",
        });
        closeModal();
      }
    } catch (error) {
      console.error("Error updating game:", error);
      setToast({
        show: true,
        type: "error",
        message: "Error to update game. Please try again.",
      });
    }
  };

  const handleDeleteGame = async (id) => {
    setGameToDelete(id);
    setShowDeleteConfirmation(true);
  };

  const confirmDeleteGame = async () => {
    try {
      const response = await adminApis.deleteGame(gameToDelete);

      if (response.status === 200) {
        const updatedGames = games.filter((game) => game._id !== gameToDelete);
        setGames(updatedGames);
        setShowDeleteConfirmation(false);
        setToast({
          show: true,
          type: "success",
          message: "Game deleted successfully.",
        });
      }
    } catch (error) {
      console.error("Error deleting game:", error);
      setToast({
        show: true,
        type: "error",
        message: "Error to delete game. Please try again.",
      });
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setIsEditing(false);
    setSelectedGame(null);
    setGameData({
      name: "",
      type: "",
      timing: "",
      description: "",
      slotPrice: "",
      image: null,
    });
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
              Games
            </li>
          </ol>
        </nav>

        <h1 className="mt-4 mb-4">Games</h1>
        <div className="text-start">
          <button
            className="btn btn-golden mb-2"
            onClick={() => setShowModal(true)}
          >
            Add
          </button>
        </div>
        <div className="row row-cols-1 row-cols-md-4">
          {games.map((game) => (
            <div className="col mb-4" key={game._id}>
              <div className="card h-100">
                <img
                  src={`${process.env.REACT_APP_baseUrl}${game.image}`}
                  className="card-img-top "
                  style={{ aspectRatio: "4/3", objectFit: "cover" }}
                  alt={game.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{game.name}</h5>
                  <p className="card-text">{game.description}</p>
                  <p className="card-text">Type: {game.type}</p>
                  <p className="card-text">Timing: {game.timing}</p>
                  <p className="card-text">Slot Price: {game.slotPrice}</p>
                </div>
                <div className="card-footer">
                  <div className="d-flex justify-content-between">
                    <button
                      className="btn btn-outline-primary"
                      onClick={() => handleUpdateButtonClick(game)}
                    >
                      <FaPencilAlt /> Update
                    </button>
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => handleDeleteGame(game._id)}
                    >
                      <FaTrash /> Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ToastMessages
          show={toast.show}
          onClose={() => setToast({ ...toast, show: false })}
          type={toast.type}
          message={toast.message}
        />
      <Modal
        title={isEditing ? "Edit Game" : "Add Game"}
        fields={[
          {
            label: "Name",
            type: "text",
            value: gameData.name,
            onChange: (value) => setGameData({ ...gameData, name: value }),
          },
          {
            label: "Type",
            type: "text",
            value: gameData.type,
            onChange: (value) => setGameData({ ...gameData, type: value }),
          },
          {
            label: "Timing",
            type: "text",
            value: gameData.timing,
            onChange: (value) => setGameData({ ...gameData, timing: value }),
          },
          {
            label: "Description",
            type: "text",
            value: gameData.description,
            onChange: (value) =>
              setGameData({ ...gameData, description: value }),
          },
          {
            label: "Slot Price",
            type: "text",
            value: gameData.slotPrice,
            onChange: (value) => setGameData({ ...gameData, slotPrice: value }),
          },
          {
            label: "Image",
            type: "file",
            value: gameData.image,
            onChange: handleFileChange,
          },
        ]}
        handleSubmit={
          isEditing
            ? () => handleUpdateGame(selectedGame._id, gameData)
            : handleAddGame
        }
        handleClose={closeModal}
        buttonText={isEditing ? "Update" : "Add"}
        showModal={showModal}
      />
      <ConfirmationModal
        isOpen={showDeleteConfirmation}
        onCancel={() => setShowDeleteConfirmation(false)}
        onConfirm={confirmDeleteGame} // Confirm deletion
        message="Are you sure you want to delete this game?"
      />
    </>
  );
};

export default Games;
