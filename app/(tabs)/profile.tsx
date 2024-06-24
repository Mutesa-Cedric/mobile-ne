import CustomButton from '@/components/CustomButton';
import React from 'react';
import { Image, SafeAreaView, View } from 'react-native';

export default function Profile() {
    return (
        <SafeAreaView className='bg-white h-full'>
            <View className='px-6'>
                <Image source={require('@/assets/images/profile.png')}
                    style={{ width: 200, height: 200, alignSelf: 'center', marginTop: 20 }}
                />

                <CustomButton
                    handlePress={() => { }}
                    title='Logout'
                    containerStyles='mt-8 border-red-500'
                    variant='outline'
                    titleStyles='text-red-500'
                />
            </View>
        </SafeAreaView>
    )
}