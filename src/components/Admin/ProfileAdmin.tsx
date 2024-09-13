import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import EditProfileButton from './EditProfileButton';
import Loader from '../Loader';
import { getUserById } from '../../supabaseApi';

interface User {
  userId: string;
  email: string;
  businessName: string;
  whatsapp: string;
  header: string;
  logo: string;
  instagram: string;
}

const Profile: React.FC = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [profile, setProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user && user.sub) {
        try {
          const userId = user.sub;
          const response = await getUserById(userId);
          if (response) {
            setProfile(response);
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
  }, [user]);

  if (isLoading || loading) {
    return <Loader />;
  }

  if (!isAuthenticated) {
    return <div className="text-center">Please log in to view this page.</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (!profile) {
    return <div className="text-center">No user data available</div>;
  }

  return (
    <div className="relative max-w-full mx-auto bg-slate text-gray-800 shadow-md rounded-lg">
      {/* Header */}
      <div className="relative w-full xl:h-[400px] xs:h-[150px] ">
        <img
          src={profile.header}
          alt="Header"
          width={223} height={400}
          className="w-full h-full object-cover rounded-t-lg"
        />
        <div className="absolute inset-0 flex justify-start mt-[70px]">
          <img
            src={profile.logo}
            alt="Logo"
            className="xl:w-[200px] xl:h-[200px] xs:w-[100px] xs:h-[100px] ml-7 rounded-full border-2 border-gray-300"
            style={{ marginTop: 'calc(16% - 2rem)' }}
          />
        </div>
      </div>

      {/* User Information */}
      <div className="p-4 mt-8">
        <h1 className="xs:text-xl xl:text-3xl font-bold xl:my-2 text-white">{profile.businessName}</h1>

        {/* Additional Profile Information */}
        <p className='font-semibold py-1 xs:text-xs'>Email: {profile.email}</p>
        <p className='font-semibold py-1 xs:text-xs'>WhatsApp: +{profile.whatsapp}</p>
        <p className='font-semibold py-1 xs:text-xs'>Instagram: {profile.instagram}</p>
        <EditProfileButton profileData={profile}/>
      </div>
    </div>
  );
};

export default Profile;
