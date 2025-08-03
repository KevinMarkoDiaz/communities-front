// Componente EventoDetalle.jsx con los mismos cambios visuales que NegocioDetalle

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

import { PhotoGallery } from "../components/bussines/PhotoGallery";
import { MdAccessTime, MdCheckCircle, MdEvent } from "react-icons/md";

function BadgeEstadoEvento({ date }) {
  const now = new Date();
  const eventDate = new Date(date);
  const isToday = now.toDateString() === eventDate.toDateString();

  let status = "próximo";
  let bgColor = "bg-blue-100";
  let textColor = "text-blue-800";
  let icon = <MdEvent className="text-blue-600 text-xl" />;

  if (now > eventDate) {
    status = "finalizado";
    bgColor = "bg-red-100";
    textColor = "text-red-800";
    icon = <MdAccessTime className="text-red-600 text-xl" />;
  } else if (isToday) {
    status = "en vivo";
    bgColor = "bg-green-100";
    textColor = "text-green-800";
    icon = <MdCheckCircle className="text-green-600 text-xl" />;
  }

  return (
    <div
      className={`inline-flex items-center gap-2 p-3 rounded-xl text-md font-semibold shadow-md ${bgColor} ${textColor}`}
    >
      {icon}
      <span className="capitalize ">Evento {status}</span>
    </div>
  );
}

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
        setEvento(event);
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
      if (!evento?._id) return;
      try {
        const res = await axiosInstance.get("/users/me/following?type=event");
        const ids = res.data.items.map((e) => String(e._id));
        setYaSigue(ids.includes(String(evento._id)));
      } catch (err) {
        console.warn("No se pudo cargar el estado de seguimiento:", err);
      }
    };
    fetchFollow();
  }, [evento?._id]);

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
      <div className="px-4 py-5 flex justify-center">
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
    <div className="md:px-8 xl:px-40 py-5 flex justify-center">
      <div className="w-full max-w-[960px] flex flex-col gap-12">
        <div className="w-full max-w-[960px] flex flex-col gap-12">
          <div
            className="
      relative w-screen left-1/2 right-1/2 -translate-x-1/2
      sm:relative sm:w-full sm:left-0 sm:right-0 sm:translate-x-0
      bg-cover bg-center min-h-[220px] sm:min-h-[300px] lg:min-h-[400px]
      flex flex-col justify-end md:rounded-xl overflow-hidden shadow-sm
    "
            style={{
              backgroundImage: `linear-gradient(0deg, rgba(0,0,0,0.4), rgba(0,0,0,0)), url(${
                evento.featuredImage ||
                "https://via.placeholder.com/1200x400?text=Imagen+no+disponible"
              })`,
            }}
          >
            <div className="p-6 sm:p-10"></div>
          </div>
        </div>

        <div className="space-y-2">
          <div className=" flex flex-col lg:flex-row justify-between md:items-center w-full gap-8">
            <h1 className="text-2xl font-bold text-gray-900">{evento.title}</h1>
            <BadgeEstadoEvento date={evento.date} />
          </div>

          <p className="text-sm text-gray-500">
            {new Date(evento.date).toLocaleDateString()} - {evento.time}
            {evento.location?.address &&
              ` · ${evento.location.address}, ${evento.location.city}`}
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

        <div className="flex flex-col gap-3">
          <div className="flex gap-4 items-start">
            <div className="flex flex-col md:flex-row gap-4">
              <UniversalFollowButton
                entityType="event"
                entityId={evento._id}
                initialFollowed={yaSigue}
              />
              <StartConversationButton entityType="event" entityId={id} />
            </div>
          </div>

          <Compartir
            url={window.location.href}
            title={`Participá en \"${evento.title}\" en Communities`}
            text={`Mirá este evento: ${
              evento.title
            } - ${evento.description?.slice(0, 100)}...`}
          />
        </div>

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

        <div className="border-l-4 border-gray-200 pl-4">
          <p className="font-sans text-[15px] text-gray-800 leading-relaxed whitespace-pre-line">
            {evento.description}
          </p>
        </div>

        {evento.images?.length > 0 && (
          <PhotoGallery galleryImages={evento.images} />
        )}

        {evento.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {evento.tags.map((tag, i) => (
              <span
                key={i}
                className="bg-gray-100 text-gray-800 px-3 py-1 text-xs rounded-full w-fit"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

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
                  className="w-fit shadow-lg flex items-center gap-2 px-2 py-2 rounded-full bg-gray-100 text-sm text-gray-700 hover:bg-gray-200"
                >
                  <img
                    src={community.flagImage || "/placeholder-flag.png"}
                    alt="bandera"
                    className="h-8 w-8 rounded-full object-cover"
                  />
                  {community.name}
                </Link>
              ))}
            </div>
          </div>
        )}
        <div className="mt-4 flex flex-col gap-3 md:flex-row md:flex-wrap">
          <div className="flex flex-wrap gap-2 md:w-full md:justify-between">
            <LikeButton
              targetType="event"
              targetId={id}
              initialLikes={evento.likes}
            />
            <StarRating targetType="event" targetId={id} />
          </div>
        </div>
        {Array.isArray(evento?.coordinates?.coordinates) &&
          evento.coordinates.coordinates.length === 2 && (
            <MapaNegocioDetalle
              lat={evento.coordinates.coordinates[1]}
              lng={evento.coordinates.coordinates[0]}
              name={evento.title}
            />
          )}

        <CommentsSection targetType="event" targetId={id} />
      </div>
    </div>
  );
}
