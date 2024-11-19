import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../config/firebase";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { TextField } from "@mui/material";

const Editor = () => {
  const { id } = useParams();
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (id !== "new") {
      const fetchDoc = async () => {
        const docRef = doc(db, "documents", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setTitle(docSnap.data().title);
          setContent(docSnap.data().content);
        }
      };
      fetchDoc();
    }
  }, [id]);

  const handleSave = async () => {
    const docRef = doc(db, "documents", id === "new" ? `${Date.now()}` : id);
    try {
      await setDoc(docRef, {
        title,
        content,
        lastEdited: serverTimestamp(),
      });
      alert("Document saved successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error saving document:", error);
      alert("Failed to save document. Please try again.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <TextField
        fullWidth
        type="text"
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Document Title"
        style={{ marginBottom: "22px", marginTop: "22px" }}
      />
      <ReactQuill value={content} onChange={setContent} />
      <div className="flex gap-3 mt-5">
        <button
          className="px-3 py-2 rounded w-40 bg-violet-600 hover:bg-violet-700 text-white"
          onClick={handleSave}
        >
          Save
        </button>
        <button
          className="px-3 py-2 rounded w-32 bg-slate-200 hover:bg-slate-300"
          onClick={() => navigate("/dashboard")}
        >
          Go back
        </button>
      </div>
    </div>
  );
};

export default Editor;
