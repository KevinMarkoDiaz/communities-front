import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getEventById } from "../api/eventApi";
import { getBusinessById } from "../api/businessApi";
import { getCommunityById } from "../api/communityApi";
import MapaNegocioDetalle from "../components/bussines/MapaNegocioDetalle";
import Compartir from "../components/Compartir";
import DetalleSkeleton from "../components/Skeleton/DetalleSkeleton";

import UniversalFollowButton from "../components/badges/UniversalFollowButton";
import axiosInstance from "../api/axiosInstance";
import StartConversationButton from "../components/mensajes/StartConversationButton";
import CommentsSection from "../components/mensajes/CommentsSection";
import StarRating from "../components/badges/StarRating";
import LikeButton from "../components/badges/LikeButton";

export default function EventoDetalle() {
  const { id } = useParams();
  const [evento, setEvento] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sponsorsData, setSponsorsData] = useState([]);
  const [communitiesData, setCommunitiesData] = useState([]);
  const [yaSigue, setYaSigue] = useState(false);

  useEffect(() => {
    const cargarEvento = async () => {
      try {
        const { event } = await getEventById(id);
        setEvento({
          id: event._id,
          title: event.title,
          description: event.description,
          date: event.date,
          time: event.time,
          location: event.location,
          image: event.featuredImage,
          images: event.images || [],
          tags: event.tags || [],
          price: event.price ?? 0,
          isFree: event.isFree ?? true,
          registrationLink: event.registrationLink || "",
          isOnline: event.isOnline || false,
          virtualLink: event.virtualLink || "",
          status: event.status,
          organizerModel: event.organizerModel,
          organizer: event.organizer,
          sponsors: event.sponsors || [],
          categories: event.categories || [],
          communities: event.communities || [],
          businesses: event.businesses || [],
          createdAt: event.createdAt,
          likes: event.likes || [],
        });
      } catch (err) {
        console.error("Error cargando evento:", err);
        setError("No se pudo cargar el evento.");
      } finally {
        setLoading(false);
      }
    };
    cargarEvento();
  }, [id]);

  useEffect(() => {
    const fetchFollow = async () => {
      if (!evento?.id) return;
      try {
        const res = await axiosInstance.get("/users/me/following?type=event");
        const ids = res.data.items.map((e) => String(e._id));
        setYaSigue(ids.includes(String(evento.id)));
      } catch (err) {
        console.warn("No se pudo cargar el estado de seguimiento:", err);
      }
    };
    fetchFollow();
  }, [evento?.id]);

  useEffect(() => {
    const cargarSponsors = async () => {
      if (evento?.sponsors?.length > 0) {
        try {
          const promises = evento.sponsors.map((s) => getBusinessById(s._id));
          const data = await Promise.all(promises);
          setSponsorsData(data);
        } catch (err) {
          console.error("Error cargando sponsors:", err);
        }
      }
    };
    cargarSponsors();
  }, [evento?.sponsors]);

  useEffect(() => {
    const cargarCommunities = async () => {
      if (evento?.communities?.length > 0) {
        try {
          const promises = evento.communities.map((c) =>
            getCommunityById(c._id)
          );
          const data = await Promise.all(promises);
          setCommunitiesData(data);
        } catch (err) {
          console.error("Error cargando comunidades:", err);
        }
      }
    };
    cargarCommunities();
  }, [evento?.communities]);

  if (loading)
    return (
      <div className="px-4 sm:px-8 lg:px-8 xl:px-40 py-5 flex justify-center">
        <div className="w-full max-w-[960px]">
          <DetalleSkeleton />
        </div>
      </div>
    );

  if (error || !evento)
    return (
      <div className="p-4 text-red-600 text-center">
        {error || "Evento no encontrado."}
      </div>
    );

  return (
    <div className="px-4 sm:px-8 lg:px-8 xl:px-40 py-5 flex justify-center">
      <div className="w-full max-w-[960px] flex flex-col gap-12">
        {/* Imagen destacada */}
        <div
          className="w-full h-56 sm:h-72 rounded-xl bg-cover bg-center shadow-md"
          style={{ backgroundImage: `url(${evento.image})` }}
        />

        {/* Encabezado */}
        <div className="space-y-2">
          <div className="flex justify-between items-center w-full">
            <h1 className="text-2xl font-bold text-gray-900">{evento.title}</h1>
            {evento.status && (
              <span className="flex items-center gap-2 w-fit px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                <span className="relative flex h-3 w-3 items-center justify-center">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-700"></span>
                </span>
                Activo
              </span>
            )}
          </div>

          {/* Fecha y ubicación */}
          <p className="text-sm text-gray-500">
            {new Date(evento.date).toLocaleDateString()} - {evento.time}
            {evento.location?.address && (
              <>
                {" · "}
                {evento.location.address}, {evento.location.city}
              </>
            )}
          </p>

          {!evento.isFree && evento.price > 0 && (
            <p className="text-sm text-green-600 font-medium">
              Precio: ${evento.price}
            </p>
          )}
          <p className="text-xs text-gray-400">
            Publicado el {new Date(evento.createdAt).toLocaleDateString()}
          </p>
        </div>

        {/* Botones de interacción */}
        <div className="flex flex-col gap-3">
          <div className="flex gap-4 items-start">
            <div className="flex gap-4">
              <LikeButton
                targetType="event"
                targetId={id}
                initialLikes={Array.isArray(evento.likes) ? evento.likes : []}
              />
              <UniversalFollowButton
                entityType="event"
                entityId={evento.id}
                initialFollowed={yaSigue}
              />

              <StartConversationButton entityType="event" entityId={id} />
            </div>
            <StarRating targetType="event" targetId={id} />
          </div>

          <Compartir
            url={window.location.href}
            title={`Participá en "${evento.title}" en Communities`}
            text={`Mirá este evento: ${
              evento.title
            } - ${evento.description?.slice(0, 100)}...`}
          />
        </div>

        {/* Botones de acción */}
        <div className="flex gap-4">
          {evento.registrationLink && (
            <a
              href={evento.registrationLink}
              target="_blank"
              rel="noreferrer"
              className="inline-block w-fit px-4 py-2 bg-black text-white text-sm rounded transition"
            >
              Registrate
            </a>
          )}
          {evento.isOnline && evento.virtualLink && (
            <a
              href={evento.virtualLink}
              target="_blank"
              rel="noreferrer"
              className="inline-block w-fit px-4 py-2 bg-green-600 text-white text-sm rounded transition"
            >
              Ingresar al evento virtual
            </a>
          )}
        </div>

        {/* Descripción */}
        <div className="border-l-4 border-gray-200 pl-4">
          <p className="font-sans text-[15px] text-gray-800 leading-relaxed whitespace-pre-line">
            {evento.description}
          </p>
        </div>

        {/* Galería */}
        {evento.images?.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {evento.images.map((img, idx) => (
              <div
                key={idx}
                className="w-full h-40 rounded-xl bg-cover bg-center"
                style={{ backgroundImage: `url(${img})` }}
              />
            ))}
          </div>
        )}

        {/* Tags */}
        {evento.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {evento.tags.map((tag, i) => (
              <span
                key={i}
                className="bg-gray-100 text-gray-800 px-3 py-1 text-xs rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Sponsors */}
        {sponsorsData.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Patrocinadores
            </h2>
            <div className="flex gap-3 flex-wrap">
              {sponsorsData.map(({ business }) => (
                <Link
                  to={`/negocios/${business.id}`}
                  key={business.id}
                  className="flex flex-col items-center w-24"
                >
                  <div
                    className="w-20 h-20 rounded-xl bg-cover bg-center border mb-1"
                    style={{
                      backgroundImage: `url(${
                        business.profileImage || "/avatar-placeholder.png"
                      })`,
                    }}
                  />
                  <p className="text-xs text-center text-gray-700 font-medium line-clamp-2">
                    {business.name}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Comunidades */}
        {communitiesData.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Comunidades relacionadas
            </h2>
            <div className="flex gap-2 flex-wrap">
              {communitiesData.map(({ community }) => (
                <Link
                  key={community._id}
                  to={`/comunidades/${community._id}`}
                  className="flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 text-sm text-gray-700 hover:bg-gray-200"
                >
                  <img
                    src={community.flagImage || "/placeholder-flag.png"}
                    alt="bandera"
                    className="h-4 w-4 rounded-full object-cover"
                  />
                  {community.name}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Mapa */}
        {evento?.location?.coordinates?.lat &&
          evento?.location?.coordinates?.lng && (
            <MapaNegocioDetalle
              lat={evento.location.coordinates.lat}
              lng={evento.location.coordinates.lng}
              name={evento.title}
            />
          )}
        {/* Comentarios */}
        <CommentsSection targetType="event" targetId={id} />
      </div>
    </div>
  );
}
