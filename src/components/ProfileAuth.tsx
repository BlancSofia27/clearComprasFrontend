import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import copy from "../assets/copy.svg"; // Asegúrate de que la ruta sea correcta
import { toast, Flip } from 'react-toastify'; // Corrige el import
import 'react-toastify/dist/ReactToastify.css'; // Importa los estilos necesarios

const ProfileAuth: React.FC = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  const copyToClipboard = () => {
    if (user?.sub) {
      navigator.clipboard.writeText(user.sub)
        .then(() => {
          toast.success('ID copiado al portapapeles', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Flip,
          });
        })
        .catch((err) => {
          console.error("Error al copiar: ", err);
        });
    }
  };

  if (isLoading) {
    return <div></div>;
  }

  return (
    isAuthenticated && user && (
      <div className="flex flex-row xs:w-[280px] xl:w-[360px] bg-celeste p-2 rounded-se-full text-white font-extralight">
        <img 
          className="xl:w-11 xl:h-11 xs:h-8 xs:w-8 rounded-full"
          src={user.picture} 
          alt={user.name} 
        />
        <div className="flex flex-col mx-3 text-start">
          <h2 className="xl:text-md xs:text-xs">{user.name}</h2>
          <h2 className="xl:text-md xs:text-xs">{user.email}</h2>
          <div className="flex items-center">
            <h1 className="xl:text-md xs:text-xs">ID: {user.sub}</h1>
            <button onClick={copyToClipboard} className="xl:ml-2 xs:w-5 xl:w-6">
              <img src={copy}
              className=""
              alt="copiar id" />
            </button>
          </div>
        </div>
      </div>
    )
  );
};



export default ProfileAuth;
