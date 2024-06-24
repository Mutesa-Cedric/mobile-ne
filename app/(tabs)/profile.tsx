import CustomButton from '@/components/CustomButton';
import { usernameState } from '@/store';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, SafeAreaView, View, Text } from 'react-native';
import { useRecoilState } from 'recoil';

export default function Profile() {
    const [username, setUsername] = useRecoilState(usernameState);
    const router = useRouter();


    return (
        <SafeAreaView className='bg-white h-full'>
            <View className='px-6'>
                <Image source={require('@/assets/images/profile.png')}
                    style={{ width: 200, height: 200, alignSelf: 'center', marginTop: 20 }}
                />
                <Text className='text-center text-2xl font-semibold text-gray-700'>{username}</Text>
                <CustomButton
                    handlePress={() => {
                        setUsername('');
                        router.push("/");
                    }}
                    title='Logout'
                    containerStyles='mt-8 border-red-500'
                    variant='outline'
                    titleStyles='text-red-500'
                />
            </View>
        </SafeAreaView>
    )
}