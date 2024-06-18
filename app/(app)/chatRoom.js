import { Keyboard, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native"
import React, { useEffect, useRef, useState } from "react"
import { useLocalSearchParams, useRouter } from "expo-router"
import { StatusBar } from "expo-status-bar";
import ChatRoomHeader from "../../components/ChatRoomHeader";
import MessageList from "../../components/MessageList";
import {widthPercentageToDP as wp, heightPercentageToDP as hp, heightPercentageToDP} from 'react-native-responsive-screen';
import { MaterialIcons } from '@expo/vector-icons';
import CustomKeyboardView from "../../components/CustomKeyboardView";
import { useAuth } from "../../context/authContext";
import { getRoomId } from "../../utils/common";
import { Timestamp, addDoc, collection, doc, onSnapshot, orderBy, query, setDoc } from "firebase/firestore";
import { db, usersRef } from '../../firebaseConfig';

export default function ChatRoom(){
    
    const item = useLocalSearchParams(); //segundo usuário
    const { user } = useAuth(); //usuário logado
    const router = useRouter();
    const [messages, setMessages] = useState([]);
    const textRef = useRef('');
    const inputRef = useRef(null);
    const scrollViewRef = useRef(null);

    useEffect(()=>{
        createRoomIfNotExists();
        let roomId = getRoomId(user?.userId, item?.userId);
        const docRef = doc(db, "rooms", roomId);
        const messagesRef = collection(docRef, "messages");
        const q = query(messagesRef, orderBy('createdAt', 'asc'));

        let unsub = onSnapshot(q, (snapshot) => {
            let allMessages = snapshot.docs.map(doc=>{
                return doc.data();
            });
            setMessages([...allMessages]);
        });

        const KeyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow', updateScrollView
        )

        return () => {
            unsub();
            KeyboardDidShowListener.remove();
        }  
    },[]);

    useEffect(()=>{
        updateScrollView();
    }, [messages])

    const updateScrollView = ()=> {
        setTimeout(()=>{
            scrollViewRef?.current?.scrollToEnd({animated: true})
        }, 100)
    }

    const createRoomIfNotExists = async ()=>{
        //ID da sala
        let roomId = getRoomId(user?.userId, item?.userId);
        await setDoc(doc(db, "rooms", roomId),{ 
            roomId,
            createdAt: Timestamp.fromDate(new Date())
        });
    }

    const handleSendMessage = async () => {
        let message =textRef.current.trim();
        if(!message) return;
        try{
            let roomId = getRoomId(user?.userId, item?.userId);
            const docRef = doc(db, 'rooms', roomId);
            const messageRef = collection(docRef, "messages");
            textRef.current="";
            if(inputRef) inputRef?.current?.clear();
            const newDoc = await addDoc(messageRef, {
                userId: user?.userId,
                text: message,
                profileUrl: user?.profileUrl, 
                senderName: user?.username,
                createdAt: Timestamp.fromDate(new Date())

            });
        }catch(err){
            Alert.alert('Message', err.message);
        }
    }

    return(
        <CustomKeyboardView inChat={true}>
            <View className="flex-1 bg-white">
                <StatusBar style="dark" />
                <ChatRoomHeader user={item} router={router} />
                <View className="h-3 border-b border-neutral-300" />
                <View className="flex-1 justify-between bg-neutral-100 overflow-visible">
                    <View style={{ flex: 1 }}>
                        <MessageList scrollViewRef={scrollViewRef} messages={messages} currentUser={user} />
                    </View>
                    <View style={{marginBottom: hp(1.7)}} className="pt-2">
                        <View className="flex-row justify-between mx-3 bg-white border p-2 border-neutral-300 rounded-full pl-5">
                            <TextInput
                            ref={inputRef}
                            onChangeText={value => textRef.current = value} 
                            placeholder="Digite uma mensagem..."
                            style={{fontsize: hp(2)}}
                            className="flex-1 mr-2"
                            />
                            <TouchableOpacity onPress={handleSendMessage} className="bg-teal-300 p-2 mr-[1px] rounded-full">
                            <MaterialIcons name="send" size={hp(2.7)} color={'#0D9488'} />
                            </TouchableOpacity>        
                        </View>
                    </View>
                </View>
            </View>
        </CustomKeyboardView>
    )
}
