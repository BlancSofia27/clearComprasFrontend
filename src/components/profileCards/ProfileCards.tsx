import React from 'react';
import ProfileCard from './ProfileCard'; // O el nombre correcto si se llama MyProfileCard

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

const ProfileCards: React.FC<ProfileCardsProps> = ({ posts }) => {
  if (!posts || posts.length === 0) {
    return <div className="text-center">No hay publicaciones para mostrar.</div>;
  }

  return (
    <div className="grid xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {posts.map(post => (
        <ProfileCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default ProfileCards;
