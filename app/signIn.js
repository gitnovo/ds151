import React, { useRef, useState } from 'react'
import { View, Text, Image, TextInput, TouchableOpacity, Pressable, Alert } from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp, heightPercentageToDP} from 'react-native-responsive-screen';
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Loading from '../components/Loading';
import CustomKeyboardView from '../components/CustomKeyboardView';

export default function SignIn() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const emailRef = useRef("");
    const passwordRef = useRef("");

    const handleLogin = async() =>{
        if(!emailRef.current || !passwordRef.current){
            Alert.alert("Entrar", "Por favor, preencha todos os campos");
            return;
        }
        //login process
    }
    return (
        <CustomKeyboardView>

            <StatusBar style="dark" />
            
            <View style={{paddingTop: hp(8), paddingHorizontal: wp(5)}} className="flex-1 gap-12">
                {/*sign in image*/}
                <View className="items-center">
                    <Image style = {{height: hp(25)}} resizeMode='contain' source = {require('../assets/images/JWST_2022-07-27_Jupiter.webp')} />
                </View>
            
                <View className="gap-10">
                    <Text style={{fontSize: hp(4)}}  className="font-bold tracking-wider text-center text-neutral-800">
                        <MaterialCommunityIcons name="firebase" size={hp(4)} color="orange" />
                        firebase-chat
                    </Text>
                    {/* inputs */}

                    <View className="gap-4">
                        <View style={{height: hp(7)}} className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-xl">
                            <MaterialIcons name="alternate-email" size={hp(2.7)} color="gray" />
                            <TextInput
                                onChangeText={value => emailRef.current = value}
                                style={{fontSize: hp(2)}}
                                className="flex-1 font-semibold text-neutral-700"
                                placeholder="e-mail"
                                placeholderTextColor={'gray'}
                                />
                        </View>
                        <View className="gap-3">
                            <View style={{height: hp(7)}} className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-xl">
                                <MaterialCommunityIcons name="form-textbox-password" size={hp(2.7)} color="gray" />
                                <TextInput
                                    onChangeText={value => passwordRef.current = value}
                                    style={{fontSize: hp(2)}}
                                    className="flex-1 font-semibold text-neutral-700"
                                    placeholder="senha"
                                    placeholderTextColor={'gray'}
                                    secureTextEntry
                                    />
                            </View>
                            <Text style={{fontSize: hp(1.8)}} className="font-semibold text-center text-neutral-500">Esqueceu sua senha?</Text>
                        </View>
                        
                        {/*submit button*/}
                        
                        <View>
                            {
                                loading? (
                                    <View className="flex-row justify-center">
                                        <Loading size={hp(6.5)} />
                                    </View>
                                ):(
                                    <TouchableOpacity onPress={handleLogin} style={{height: hp(6.5)}}className="bg-indigo-500 rounded-xl justify-center items-center">
                                        <Text style={{fontSize: hp(2.7)}} className="text-white font-bold tracking-wider">
                                            Entrar
                                        </Text>
                                    </TouchableOpacity>
                                )
                            }
                        </View>

                        {/* sign up button */}
                        <View className="flex-row justify-center">
                            <Text style={{fontSize: hp(1.8)}} className="font-semibold text-neutral-500">Não possui uma conta? </Text>
                            <Pressable onPress={()=> router.push('signUp')}>
                                <Text style={{fontSize: hp(1.8)}} className="font-bold text-indigo-500">Crie uma conta</Text>
                            </Pressable>
                        </View>
                    
                    </View>
                </View>
            </View>
        </CustomKeyboardView>
    )
}