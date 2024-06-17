import React, { useRef, useState } from 'react'
import { View, Text, Image, TextInput, TouchableOpacity, Pressable, Alert } from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp, heightPercentageToDP} from 'react-native-responsive-screen';
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Loading from '../components/Loading';
import CustomKeyboardView from '../components/CustomKeyboardView';
import { useAuth } from '../context/authContext';




export default function SignUp() {
    const router = useRouter();
    const { register } = useAuth(); 
    const [loading, setLoading] = useState(false);

    const emailRef = useRef("");
    const passwordRef = useRef("");
    const usernameRef = useRef("");
    const profileRef = useRef("");

    const handleRegister = async() =>{
        if(!emailRef.current || !passwordRef.current || !usernameRef.current || !profileRef.current){
            Alert.alert("Cadastro de usuário", "Por favor, preencha todos os campos");
            return;
        }
        setLoading(true);

        let response = await register(emailRef.current.trim(), passwordRef.current, usernameRef.current.trim(), profileRef.current.trim());
        setLoading(false);

        if(!response.success){
            Alert.alert('Cadastro de usuário', response.msg);
        }
    }
    return (
        <CustomKeyboardView>
            <StatusBar style="dark" />
                <View style={{paddingTop: hp(7), paddingHorizontal: wp(5)}} className="flex-1 gap-12">
                    {/*sign in image*/}
                    <View className="items-center">
                        <Image style = {{height: hp(20)}} resizeMode='contain' source = {require('../assets/images/goes16-vernalequinox-flickr50209599563-99acbeb180-b.webp')} />
                    </View>
                
                    <View className="gap-10">
                        <Text style={{fontSize: hp(4)}}  className="font-bold tracking-wider text-center text-neutral-800" >Criar uma conta</Text>
                        {/* inputs */}

                        <View className="gap-4">
                            <View style={{height: hp(7)}} className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-xl">
                                <MaterialCommunityIcons name="account" size={hp(2.7)} color="gray" />
                                <TextInput
                                    onChangeText={value => usernameRef.current = value}
                                    style={{fontSize: hp(2)}}
                                    className="flex-1 font-semibold text-neutral-700"
                                    placeholder="apelido"
                                    placeholderTextColor={'gray'}
                                    />
                            </View>

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

                            <View style={{height: hp(7)}} className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-xl">
                                <MaterialIcons name="image" size={hp(2.7)} color="gray" />
                                <TextInput
                                    onChangeText={value => profileRef.current = value}
                                    style={{fontSize: hp(2)}}
                                    className="flex-1 font-semibold text-neutral-700"
                                    placeholder="URL foto"
                                    placeholderTextColor={'gray'}
                                    />
                            </View>
                            
                            {/*submit button*/}
                            
                            <View>
                                {
                                    loading? (
                                        <View className="flex-row justify-center">
                                            <Loading size={hp(6.5)} />
                                        </View>
                                    ):(
                                        <TouchableOpacity onPress={handleRegister} style={{height: hp(6.5)}}className="bg-indigo-500 rounded-xl justify-center items-center">
                                            <Text style={{fontSize: hp(2.7)}} className="text-white font-bold tracking-wider">
                                                Cadastrar
                                            </Text>
                                        </TouchableOpacity>
                                    )
                                }
                            </View>

                            {/* sign up button */}
                            <View className="flex-row justify-center">
                                <Text style={{fontSize: hp(1.8)}} className="font-semibold text-neutral-500">Já possui uma conta? </Text>
                                <Pressable onPress={()=> router.push('signIn')}>
                                    <Text style={{fontSize: hp(1.8)}} className="font-bold text-teal-500">Entrar</Text>
                                </Pressable>
                            </View>
                        
                        </View>
                    </View>
                </View>
        </CustomKeyboardView>
    )
}