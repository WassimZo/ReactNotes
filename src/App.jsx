import NotesList from "./components/NotesList";
import { useSelector, useDispatch } from "react-redux";
import { getNotesFromApi } from "./features/notes";
import Sidebar from "./components/Sidebar";
import Sidenotes from "./components/Sidenotes";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DisplayedNote from "./components/DisplayedNote";
import Edit from "./components/Edit";

function App() {
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.notes);

  console.log(notes);
  if (!notes.list) {
    dispatch(getNotesFromApi());
  }

  return (
    <div className="bg-slate-800 min-h-screen flex">
      <BrowserRouter>
        <Sidebar />
        <Sidenotes />

        <Routes>
          <Route path="/" element={<NotesList />} />
          <Route path="/notes/:id" element={<DisplayedNote />}></Route>

          <Route path="/edit" element={<Edit />} />
          <Route path="/edit/:id" element={<Edit />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
