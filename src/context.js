import React, { useState, useEffect } from "react";

export const AppContext = React.createContext();
export const AppContextProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [textAreaValue, setTextAreaValue] = useState("");
  const [edit, setEdit] = useState(0);
  const [editedItem, setEditedItem] = useState([]);
  const [sortedItems, setSortedItems] = useState([]);
  const [popup, setPopup] = useState(0);
  const [popupItem, setPopupItem] = useState([]);
  const [effect, setEffect] = useState(1);

  useEffect(() => {
    fetch("https://backend-for-recruitment-task.herokuapp.com/notes", {}).then(
      (response) =>
        response.json().then((data) => {
          setNotes(data);
          setSortedItems(data);
        })
    );
  }, [effect]);

  /// sortowanie tablicy z notatkami

  const handleSort = (type) => {
    const types = {
      title: "title",
      created: "created",
      modified: "modified",
    };

    const sortBy = types[type];

    const sorted = [...sortedItems].sort((a, b) => {
      if (a[sortBy] < b[sortBy]) {
        return -1;
      }
      if (a[sortBy] > b[sortBy]) {
        return 1;
      }
      return 0;
    });

    setSortedItems((prevState) => (prevState = sorted));
  };

  /// ustawianie wartości imputa podczas edytowania

  const handleEdit = (e) => {
    setEdit(1);
    const edited = notes.find((item) => item._id === e.target.id);

    setEditedItem((prevState) => (prevState = edited));
    setTextAreaValue((prevState) => (prevState = edited.content));
    setInputValue(edited.title);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!edit) {
      fetch("https://backend-for-recruitment-task.herokuapp.com/send", {
        method: "POST",

        body: JSON.stringify({
          title: inputValue,
          content: textAreaValue,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => console.log(response));

      setInputValue("");
      setTextAreaValue("");
    } else if (edit) {
      fetch("https://backend-for-recruitment-task.herokuapp.com/update", {
        method: "PUT",
        body: JSON.stringify({
          title: inputValue,
          content: textAreaValue,
          id: editedItem._id,
          created: editedItem.created,
          version: editedItem.version,
          modified: editedItem.modified,
          oldRecords: editedItem.oldRecords,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    setTimeout(() => {
      setEffect(effect + 1);
    }, 1000);

    if (textAreaValue !== "" || inputValue !== "") {
      setEdit(0);
      setInputValue("");
      setTextAreaValue("");
    }
  };

  const handleDelete = (e) => {
    if (edit) {
      return;
    } else if (!edit) {
      const deleteItem = notes.find((item) => item._id === e.target.id);

      const { _id } = deleteItem;

      fetch(
        `https://backend-for-recruitment-task.herokuapp.com/delete/${_id}`,
        {
          method: "DELETE",
        }
      );
    }

    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  //
  const handleSetInputValue = (e) => {
    setInputValue((prevState) => (prevState = e.target.value));
  };

  const handleSetTextAreaValue = (e) => {
    setTextAreaValue((prevState) => (prevState = e.target.value));
  };

  // popup

  const closePopup = () => {
    if (popup) {
      setPopup(0);
    } else {
      setPopup(1);
    }
  };

  const handlePopup = (e) => {
    const newArr = sortedItems;
    const item = newArr.find((item) => item._id === e.target.id);

    setPopupItem(item);
  };

  return (
    <AppContext.Provider
      value={{
        handleSubmit,
        handleSetInputValue,
        handleSetTextAreaValue,
        notes,
        handleEdit,
        inputValue,
        textAreaValue,
        handleDelete,
        edit,
        sortedItems,
        handleSort,
        handlePopup,
        popup,
        popupItem,
        closePopup,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
