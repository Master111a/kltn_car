import React from "react";
import "./NotePopup.css";

const NotePopup = ({ isOpen, onClose, title, content }) => {
  if (!isOpen) return null;
  return (
    <div className="note-popup">
      <div className="note-header">
        <h3>{title}</h3>
        <button className="close-btn" onClick={onClose}>
          ✕
        </button>
      </div>
      
      <div className="note-body">
        <p>{content}</p>
      </div>
    </div>
  );
};

export default NotePopup;
