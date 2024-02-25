import React from "react";

const NoPage = () => {
  return (
    <div>
      <div className="row d-flex">
        {/* <div className="col-md-"></div> */}
        <div className="col-md-6 d-flex justify-content-end align-items-center">
          <img src={require("../imgs/Logo.png")} alt="" className="img-fluid" />
        </div>
        <div className="col-md-6 d-flex justify-content-start align-items-center">
          <h1 className="display-1">404 !</h1>
          <h2 className="display-5"> Not Found </h2>
        </div>
      </div>
    </div>
  );
};

export default NoPage;
