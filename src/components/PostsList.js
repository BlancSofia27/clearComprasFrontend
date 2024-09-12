import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import PostCard from "./PostCard";
import Filters from "./Filters";
import SearchBar from "./SearchBar";
import ReactPaginate from "react-paginate";
import { getAllPosts } from "../supabaseApi"; // Importa la función
const PostsList = () => {
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [filters, setFilters] = useState({
        category: "",
        color: "",
        sortOrder: "asc",
    });
    const [searchTerm, setSearchTerm] = useState("");
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
        }
        catch (err) {
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
        }
        else if (filters.sortOrder === "desc") {
            filtered = filtered.sort((a, b) => b.price - a.price);
        }
        setFilteredPosts(filtered);
    };
    const handlePageChange = (selectedItem) => {
        setCurrentPage(selectedItem.selected);
    };
    const offset = currentPage * postsPerPage;
    const currentPosts = filteredPosts.slice(offset, offset + postsPerPage);
    return (_jsxs("div", { className: "w-full flex flex-col", children: [_jsx(SearchBar, { setSearchTerm: setSearchTerm }), _jsx("div", { className: "flex flex-row w-auto", children: _jsx(Filters, { setFilters: setFilters }) }), _jsx("div", { className: "justify-center card-list grid sm:grid-cols-3 xs:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:gap-4 xl:p-4 xs:p-1", children: currentPosts.length > 0 ? (currentPosts.map((post) => _jsx(PostCard, { post: post }, post.id))) : (_jsxs(_Fragment, { children: [_jsx("div", { className: "w-full text-end px-2 py-24 font-bold", children: "No se encontraron" }), _jsx("div", { className: "w-full text-start py-24 font-bold", children: "coincidencias" })] })) }), _jsx(ReactPaginate, { previousLabel: "Anterior", nextLabel: "Siguiente", breakLabel: "...", pageCount: Math.ceil(filteredPosts.length / postsPerPage), marginPagesDisplayed: 2, pageRangeDisplayed: 5, onPageChange: handlePageChange, containerClassName: "flex justify-center items-center space-x-2 my-4", pageClassName: "inline-block", pageLinkClassName: "xs:text-xs bg-celeste text-white px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 hover:text-gray-900 transition duration-200", previousClassName: "inline-block", previousLinkClassName: "xs:text-xs bg-celeste text-white px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 hover:text-gray-900 transition duration-200", nextClassName: "inline-block", nextLinkClassName: "xs:text-xs bg-celeste text-white px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 hover:text-gray-900 transition duration-200", breakClassName: "inline-block", breakLinkClassName: "px-4 py-2 text-gray-700", activeClassName: "bg-blue-500 text-white rounded-lg" })] }));
};
export default PostsList;
