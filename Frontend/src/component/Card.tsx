import React, { useState } from "react";
import Modal from "./Modal";
import { toast } from "react-toastify";

interface CardProps {
  data?: any;
}

const Card: React.FC<CardProps> = ({ data }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedData, setSelectedData] = useState({});

  const handleCheckDetails = (imageUrl: string,description?: string) => {
    setSelectedData({
      imageUrl,
      description
    })
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedData({});
  };

  if (!data) {
    return null;
  }

  const cardStyle: React.CSSProperties = {
    margin: "10px",
  };

  const cardFooterStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginTop: "auto",
    padding: "5px",
    gap: "10px",
  };

  const titleStyle: React.CSSProperties = {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    maxWidth: "100%",
  };

  return (
    <div className="card" style={cardStyle}>
      <div className="card-body">
        <h5 className="card-title" style={titleStyle}>
          {data.title}
        </h5>
        <p className="card-text">{data.category}</p>
      </div>
      <div>
        <img style={{ height: "100px", width: "100px" }} src={data.image ? data.image : "https://cdn.dribbble.com/users/1787505/screenshots/7300251/shot.gif"} alt="" />
      </div>
      <div className="card-footer" style={cardFooterStyle}>
        <button type="button" className="btn btn-primary" data-mdb-ripple-init onClick={()=>toast.success("Item added to deals")}>
          Add to deals
        </button>
        <button type="button" className="btn btn-primary" data-mdb-ripple-init onClick={() => handleCheckDetails(data.image,data.description)}>
          Check Details
        </button>
      </div>
      {showModal && <Modal data={selectedData} onClose={handleCloseModal} />}
    </div>
  );
};

export default Card;
