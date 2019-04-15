import React from "react";

const Gold = ({ gold, onClick }) => {
  let classes = "fa fa-thumbs-up";
  if (!gold) classes = "fa fa-thumbs-down";
  return (
    <i
      style={{ cursor: "pointer" }}
      onClick={onClick}
      className={classes}
      aria-hidden="true"
    />
  );
};
export default Gold;
