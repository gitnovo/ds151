import { Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { MaterialIcons } from '@expo/vector-icons';
import {widthPercentageToDP as wp, heightPercentageToDP as hp, heightPercentageToDP} from 'react-native-responsive-screen';
import { Image } from 'expo-image';

export default function ChatRoomHeader({user, router}){
    return(
        <View style={{ position: 'absolute', top: 0, width: '100%', zIndex: 1 }}>
            <Stack.Screen
                options={{
                    title:'',
                    headerShadowVisible: false,
                    headerLeft: ()=>(
                        <View className="flex-row items-center gap-4">
                            <TouchableOpacity onPress= {()=> router.back()} >
                                <MaterialIcons name='chevron-left' size={hp(4)} color="#737373" />
                            </TouchableOpacity>
                            <View className="flex-row items-center gap-3">
                                <Image
                                    source={user?.profileUrl}
                                    style={{height: hp(4.5), aspectRatio: 1, borderRadius: 100}}
                                />
                                <Text style={{fontSize: hp(2.5)}} className="text-neutral-700 font-medium">
                                    {user?.username}
                                </Text>
                            </View>
                        </View>
                    ),
                    headerRight: ()=>(
                        <View className="flex-row items-center gap-8">
                            <MaterialIcons name="call" size={hp(2.8)} color={'#737373'} />
                            <MaterialIcons name="videocam" size={hp(2.8)} color={'#737373'} />
                        </View>
                    )
                }}
            />
        </View>
    )
}
