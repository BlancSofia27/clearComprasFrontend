import React, { useState, useEffect } from "react";
import SesionButton from "../components/SesionButton";
import PostsList from "../components/PostsList";
import PanelButton from "../components/PanelButton";
import ProfileAuth from "../components/ProfileAuth";
import { useAuth0 } from "@auth0/auth0-react";
import Hero from "../components/Hero";
import { ToastContainer } from "react-toastify";
import { getUserById } from "../supabaseApi";

const Inicio: React.FC = () => {
  const { user } = useAuth0();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkUserExists = async () => {
      if (user?.sub) {
        try {
          const userId = user.sub
          const userData = await getUserById(userId);
          if (userData) {
            setIsAdmin(true);
          }
        } catch (error) {
          console.error("Error verifying user:", error);
        }
      }
    };

    checkUserExists();
  }, [user]);

  return (
    <div className='xl:bg-slate  justify-center items-center'>
        <div className="xl:flex xl:flex-row xl:justify-between xs:flex-col">
      <div className="flex flex-row  align-center justify-between mx-2">
        <ProfileAuth />
        
        <ToastContainer/>
        <SesionButton/>
        <a
  href='/PreguntasFrecuentes'
  className="flex justify-center xs:p-1 xs:m-1 xs:h-12 xs:w-12 xl:w-[300px]  xl:gap-3 xl:m-2 text-white items-center mx-auto shadow-xl text-sm md:text-lg bg-blue-500 backdrop-blur-md lg:font-semibold isolation-auto  before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-blue-300 hover:text-gray-50 before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10 px-3 md:px-4 py-2 overflow-hidden border-2 rounded-full group"
>
  <a className="flex xl:flex xs:hidden"> Preguntas Frecuentes</a>
 
  <svg
    className="w-6 xs:w-8 xs:h-8 md:w-8 h-6 md:h-8 justify-end group-hover:rotate-90 group-hover:bg-gray-50 text-gray-50 ease-linear duration-300 rounded-full border border-white group-hover:border-none group-hover:text-blue-200"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <circle cx="12" cy="12" r="10"></circle>
    <path d="M9 9a3 3 0 1 1 6 0c0 2-3 3-3 3"></path>
    <line x1="12" y1="17" x2="12" y2="17"></line>
  </svg>
</a>

      </div>
        {isAdmin && <PanelButton />}
        </div>
        <Hero/>
      <PostsList />
    </div>
  );
};

export default Inicio;
