import React from "react";

const Card = ({ name, count , maxCountObj}) => {
  return (
    <div className="card">
      {maxCountObj?.name === name &&  count !== 0 && <img className="crown" src={"crown.png"} />}
      <p className="card-title">{count}</p>
      <p className="card-description">{name}</p>
    </div>
  );
};

export default Card;
