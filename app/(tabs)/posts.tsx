import CustomButton from '@/components/CustomButton';
import useBookmarks from '@/hooks/useBookmarks';
import usePosts from '@/hooks/usePosts';
import { usernameState } from '@/store';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ActivityIndicator, FlatList, Image, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRecoilValue } from 'recoil';


export default function Posts() {
  const { posts, fetchingPosts } = usePosts();
  const username = useRecoilValue(usernameState);
  const { bookmarks, addBookmark, removeBookmark } = useBookmarks();

  const router = useRouter();
  return (
    <SafeAreaView
      className='bg-white h-full px-3 pt-3'
    >
      {
        fetchingPosts ? <View className='h-full justify-center items-center'>
          <ActivityIndicator size='large' color='blue' />
        </View> :
          <FlatList
            data={posts}
            ListEmptyComponent={() => (
              <View className='h-full justify-center items-center bg-gray-50 rounded-lg'>
                <Image
                  source={require('../../assets/images/no-data.png')}
                  style={{ width: 200, height: 200 }}
                  className='rounded-lg'
                />
                <Text className='text-lg text-gray-700 pt-3 '>There isn't any posts</Text>
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
                <Text className='text-xl text-gray-800 font-rubiksemibold'>Welcome, {username}</Text>
                <Text className='text-gray-500 text-base'>Here are some of the posts we've picked for you</Text>
              </View>
            )}
          />
      }
    </SafeAreaView>
  );
}
