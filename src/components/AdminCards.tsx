// src/components/Cards.tsx
import React from 'react';
import AdminCard from './AdminCard';



interface Post {
  id: string;
  title: string;
  price: string;
  imageUrl: string;
  imageUrl1: string;
  imageUrl2: string;
  size: string;
  category: string;
  brand: string;
  color: string;
}

interface ProfileCardsProps {
  posts: Post[];
}

const AdminCards: React.FC<ProfileCardsProps> = ({ posts }) => {
  if (!posts || posts.length === 0) {
    return <div className="text-center">No hay publicaciones para mostrar.</div>;
  }

  return (
    <div className="grid xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {posts.map(post => (
        <AdminCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default AdminCards;