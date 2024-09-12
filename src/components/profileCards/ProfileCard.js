import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
const MyCard = ({ post }) => {
    const { title, price, imageUrl, imageUrl1, imageUrl2, size, brand } = post;
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: true,
    };
    const images = [imageUrl, imageUrl1, imageUrl2].filter(Boolean);
    return (_jsxs("div", { className: "flex flex-col xl:w-[220px] xl:h-[510px] xs:w-[150px] xs:h-[320px] max-w-sm m-4 bg-white shadow-md rounded-md overflow-hidden", children: [_jsx("div", { className: "relative", children: _jsx(Slider, { ...settings, children: images.map((image, index) => (_jsx("div", { children: _jsx("img", { src: image, alt: `Product Image ${index + 1}`, className: "object-cover w-full xl:h-[300px] xs:h-[170px]" }) }, index))) }) }), _jsxs("div", { className: "xl:p-4 xs:p-2 xl:text-md xs:text-sm xs:mt-3", children: [_jsx("div", { className: "flex items-center xl:text-lg xs:text-sm font-semibold text-center justify-center h-16 w-full", children: title }), _jsxs("div", { className: "flex xs:flex-row justify-between ", children: [_jsxs("div", { className: "flex flex-col", children: [_jsxs("p", { className: "text-gray-600 xl:text-lg ", children: ["$", price] }), _jsx("p", { className: "xs:hidden xl:flex text-gray-600 mb-2 ", children: "Talle" })] }), _jsx("p", { children: brand })] }), _jsx("div", { className: "flex flex-wrap gap-2 xs:m-2 xl:m-0", children: size.map((s, index) => (_jsx("span", { className: "bg-gray-200 text-gray-700 px-2 py-1 rounded", children: s }, index))) })] })] }));
};
export default MyCard;
