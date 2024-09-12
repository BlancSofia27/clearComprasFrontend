import { jsx as _jsx } from "react/jsx-runtime";
import spinner from '../assets/spinner.gif';
const Loader = () => {
    return (_jsx("div", { className: "flex justify-center items-center w-screen h-screen", children: _jsx("img", { src: spinner, alt: "Loading...", className: "w-20 h-20" }) }));
};
export default Loader;
