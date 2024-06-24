import { bookmarksState } from "@/store";
import { Post } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { useToast } from "react-native-toast-notifications";
import { useRecoilState } from "recoil";

export default function useBookmarks() {
    const [bookmarks, setBookmarks] = useRecoilState(bookmarksState)
    const toast = useToast();
    const [fetchingBookmarks, setFetchingBookmarks] = useState<boolean>(false);

    const fetchBookmarks = async () => {
        setFetchingBookmarks(true);
        const bookmarks = await AsyncStorage.getItem('bookmarks');
        if (bookmarks) {
            setBookmarks(JSON.parse(bookmarks));
        }
        setFetchingBookmarks(false);
    }

    const addBookmark = async (post: Post) => {
        const newBookmarks = [...bookmarks, post];
        setBookmarks(newBookmarks);
        await AsyncStorage.setItem('bookmarks', JSON.stringify(newBookmarks));
        toast.show('Post added to bookmarks', {
            type: 'success'
        });
    }

    const removeBookmark = async (postId: number) => {
        const newBookmarks = bookmarks.filter(bookmark => bookmark.id !== postId);
        setBookmarks(newBookmarks);
        await AsyncStorage.setItem('bookmarks', JSON.stringify(newBookmarks));
        toast.show('Post removed from bookmarks', {
            type: 'success'
        });
    }

    useEffect(() => {
        fetchBookmarks();
    }, []);

    return {
        bookmarks,
        fetchingBookmarks,
        fetchBookmarks,
        addBookmark,
        removeBookmark
    }
}