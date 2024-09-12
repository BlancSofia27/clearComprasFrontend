import { jsx as _jsx } from "react/jsx-runtime";
import AdminCard from './AdminCard';
const AdminCards = ({ posts }) => {
    if (!posts || posts.length === 0) {
        return _jsx("div", { className: "text-center", children: "No hay publicaciones para mostrar." });
    }
    return (_jsx("div", { className: "grid xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4", children: posts.map(post => (_jsx(AdminCard, { post: post }, post.id))) }));
};
export default AdminCards;
