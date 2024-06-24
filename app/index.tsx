import CustomButton from '@/components/CustomButton'
import CustomInput from '@/components/CustomInput'
import { usernameState } from '@/store'
import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import { Image, ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useToast } from 'react-native-toast-notifications'
import { useRecoilState } from 'recoil'

const Onboarding = () => {
    const toast = useToast();
    const router = useRouter();
    const [, setUsername] = useRecoilState(usernameState);
    const [name, setName] = useState<string | null>(null);

    const handleGetStarted = () => {
        if (!name) {
            toast.show("Please choose a username to continue", {
                type: 'danger'
            });
            return;
        }
        setUsername(name);
        router.push('/posts');
    }

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
                        className='w-56 h-56 mt-8'
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
                            onChangeText={(val) => setName(val)}
                            label='Choose Username'
                            placeholder='Enter your username'
                            containerStyles='mb-6'
                        />
                        <CustomButton
                            title='Get Started'
                            handlePress={handleGetStarted}
                        />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Onboarding