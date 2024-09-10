import React, { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import ProfilePostsList from "../components/profileCards/ProfilePostsList"
import Loader from "../components/Loader"
import { getUserById } from "../supabaseApi"

interface User {
  userId: string
  email: string
  businessName: string
  direction: string
  whatsapp: string
  instagram: string
  header: string
  logo: string
}

const Profile: React.FC = () => {
  const { userId } = useParams<{ userId: string }>() // Obtén el parámetro userId de la URL
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUserData = async () => {
      if (userId) {
        try {
          const response = await getUserById(userId);
          if (response) {
            setUser(response);
          } else {
            setError('No user data found');
          }
        } catch (err) {
          setError('Error fetching user data');
          console.error('Error fetching user data:', err);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserData();
  }, [userId]);

  if (loading) {
    return <Loader/>
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>
  }

  if (!user) {
    return <div className="text-center">No user data available</div>
  }

  return (
    <>
      <Link to="/">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 xl:px-4 xl:mx-4 xs:text-xs xs:p-2 mx-2 rounded">
          Inicio
        </button>
      </Link>
      <div className="relative max-w-full mx-auto bg-white shadow-md font-semibold">
        {/* Header */}
        <div className="p-4 relative w-full xl:h-[400px] md:h-[300px] xs:h-[200px]">
          <img
            src={user.header}
            alt="Header"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex xs:mb-[60px] sm:mb-8 md:ml-[20px] md:justify-start xl:justify-start xl:mb-[100px] xs:mt-[100px] xs:justify-center items-center">
            <img
              src={user.logo}
              alt="Logo"
              className="xl:w-[200px] xl:h-[200px] xs:w-[160px] md:mb-[30px] xl:ml-7 rounded-full border-2 border-gray-300"
              style={{ marginTop: "calc(24% - 2rem)" }}
            />
          </div>
        </div>
        {/* User Information */}
        <div className="p-6 xl:mt-8 md:mt-12">
          <h1 className="xl:text-3xl xs:text-md text-zinc-800 my-2">
            {user.businessName}
          </h1>
          {user.direction ? <h3>Dirección: {user.direction}</h3> : <h3>Venta online</h3>}
          <div className="flex justify-end my-3">
            {/* Botón de WhatsApp */}
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
                <path d="M224.1 141c-63.8 0-115.2 51.4-115.2 115.2s51.4 115.2 115.2 115.2 115.2-51.4 115.2-115.2-51.4-115.2-115.2-115.2zm0 198.4c-45.8 0-83.2-37.4-83.2-83.2s37.4-83.2 83.2-83.2 83.2 37.4 83.2 83.2-37.4 83.2-83.2 83.2zM379.6 92.8c-15.1 0-27.5 12.4-27.5 27.5s12.4 27.5 27.5 27.5 27.5-12.4 27.5-27.5-12.4-27.5-27.5-27.5zM224.1 0c-61.4 0-114.5 49.4-114.5 110.5v291c0 61.1 53.1 110.5 114.5 110.5s114.5-49.4 114.5-110.5v-291c0-61.1-53.1-110.5-114.5-110.5zM224.1 382.8c-45.8 0-83.2-37.4-83.2-83.2V114.4c0-45.8 37.4-83.2 83.2-83.2s83.2 37.4 83.2 83.2v185.2c0 45.8-37.4 83.2-83.2 83.2z" />
              </svg>
              <span className="hidden xl:block md:block">Instagram</span>
            </a>
          </div>
        </div>
        {/* Publicaciones del Usuario */}
        <div className="bg-gray-100">
          <ProfilePostsList userId={userId} />
        </div>
      </div>
    </>
  )
}

export default Profile
