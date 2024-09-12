// Profile.tsx

import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import ProfilePostsList from "../components/profileCards/ProfilePostsList";
import Loader from "../components/Loader";
import { getUserById } from "../supabaseApi";

interface User {
  userId?: string;
  email: string;
  businessName: string;
  direction: string;
  whatsapp: string;
  instagram: string;
  header: string;
  logo: string;
}

const Profile: React.FC = () => {
  const { userId } = useParams<{ userId?: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      if (userId) {
        try {
          const response = await getUserById(userId);
          if (response) {
            setUser(response);
          } else {
            setError("No user data found");
          }
        } catch (err) {
          setError("Error fetching user data");
          console.error("Error fetching user data:", err);
        } finally {
          setLoading(false);
        }
      } else {
        setError("Invalid user ID");
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        {error}
        <button
          onClick={() => navigate("/")}
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Volver al inicio
        </button>
      </div>
    );
  }

  if (!user) {
    return <div className="text-center">No user data available</div>;
  }

  return (
    <>
      <Link to="/">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 xl:px-4 xl:mx-4 xs:text-xs xs:p-2 mx-2 rounded">
          Inicio
        </button>
      </Link>
      <div className="relative max-w-full mx-auto bg-white shadow-md font-semibold">
        <div className="p-4 relative w-full xl:h-[400px] md:h-[300px] xs:h-[200px]">
          <img
            src={user.header}
            alt="Header"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex xl:justify-start xs:justify-center xs:mt-[80px]  xl:mt-[100px]">
          <img
            src={user.logo}
            alt="Logo"
            className="xl:w-[200px] xl:h-[200px] xs:w-[150px]   xs:h-[150px]  xl:ml-12 rounded-full border-2 border-gray-300"
            style={{ marginTop: 'calc(13% - 2rem)' }}
          />
        </div>
        </div>
        <div className="p-6 xl:mt-8 md:mt-12 font-bold">
          <h1 className="xl:text-3xl xs:text-md text-zinc-800 mt-9">
            {user.businessName}
          </h1>
          {user.direction ? (
            <h3>Dirección: {user.direction}</h3>
          ) : (
            <h3>Venta online</h3>
          )}
          <div className="flex justify-end my-3">
            <a
              href={`https://wa.me/${user.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center w-1/10 mx-2 rounded bg-[#128c7e] px-6 py-1 md:px-5 text-xs font-medium uppercase leading-normal text-white focus:outline-none transition duration-1000 ease-in-out transform hover:bg-white hover:text-[#128c7e]"
            >
              <svg
                className="h-4 w-4 mr-1"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 448 512"
              >
                <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
              </svg>
              <span className="hidden xl:block md:block">WhatsApp</span>
            </a>
            {/* Botón de Instagram */}
            <a
              href={`https://www.instagram.com/${user.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center mx-2 rounded bg-[#E4405F] px-6 py-1 md:px-5 text-xs font-medium uppercase leading-normal text-white focus:outline-none transition duration-1000 ease-in-out transform hover:bg-white hover:text-[#E4405F]"
            >
              <svg
                className="h-4 w-4 mr-1"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 448 512"
              >
                <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
              </svg>
              <span className="hidden xl:block md:block">Instagram</span>
            </a>
          </div>
        </div>
        {userId && <ProfilePostsList userId={userId} />}
      </div>
    </>
  );
};

export default Profile;
