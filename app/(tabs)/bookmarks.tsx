import CustomButton from '@/components/CustomButton';
import usePosts from '@/hooks/usePosts';
import { usernameState } from '@/store';
import { useRouter } from 'expo-router';
import { FlatList, Image, Text, View, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRecoilValue } from 'recoil';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import useBookmarks from '@/hooks/useBookmarks';


export default function Bookmarks() {
    const { bookmarks, addBookmark, removeBookmark, fetchingBookmarks } = useBookmarks();

    const router = useRouter();
    return (
        <SafeAreaView
            className='bg-white h-full px-3 pt-3'
        >
            {fetchingBookmarks ? <View className='h-full justify-center items-center'>
                <ActivityIndicator size='large' color='blue' />
            </View> :
                <FlatList
                    data={bookmarks}
                    ListEmptyComponent={() => (
                        <View className='h-full justify-center items-center bg-gray-50 rounded-lg'>
                            <Image
                                source={require('../../assets/images/no-data.png')}
                                style={{ width: 200, height: 200 }}
                                className='rounded-lg'
                            />
                            <Text className='text-lg text-gray-700 pt-3 '>You don't have any bookmarks</Text>
                        </View>
                    )}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View className='p-3  rounded-lg mb-3 border border-gray-200 shadow-sm'>
                            <Text className='text-lg font-semibold'>{item.title}</Text>
                            <Text className='text-base text-gray-500 mb-3'>{item.body}</Text>
                            {!item.isCustom && <View className='flex flex-row items-center justify-between mt-3'>
                                <CustomButton
                                    handlePress={() => router.push(`/post/${item.id}`)}
                                    title='Go to post'
                                    containerStyles=' w-[80%]'
                                    variant='outline'
                                    titleStyles='text-base'
                                />
                                {/* bookmark */}
                                <TouchableOpacity
                                    onPress={() => {
                                        if (bookmarks.find(bookmark => bookmark.id === item.id)) {
                                            removeBookmark(item.id);
                                        } else {
                                            addBookmark(item);
                                        }
                                    }}
                                    className={`ml-3 rounded-md border p-2 border-violet-400 shrink-0
                      ${bookmarks.find(bookmark => bookmark.id === item.id) ? 'bg-violet-400' : 'bg-white'}
                        `}
                                >
                                    <Ionicons
                                        name='bookmark-outline'
                                        size={20}
                                        color={bookmarks.find(bookmark => bookmark.id === item.id) ? 'white' : 'violet'}
                                        className='mt-3'
                                    />
                                </TouchableOpacity>
                            </View>}
                            {
                                item.isCustom && <Text className='font-semibold text-violet-700'>Added By You</Text>
                            }
                        </View>
                    )}
                    ListHeaderComponent={() => (
                        <View className='mb-6'>
                            <Text className='text-xl text-gray-800 font-rubiksemibold'>Bookmarks</Text>
                            <Text className='text-gray-500 text-base'>Here are the posts you have bookmarked</Text>
                        </View>
                    )}
                />
            }
        </SafeAreaView>
    );
}
