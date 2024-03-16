import React from "react";

interface CardProps {
  data?: any;
}

const Card: React.FC<CardProps> = ({ data }) => {
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
        <img style={{height:"100px",width:"100px"}} src={data.image} alt="" />
      </div>
      <div className="card-footer" style={cardFooterStyle}>
        <button type="button" className="btn btn-primary" data-mdb-ripple-init>
          Add to deals
        </button>
        <button type="button" className="btn btn-primary" data-mdb-ripple-init>
          Check Details
        </button>
      </div>
    </div>
  );
};

export default Card;
