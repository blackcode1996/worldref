import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-expand-lg navbar-black bg-body-tertiary">
      <div className="container">
        <a className="navbar-brand me-2" href="https://mdbgo.com/">
          <img
            src="https://worldref.co/wp-content/uploads/2023/09/WorldRef-Logo_Home-Page.svg"
            height="30"
            alt="MDB Logo"
            loading="lazy"
            style={{ marginTop: "-1px" }}
          />
        </a>

        <div className="collapse navbar-collapse" id="navbarButtonsExample">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          </ul>
          <div className="d-flex align-items-center">
            <button
              data-mdb-ripple-init
              type="button"
              className="btn btn-link px-3 me-2"
              onClick={()=>navigate("/login")}
            >
              Login
            </button>
            <button
              data-mdb-ripple-init
              type="button"
              className="btn btn-primary me-3"
              onClick={()=>navigate("/signup")}
            >
              Sign up for free
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
