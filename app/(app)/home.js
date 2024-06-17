import { View, Text, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/authContext'
import { StatusBar } from 'expo-status-bar';
import {widthPercentageToDP as wp, heightPercentageToDP as hp, heightPercentageToDP} from 'react-native-responsive-screen';
import { ActivityIndicator } from 'react-native-web';
import ChatList from '../../components/ChatList';
import Loading from '../../components/Loading';

export default function Home() {
    const { logout, user } =  useAuth();
    const [ users, setUsers ] = useState([1,2,3]);
    useEffect(()=>{
        if(user?.uid)
            getUsers();
    },[])
    const getUsers = async ()=>{
        //fetch from firebase
    }
    
    console.log('dados do usuário: ', user);

    return (
        <View className='flex-1 bg-white'>
            <StatusBar style="light" />
            {
                users.length>0? (
                    <ChatList users={users}/>
                ):(
                    <View className="flex items-center" style={{top: hp(30)}}>
                        <Loading size={hp(10)} />
                    </View>
                )
            }
        </View>
    )
}