import React, { useState, useEffect } from "react";
import PostCard from "./PostCard";
import Filters from "./Filters";
import SearchBar from "./SearchBar";
import ReactPaginate from "react-paginate";
import { getAllPosts } from "../supabaseApi"; // Importa la función

type SortOrder = "asc" | "desc";

interface Filters {
  category: string;
  color: string;
  sortOrder: SortOrder;
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

const PostsList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [filters, setFilters] = useState<Filters>({
    category: "",
    color: "",
    sortOrder: "asc",
  });
  const [searchTerm, setSearchTerm] = useState<string>("");
  const postsPerPage = 10;

  useEffect(() => {
    fetchPosts();
  }, [filters, searchTerm]);

  useEffect(() => {
    applyFilters();
  }, [posts, filters, searchTerm]);

  const fetchPosts = async () => {
    try {
      const data = await getAllPosts({ title: searchTerm, category: filters.category, color: filters.color, sortOrder: filters.sortOrder });
      console.log("Fetched posts from Supabase:", data);
      setPosts(data || []);
    } catch (err) {
      console.error("Error fetching posts from Supabase:", err);
    }
  };
  

  const applyFilters = () => {
    let filtered = [...posts];

    if (filters.category) {
      filtered = filtered.filter((post) => post.category === filters.category);
    }

    if (filters.color) {
      filtered = filtered.filter((post) => post.color === filters.color);
    }

    if (filters.sortOrder === "asc") {
      filtered = filtered.sort((a, b) => a.price - b.price);
    } else if (filters.sortOrder === "desc") {
      filtered = filtered.sort((a, b) => b.price - a.price);
    }

    setFilteredPosts(filtered);
  };

  const handlePageChange = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected);
  };

  const offset = currentPage * postsPerPage;
  const currentPosts = filteredPosts.slice(offset, offset + postsPerPage);

  return (
    <div className="w-full flex flex-col">
      <SearchBar setSearchTerm={setSearchTerm} />
      <div className="flex flex-row w-auto">
        <Filters setFilters={setFilters} />
      </div>
      <div className="justify-center card-list grid sm:grid-cols-3 xs:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:gap-4 xl:p-4 xs:p-1">
        {currentPosts.length > 0 ? (
          currentPosts.map((post) => <PostCard key={post.id} post={post} />)
        ) : (
          <div className="p-20 text-center justify-center">No posts found</div>
        )}
      </div>

      <ReactPaginate
        previousLabel={"Anterior"}
        nextLabel={"Siguiente"}
        breakLabel={"..."}
        pageCount={Math.ceil(filteredPosts.length / postsPerPage)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageChange}
        containerClassName="flex justify-center items-center space-x-2 my-4"
        pageClassName="inline-block"
        pageLinkClassName="xs:text-xs bg-celeste text-white px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 hover:text-gray-900 transition duration-200"
        previousClassName="inline-block"
        previousLinkClassName="xs:text-xs bg-celeste text-white px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 hover:text-gray-900 transition duration-200"
        nextClassName="inline-block"
        nextLinkClassName="xs:text-xs bg-celeste text-white px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 hover:text-gray-900 transition duration-200"
        breakClassName="inline-block"
        breakLinkClassName="px-4 py-2 text-gray-700"
        activeClassName="bg-blue-500 text-white rounded-lg"
      />
    </div>
  );
};

export default PostsList;
