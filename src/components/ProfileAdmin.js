import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import EditProfileButton from './Admin/EditProfileButton';
import Loader from './Loader';
import { getUserById } from '../supabaseApi';
const Profile = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchUserData = async () => {
            if (user && user.sub) {
                try {
                    const userId = user.sub;
                    const response = await getUserById(userId);
                    if (response) {
                        setProfile(response);
                    }
                    else {
                        setError('No user data found');
                    }
                }
                catch (err) {
                    setError('Error fetching user data');
                    console.error('Error fetching user data:', err);
                }
                finally {
                    setLoading(false);
                }
            }
        };
        fetchUserData();
    }, [user]);
    if (isLoading || loading) {
        return _jsx(Loader, {});
    }
    if (!isAuthenticated) {
        return _jsx("div", { className: "text-center", children: "Please log in to view this page." });
    }
    if (error) {
        return _jsx("div", { className: "text-center text-red-500", children: error });
    }
    if (!profile) {
        return _jsx("div", { className: "text-center", children: "No user data available" });
    }
    return (_jsxs("div", { className: "relative max-w-full mx-auto bg-slate text-gray-800 shadow-md rounded-lg", children: [_jsxs("div", { className: "relative w-full xl:h-[400px] xs:h-[150px] ", children: [_jsx("img", { src: profile.header, alt: "Header", width: 223, height: 400, className: "w-full h-full object-cover rounded-t-lg" }), _jsx("div", { className: "absolute inset-0 flex justify-start mt-[70px]", children: _jsx("img", { src: profile.logo, alt: "Logo", className: "xl:w-[200px] xl:h-[200px] xs:w-[100px] xs:h-[100px] ml-7 rounded-full border-2 border-gray-300", style: { marginTop: 'calc(16% - 2rem)' } }) })] }), _jsxs("div", { className: "p-4 mt-8", children: [_jsx("h1", { className: "xs:text-xl xl:text-3xl font-bold xl:my-2 text-white", children: profile.businessName }), _jsxs("p", { className: 'font-semibold py-1 xs:text-xs', children: ["Email: ", profile.email] }), _jsxs("p", { className: 'font-semibold py-1 xs:text-xs', children: ["WhatsApp: +", profile.whatsapp] }), _jsxs("p", { className: 'font-semibold py-1 xs:text-xs', children: ["Instagram: ", profile.instagram] }), _jsx(EditProfileButton, {})] })] }));
};
export default Profile;
