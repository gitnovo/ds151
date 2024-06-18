import React from "react"
import { Text, View, ScrollView } from "react-native"
import MessageItem from "./MessageItem"

export default function MessageList({messages, currentUser, scrollViewRef}){
    return(
        <ScrollView 
            ref={scrollViewRef} 
            showsVerticalScrollIndicator={false} 
            contentContainerStyle={{paddingTop: 60}} // Ajuste o valor conforme necessário
        >
            { 
                messages.map((message, index)=>{
                    return (
                        <MessageItem message={message} key={index} currentUser={currentUser} />
                    )
                })
            }
        </ScrollView>
    )
}
