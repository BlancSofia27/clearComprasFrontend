import { jsx as _jsx } from "react/jsx-runtime";
// Cards.tsx
import { useEffect, useState } from 'react';
import PostCard from './PostCard';
import Loader from './Loader';
import { getUserById } from '../supabaseApi';
const Cards = ({ posts }) => {
    const [users, setUsers] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const userIds = [...new Set(posts.map(post => post.userId))];
                const userPromises = userIds.map(id => getUserById(id));
                const usersData = await Promise.all(userPromises);
                const usersMap = usersData.reduce((acc, user) => {
                    acc[user.id] = user;
                    return acc;
                }, {});
                setUsers(usersMap);
            }
            catch (err) {
                setError('Error al obtener los usuarios');
            }
            finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, [posts]);
    if (loading)
        return _jsx(Loader, {});
    if (error)
        return _jsx("p", { children: error });
    return (_jsx("div", { className: "grid grid-cols-4 gap-4", children: posts.map(post => {
            const user = users[post.userId]; // Obtén el usuario correspondiente
            return user ? (_jsx(PostCard, { post: post }, post.id)) : null;
        }) }));
};
export default Cards;
