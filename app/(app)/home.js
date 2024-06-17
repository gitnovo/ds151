import React from 'react'
import { View, Text, Pressable } from 'react-native'
import { useAuth } from '../../context/authContext'

export default function Home() {
    const { logout, user } =  useAuth();
    const handleLogout = async () => {
        await logout(); 
    }
    console.log('dados do usuário: ', user);

    return (
        <View>
            <Text>Home</Text>
            <Pressable onPress={handleLogout}>
                <Text>Sair</Text>
            </Pressable>
        </View>
    )
}