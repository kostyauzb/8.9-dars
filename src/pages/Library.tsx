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
import FormInput from "../components/FormInput";
import { toast } from "sonner";

function Library() {
  const [title, setTitle] = useState("");
  const [books, setBooks] = useState<any>([]);
  const [handleEditToggle, setHandleEditToggle] = useState(false);
  const [textId, setTextId] = useState("");
  const [oldTitle, setOldTitle] = useState<string | null>(null);
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
    toast.loading("Please wait...");
    try {
      await updateDoc(doc(db, "library", id), { title: newTitle });
      const updatedBooks = books.map((book: any) =>
        book.id === id ? { ...book, title: newTitle } : book
      );
      setBooks(updatedBooks);
      toast.success("Text successfully updated");
    } catch (error) {
      console.error("Error updating book:", error);
      toast.error("Text error");
      toast.dismiss();
    }
    toast.dismiss();

    setTitle("");
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

  const handleEdit = (titleOld: { id: string; title: string }) => {
    setTextId(titleOld.id);
    setHandleEditToggle(true);
    setTitle(titleOld.title);
    console.log(titleOld);
  };

  return (
    <>
      <div className="container mt-4">
        <h1 className="text-black mt-6 font-bold text-2xl ">Add Book</h1>
        <h2
          className="text-red-700 font-black text-xl "
          onClick={logOut}
          style={{ textAlign: "right", cursor: "pointer" }}
        >
          Sign Out
        </h2>
        <div className="justify-center mx-auto grid">
          <form className="flex gap-x-1" onSubmit={handleSubmit}>
            <input
              type="text"
              value={title}
              className="input input-sm input-bordered w-full max-w-xs"
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Book Title"
            />
            <br />
            <br />
            {handleEditToggle ? (
              <button
                className="btn btn-sm btn-neutral"
                onClick={() => {
                  handleUpdate(textId, title);
                }}
                type="button"
              >
                Update
              </button>
            ) : (
              <button className="btn btn-sm btn-neutral" type="submit">
                Add
              </button>
            )}
          </form>

          <ul>
            {books.map((book: { id: string; title: string }) => (
              <li className="title" key={book.id}>
                <span className="font-bold">{book.title}</span>
                <button
                  className="btnbtn btn-outline  btn-error  rounded-md ml-4 border-r-2 mt-3 btn-sm"
                  onClick={() => handleDelete(book.id)}
                >
                  Delete
                </button>
                <button
                  className="btn btn-warning ml-3 btn-sm"
                  onClick={() => handleEdit(book)}
                >
                  Update
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Library;
