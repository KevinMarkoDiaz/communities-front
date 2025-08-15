import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../../api/axiosInstance";
import { MdSend } from "react-icons/md";
import { mostrarFeedback } from "../../store/feedbackSlice"; // asegurate que esté bien importado

const CommentsSection = ({ targetType, targetId }) => {
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { usuario } = useSelector((state) => state.auth);

  const fetchComments = async () => {
    try {
      const res = await axiosInstance.get(
        `/comments/${targetType}/${targetId}`
      );
      setComments(res.data);
    } catch (err) {
      console.error("Error al obtener comentarios:", err);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [targetType, targetId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!usuario) {
      dispatch(
        mostrarFeedback({
          message: "Debes iniciar sesión para comentar.",
          type: "error",
        })
      );
      return;
    }

    if (!content.trim()) return;

    setLoading(true);
    try {
      await axiosInstance.post("/comments", {
        content,
        targetType,
        targetId,
      });
      setContent("");
      fetchComments();
    } catch (err) {
      console.error("Error creando comentario:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/comments/${id}`);
      fetchComments();
    } catch (err) {
      console.error("Error eliminando comentario:", err);
    }
  };

  return (
    <div className="mt-6 border-t pt-4">
      <h3 className="text-lg font-semibold mb-2">Comentarios</h3>

      {/* Formulario de comentario visible siempre */}
      <form onSubmit={handleSubmit} className="mb-4 flex flex-col gap-2">
        <div className="w-full md:w-[80%]">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="
              w-full
              bg-[#F4F9FE]
              border border-gray-200
              rounded-lg
              p-2
               text-xs
              placeholder:text-xs
              placeholder:text-gray-500
              focus:outline-none focus:ring-2 focus:ring-blue-200
              transition
            "
            rows={3}
            placeholder={
              usuario
                ? "Escribí tu comentario..."
                : "Iniciá sesión para dejar un comentario"
            }
            disabled={!usuario}
          />
        </div>
        <div className="w-full md:w-[80%] flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className={`flex items-center justify-center gap-2 shadow-md hover:shadow-lg px-3 py-2 rounded border border-gray-300 transition text-xs font-medium ${
              loading || !usuario
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            {loading ? (
              "Enviando..."
            ) : (
              <>
                <MdSend className="text-base" />
                Comentar
              </>
            )}
          </button>
        </div>
      </form>

      {/* Comentarios existentes */}
      {comments.length === 0 && (
        <p className="  text-xs text-gray-500">No hay comentarios aún.</p>
      )}

      <ul className="space-y-4 w-full">
        {comments.map((c) => (
          <li
            key={c._id}
            className="
              border bg-[#F4F9FE] border-gray-200 p-3 rounded-lg
              w-full  md:w-[60%] md:max-w-[80%]
            "
          >
            <div className="flex justify-between items-center mb-1">
              <div className="flex items-center gap-2">
                {c.author?.profileImage && (
                  <img
                    src={c.author.profileImage}
                    alt="avatar"
                    className="w-6 h-6 rounded-full"
                  />
                )}
                <span className="text-xs text-gray-700 font-semibold">
                  {c.author?.name}
                </span>
              </div>
              <span className="text-xs text-gray-500">
                {new Date(c.createdAt).toLocaleString()}
              </span>
            </div>
            <p className="text-gray-500  text-xs">{c.content}</p>
            {usuario && usuario.id === c.author?.id && (
              <button
                onClick={() => handleDelete(c._id)}
                className="text-red-500 text-xs mt-1"
              >
                Eliminar
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentsSection;
