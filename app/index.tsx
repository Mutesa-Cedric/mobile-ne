import CustomButton from '@/components/CustomButton'
import CustomInput from '@/components/CustomInput'
import { useRouter } from 'expo-router'
import React from 'react'
import { Image, ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Onboarding = () => {
    const router = useRouter();
    return (
        <SafeAreaView
            className='bg-white'
        >
            <ScrollView
                contentContainerStyle={{
                    height: "100%"
                }}
            >
                <View className='h-full items-center justify-center px-6 font-rubik'>
                    <Image
                        source={require("../assets/images/welcome.png")}
                        resizeMode='contain'
                        className='w-[240px] h-[240px]'
                    />
                    <Text className='text-xl font-bold font-rubik'>
                        <Text>Welcome to </Text>
                        <Text className=' text-violet-600'>
                            ConnectSphere
                        </Text>
                    </Text>
                    <Text className='text-gray-500 text-center mt-3'>
                        Stay connected to the world by creating posts, viewing posts, sharing insights through comments, and others
                    </Text>
                    <View className='mt-8 w-full'>
                        <CustomInput
                            label='Choose Username'
                            placeholder='Enter your username'
                            containerStyles='mb-6'
                        />
                        <CustomButton
                            title='Get Started'
                            handlePress={() => router.push('/login')}
                        />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Onboarding