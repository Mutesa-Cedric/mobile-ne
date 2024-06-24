import CustomButton from '@/components/CustomButton';
import usePosts from '@/hooks/usePosts';
import { useRouter } from 'expo-router';
import { FlatList, Image, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function Posts() {
  const { posts } = usePosts();

  console.log(posts);

  const router = useRouter();
  return (
    <SafeAreaView
      className='bg-white h-full px-3 pt-3'
    >
      <FlatList
        data={posts}
        ListEmptyComponent={() => (
          <View className='h-full justify-center items-center bg-gray-50 rounded-lg'>
            <Image
              source={require('../../assets/images/no-data.png')}
              style={{ width: 200, height: 200 }}
              className='rounded-lg'
            />
            <Text className='text-lg text-gray-700 pt-3 '>You haven't created any products</Text>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View className='p-3  rounded-lg mb-3 border border-gray-200 shadow-sm'>
            <Text className='text-lg font-semibold'>{item.title}</Text>
            <Text className='text-base text-gray-500 mb-3'>{item.body}</Text>
            <CustomButton
              handlePress={() => router.push(`/product/${item.id}`)}
              title='Go to post'
              containerStyles='mt-3'
              variant='outline'
              titleStyles='text-base'
            />
          </View>
        )}
        ListHeaderComponent={() => (
          <View className='mb-6'>
            <Text className='text-xl text-gray-800 font-rubiksemibold'>Welcome to our social media</Text>
            <Text className='text-gray-500 text-base'>Here are some of the posts we've picked for you</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
