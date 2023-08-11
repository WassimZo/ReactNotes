import { nanoid } from "nanoid";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addNotesFromUser, editNote } from "../features/notes";
import { useParams } from "react-router-dom";

export default function Edit() {
  const [inputState, setInputState] = useState({
    title: "",
    subtitle: "",
    bodyText: "",
  });
  const [showValidation, setShowValidation] = useState({
    title: false,
    subtitle: false,
    bodyText: false,
  });
  const notes = useSelector((state) => state.notes);
  const dispatch = useDispatch();

  const { id } = useParams();

  useEffect(() => {
    if (id && notes.list) {
      setInputState({
        title: notes.list.find((note) => note.id === id).title,
        subtitle: notes.list.find((note) => note.id === id).subtitle,
        bodyText: notes.list.find((note) => note.id === id).bodyText,
      });
    } else {
      setInputState({
        title: "",
        subtitle: "",
        bodyText: "",
      });
    }
  }, [id]);

  function handleSubmit(e) {
    e.preventDefault();

    if (Object.values(inputState).every((value) => value)) {
      setShowValidation({
        title: false,
        subtitle: false,
        bodyText: false,
      });

      if (notes.list && id) {
        dispatch(editNote({ ...inputState, id }));
      } else {
        dispatch(addNotesFromUser({ ...inputState, id: nanoid(8) }));
        setInputState({ title: "", subtitle: "", bodyText: "" });
      }
    } else {
      for (const [key, value] of Object.entries(inputState)) {
        if (value.length === 0) {
          setShowValidation((state) => ({ ...state, [key]: true }));
        } else {
          setShowValidation((state) => ({ ...state, [key]: false }));
        }
      }
    }
  }
  return (
    <div className="w-full p-10">
      <p className="text-slate-100 text-xl mb-4">Ajouter une note</p>

      <form onSubmit={handleSubmit}>
        <label htmlFor="title" className="mb-2 block text-slate-100">
          Le titre
        </label>
        <input
          type="text"
          className="p-2 text-md block w-full rounded bg-slate-200"
          onChange={(e) =>
            setInputState({ ...inputState, title: e.target.value })
          }
          value={inputState.title}
          id="title"
        />
        {showValidation.title && (
          <p className="text-red-400 mb-2">Veuillez ecrire un titre</p>
        )}
        <label htmlFor="subtitle" className="mb-2 block text-slate-100 mt-4">
          Le sous-titre
        </label>
        <input
          type="text"
          className="p-2 text-md block w-full rounded bg-slate-200"
          onChange={(e) =>
            setInputState({ ...inputState, subtitle: e.target.value })
          }
          value={inputState.subtitle}
          id="subtitle"
        />
        {showValidation.subtitle && (
          <p className="text-red-400 mb-2">Veuillez ecrire un sous-titre</p>
        )}
        <label htmlFor="bodyText" className="mb-2 block text-slate-100 mt-4">
          Contenu de la note
        </label>
        <textarea
          id="bodyText"
          onChange={(e) =>
            setInputState({ ...inputState, bodyText: e.target.value })
          }
          value={inputState.bodyText}
          className="w-full min-h-[300px] p-2 rounded bg-slate-200"
          spellCheck="false"
        ></textarea>
        \
        {showValidation.bodyText && (
          <p className="text-red-400 mb-2">Veuillez ecrire du contenu</p>
        )}
        <button className="mt-4 px-3 py-1 bg-slate-100 rounded" type="submit">
          Enregistrer
        </button>
      </form>
    </div>
  );
}
