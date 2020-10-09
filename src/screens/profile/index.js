import React from 'react'
import { View, Text, Button } from 'react-native'

export default function Profile({navigation}) {
    return (
        <View>
            <Text>PROFILE SCREEN</Text>
            <Button
                title="Go back"
                onPress={() => {
                    // Navigate using the `navigation` prop that you received
                    navigation.navigate('Home');
                }}
                />
        </View>
    )
}
