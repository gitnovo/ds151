import { Text, TextInput, TouchableOpacity, View } from "react-native"
import React, { useState } from "react"
import { useLocalSearchParams, useRouter } from "expo-router"
import { StatusBar } from "expo-status-bar";
import ChatRoomHeader from "../../components/ChatRoomHeader";
import MessageList from "../../components/MessageList";
import {widthPercentageToDP as wp, heightPercentageToDP as hp, heightPercentageToDP} from 'react-native-responsive-screen';
import { MaterialIcons } from '@expo/vector-icons';
import CustomKeyboardView from "../../components/CustomKeyboardView";

export default function ChatRoom(){
    
    const item = useLocalSearchParams();
    const router = useRouter();
    const [messages, setMessages] = useState([]);
    return(
        <CustomKeyboardView inChat={true}>
            <View className="flex-1 bg-white">
                <StatusBar style="dark" />
                <ChatRoomHeader user={item} router={router} />
                <View className="h-3 border-b border-neutral-300" />
                <View className="flex-1 justify-between bg-neutral-100 overflow-visible">
                    <View clasName="flex-1">
                        <MessageList messages={messages} />
                    </View>
                    <View style={{marginBottom: hp(1.7)}} className="pt-2">
                        <View className="flex-row justify-between mx-3 bg-white border p-2 border-neutral-300 rounded-full pl-5">
                            <TextInput 
                            placeholder="Digite uma mensagem..."
                            style={{fontsize: hp(2)}}
                            className="flex-1 mr-2"
                            />
                            <TouchableOpacity className="bg-teal-300 p-2 mr-[1px] rounded-full">
                            <MaterialIcons name="send" size={hp(2.7)} color={'#0D9488'} />
                            </TouchableOpacity>        
                        </View>
                    </View>
                </View>
            </View>
        </CustomKeyboardView>
    )
}