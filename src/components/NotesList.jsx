import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function NotesList() {
  const notes = useSelector((state) => state.notes);
  return (
    <div className="p-10 w-full">
      <p className="text-xl text-slate-200 mb-6">Bienvenue sur Notes101</p>

      <div className="grid lg:grid-cols=2 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
        {notes.list?.length > 0 &&
          notes.list.map((note) => (
            <Link to={`/notes/${note.id}`} className="w-full h-full">
              <div
                key={note.id}
                className="bg-slate-100 hover:bg-slate-50 p-4 rounded cursor-pointer"
              >
                <span className="text-lg font-semibold block">
                  {note.title}
                </span>
                <span className="text-gray-700 block">{note.subtitle}</span>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}
