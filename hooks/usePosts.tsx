/* eslint-disable react-hooks/exhaustive-deps */
import { Post, User } from "@/types";
import useSWR from "swr";
import axios from "../lib/axios.config";

export default function usePosts() {

    const { data: posts, mutate: mutatePosts, error: errorFetchingPosts } = useSWR<Post[]>("/posts",
        async (url: string) => {
            const { data } = await axios.get<Post[]>(url);
            return data;
        });

    return {
        posts
    }

}