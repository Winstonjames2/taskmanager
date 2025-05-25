import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FiTrash2, FiPlus } from "react-icons/fi";

const LOCAL_STORAGE_KEY = "savedNotes";

type NoteItem = {
  note: string;
  date: string;
};

const Notes: React.FC = () => {
  const [notes, setNotes] = useState<NoteItem[]>([]);
  const [newNote, setNewNote] = useState("");
  const [formError, setFormError] = useState("");
  const isInitialized = React.useRef(false);
  const { t } = useTranslation();
  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      setNotes(JSON.parse(saved));
    }
    else {
      isInitialized.current = true;
    }
  }, []);

  useEffect(() => {
    if (!isInitialized.current && notes.length > 0) {
      isInitialized.current = true;
    }
    if (isInitialized.current){
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(notes));
    }
  }, [notes]);

  const handleAddNote = () => {
    if (newNote.trim() === "") {
      setFormError(t("note_error"));
      return;
    }

    const newEntry: NoteItem = {
      note: newNote,
      date: new Date().toLocaleDateString(),
    };

    setNotes((prev) => [...prev, newEntry]);
    setNewNote("");
    setFormError("");
  };

  const handleDeleteNote = (index: number) => {
    setNotes((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="p-4 sm:p-8 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-green-700 mb-6">📝 {t("notes")}</h2>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          type="text"
          value={newNote}
          autoFocus
          onChange={(e) => setNewNote(e.target.value)}
          onKeyDown={(e) => {
        if (e.key === "Enter") handleAddNote();
          }}
          className="flex-1 px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
          placeholder="Type your note here..."
        />
        <button
          onClick={handleAddNote}
          className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded shadow transition w-full sm:w-auto"
        >
          <FiPlus className="text-lg" />
          {t("add")}
        </button>
      </div>

      {formError && <div className="text-red-500 text-sm font-medium">{formError}</div>}

      {notes.length === 0 ? (
        <p className="text-gray-400 italic text-sm">{t("empty_message")}</p>
      ) : (
        <ul className="space-y-3">
          {notes.map((item, index) => (
            <li
              key={index}
              className="flex justify-between items-center bg-white border border-gray-200 rounded-lg px-4 py-3 shadow hover:shadow-md transition"
            >
              <span className="text-gray-800 mr-4">{item.date}</span>
              <span className="text-gray-800 flex-1">{item.note}</span>
              <button
                onClick={() => handleDeleteNote(index)}
                className="text-red-500 hover:text-red-700 transition"
                title="Delete note"
              >
                <FiTrash2 className="text-xl" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notes;
