import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Library() {
  const [title, setTitle] = useState("");
  const [books, setBooks] = useState<any>([]);
  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (title.trim() !== "") {
      try {
        const ref = await addDoc(collection(db, "library"), {
          title,
        });
        setBooks([...books, { id: ref.id, title }]);
        setTitle("");
      } catch (error) {
        console.error("Error adding book:", error);
      }
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, "library", id));
      const updatedBooks = books.filter((book: any) => book.id !== id);
      setBooks(updatedBooks);
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  const handleUpdate = async (id: string, newTitle: string) => {
    try {
      await updateDoc(doc(db, "library", id), { title: newTitle });
      const updatedBooks = books.map((book: any) =>
        book.id === id ? { ...book, title: newTitle } : book
      );
      setBooks(updatedBooks);
    } catch (error) {
      console.error("Error updating book:", error);
    }
  };

  useEffect(() => {
    async function getData() {
      try {
        const snap = await getDocs(collection(db, "library"));
        const booksArr = snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBooks(booksArr);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    getData();
  }, []);

  const logOut = () => {
    signOut(auth);
    navigate("/login");
  };

  return (
    <div className="container">
      <h1>Add Book</h1>
      <h2 onClick={logOut} style={{ textAlign: "right", cursor: "pointer" }}>
        Sign Out
      </h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Book Title"
        />
        <br />
        <br />
        <button className="btn2" type="submit">
          Add
        </button>
      </form>

      <ul>
        {books.map((book: any) => (
          <li className="tit" key={book.id}>
            <span className="tit">{book.title}</span>
            <button className="btn" onClick={() => handleDelete(book.id)}>
              Delete
            </button>
            <button
              className="btn2"
              onClick={() => handleUpdate(book.id, "New Title")}
            >
              Update
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Library;
