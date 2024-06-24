import CustomButton from '@/components/CustomButton';
import axios from '@/lib/axios.config';
import { Post } from '@/types';
import { Ionicons } from '@expo/vector-icons';
import { usePathname, useRouter } from 'expo-router';
import React, { useEffect, useMemo, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useToast } from 'react-native-toast-notifications';

const PostView = () => {
    const router = useRouter();

    const pathname = usePathname();
    const toast = useToast();

    const [post, setPost] = useState<Post | null>(null);
    const [fetchingPost, setFetchingPost] = useState<boolean>(true);
    const postId = useMemo(() => {
        return pathname.split('/')[2];
    }, [pathname]);

    async function getPostData() {
        setFetchingPost(true);
        try {
            const postsRes = await axios.get(`/posts/${postId}`);
            const commentsRes = await axios.get(`/posts/${postId}/comments`);

            setPost({
                ...postsRes.data,
                comments: commentsRes.data
            });

        } catch (error) {
            console.log(error);
            toast.show("An error occurred while fetching post data", {
                type: 'danger'
            });
        } finally {
            setFetchingPost(false);
        }
    }

    useEffect(() => {
        getPostData();
    }, [postId]);

    return (
        <SafeAreaView>
            <ScrollView
                className='bg-white px-3 pb-3'
            >
                <View className='flex-row justify-between p-2' >
                    <TouchableOpacity
                        onPress={() => router.push('/posts')}
                        className='flex-row items-center h-fit'>
                        <Ionicons name='arrow-back' size={24} />
                        <Text>Back to posts</Text>
                    </TouchableOpacity>
                    <CustomButton
                        // isLoading={deletingProduct}
                        handlePress={() => { }}
                        title='Delete Post'
                        variant='outline'
                        titleStyles='text-red-500 text-base'
                        containerStyles='border-red-500 w-32 py-1'
                    />
                </View >
                <View className='p-2 space-y-2'>
                    <View>
                        <Text className='text-lg font-medium font-rubikmedium'>{post?.title}</Text>
                    </View>
                    <View>
                        <Text className='text-sm'>{post?.body}</Text>
                    </View>
                    <FlatList
                        data={post?.comments}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <View className='p-2 mb-4 border border-gray-200 rounded-md'>
                                <Text className='text-lg font-medium'>{item.name}</Text>
                                <Text className='text-base text-gray-700'>{item.body}</Text>
                                <Text className='text-sm text-gray-700 italic font-medium pt-3'>BY: {item.email}</Text>
                            </View>
                        )}
                        ListHeaderComponent={() => (
                            <Text className='text-lg pb-2'>Comments({post?.comments?.length})</Text>
                        )
                        }
                    />
                </View>
            </ScrollView>
        </SafeAreaView >
    )
}

export default PostView