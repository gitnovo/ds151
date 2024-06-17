import { Image, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp, heightPercentageToDP} from 'react-native-responsive-screen';

export default function ChatItem({item, router, noBorder}){
    return(
        <TouchableOpacity className={`flex-row justify-between mx-4 items-center gap-3 mb-4 pb-2 ${noBorder?'':'border-b border-b-neutral-200'}`}>
            <Image 
                source={require('../assets/images/teste.png')} 
                style={{height: hp(6), width: hp(6)}} 
                className="rounded-full"
            />

            {/* nome e ultma msg*/}
            <View className="flex-1 gap-1">
                <View className="flex-row justify-between">
                    <Text style={{fontSize: hp(1.8)}} className="font-bold text-neutral-800">Lucas</Text>
                    <Text style={{fontSize: hp(1.6)}} className="font-semibold text-neutral-500">Time</Text>
                </View>
                <Text style={{fontSize: hp(1.6)}} className="font-medium text-neutral-500">Ultima mensagem</Text>
            </View>
        </TouchableOpacity>
    )
}