// src/pages/Dashboard.js
import React, { useState, useEffect } from "react";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import { Link, useNavigate } from "react-router-dom";
import { Button, List, ListItem, ListItemText } from "@mui/material";
import Header from "../components/Header";
import { FaEdit, FaTrash } from "react-icons/fa";

const Dashboard = () => {
  const [docs, setDocs] = useState([]);
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this document?"
    );
    if (confirmDelete) {
      try {
        await deleteDoc(doc(db, "documents", id));
        setDocs((prevDocs) => prevDocs.filter((doc) => doc.id !== id));
        alert("Document deleted successfully");
      } catch (error) {
        console.error("Error deleting document:", error);
        alert("Failed to delete the document. Please try again.");
      }
    }
  };

  useEffect(() => {
    const fetchDocs = async () => {
      const querySnapshot = await getDocs(collection(db, "documents"));
      setDocs(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };
    fetchDocs();
  }, []);

  return (
    <>
      <div>
        <Header />
      </div>
      <div style={{ padding: "20px" }}>
        <Link to="/editor/new">
          <button className="px-3 py-2 bg-purple-500 rounded hover:bg-purple-100 hover:text-black transition-all text-white hover:scale-90">Create New Document</button>
        </Link>
        <List>
          {docs.map((doc) => (
            <ListItem
              key={doc.id}
              className="border-b-4 shadow rounded-lg mt-5"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <ListItemText
              
                primary={doc.title || "Untitled Document"}
                secondary={`Last edited: ${
                  doc.lastEdited
                    ? new Date(doc.lastEdited.seconds * 1000).toLocaleString()
                    : "Never"
                }`}
              />
              <div className="flex md:flex-row flex-col gap-3">
                <Link to={`/editor/${doc.id}`}>
                  <button>
                    <FaEdit className="text-xl" />
                  </button>
                </Link>
                <button onClick={() => handleDelete(doc.id)}>
                  <FaTrash className="text-xl md:mx-4 text-red-600 hover:scale-125 transition-all" />
                </button>
              </div>
            </ListItem>
          ))}
        </List>
      </div>
    </>
  );
};

export default Dashboard;
