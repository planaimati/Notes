import React, { useContext } from "react";
import { AppContext } from "../context";
import SingleNote from "../components/SingleNote";

const Notes = () => {
  const {
    handleEdit,
    handleDelete,
    sortedItems,
    handlePopup,
    closePopup,
  } = useContext(AppContext);

  return (
    <div>
      {sortedItems.map((item, index) => (
        <SingleNote
          key={index}
          {...item}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          handlePopup={handlePopup}
          closePopup={closePopup}
        ></SingleNote>
      ))}
    </div>
  );
};

export default Notes;
