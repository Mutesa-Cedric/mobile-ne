import React from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ProductView = () => {

    return (
        <SafeAreaView>
            <ScrollView
                contentContainerStyle={{
                    height: "100%"
                }}
            >
                <View className='flex-1 items-center justify-center'>
                    Post view
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default ProductView