// Cards.tsx
import React, { useEffect, useState } from 'react';
import PostCard from './PostCard';
import Loader from './Loader';
import { getUserById } from '../supabaseApi';

interface User {
  id: string;
  businessName: string;
  // otras propiedades del usuario
}

interface Post {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  imageUrl1?: string;
  imageUrl2?: string;
  size: string[];
  category: string;
  brand: string;
  color: string;
  userId: string;
}

interface CardsProps {
  posts: Post[];
}

const Cards: React.FC<CardsProps> = ({ posts }) => {
  const [users, setUsers] = useState<{ [key: string]: User }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userIds = [...new Set(posts.map(post => post.userId))];
        const userPromises = userIds.map(id => getUserById(id));
        const usersData = await Promise.all(userPromises);
        const usersMap = usersData.reduce((acc, user) => {
          acc[user.id] = user;
          return acc;
        }, {} as { [key: string]: User });

        setUsers(usersMap);
      } catch (err) {
        setError('Error al obtener los usuarios');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [posts]);

  if (loading) return <Loader />;
  if (error) return <p>{error}</p>;

  return (
    <div className="grid grid-cols-4 gap-4">
      {posts.map(post => {
        const user = users[post.userId]; // Obtén el usuario correspondiente
        return user ? (
          <PostCard
            key={post.id}
            post={post}
             // Pasa el usuario a PostCard
          />
        ) : null;
      })}
    </div>
  );
};

export default Cards;
