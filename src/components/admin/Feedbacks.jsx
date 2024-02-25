import React, { useState, useEffect } from "react";
import adminApis from "../apis/AdminApis";
import { Link } from "react-router-dom";

const Feedbacks = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await adminApis.getAllFeedback();
        setFeedbacks(response.data);
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
      }
    };

    fetchFeedbacks();

    const interval = setInterval(fetchFeedbacks, 2000);
    return () => clearInterval(interval);
  }, []);

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
            Feedbacks
          </li>
        </ol>
      </nav>

        <h1 className="my-4">Feedbacks</h1>
        {feedbacks.length === 0 ? (
          <p>No feedbacks available</p>
        ) : (
          <div className="row">
            {feedbacks.map((feedback) => (
              <div className="col-md-6" key={feedback.id}>
                <div className="card mb-4">
                  <div className="card-body">
                    <h5 className="card-title">{feedback.name}</h5>
                    <p className="card-text">{feedback.email}</p>
                    <p className="card-text">{feedback.message}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Feedbacks;
