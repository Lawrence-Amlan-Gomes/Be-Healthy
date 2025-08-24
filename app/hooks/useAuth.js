import { AuthContext } from "../contexts";
import { useContext } from "react";

export const useAuth = () => {
    const {auth, setAuth, allPosts, setAllPosts} = useContext(AuthContext);
    return {auth, setAuth, allPosts, setAllPosts};
}