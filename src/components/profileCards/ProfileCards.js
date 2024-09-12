import { jsx as _jsx } from "react/jsx-runtime";
import ProfileCard from './ProfileCard'; // O el nombre correcto si se llama MyProfileCard
const ProfileCards = ({ posts }) => {
    if (!posts || posts.length === 0) {
        return _jsx("div", { className: "text-center", children: "No hay publicaciones para mostrar." });
    }
    return (_jsx("div", { className: "grid xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4", children: posts.map(post => (_jsx(ProfileCard, { post: post }, post.id))) }));
};
export default ProfileCards;
