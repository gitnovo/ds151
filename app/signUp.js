import React, { useRef, useState, useEffect } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, Pressable, Alert, Modal, FlatList, StyleSheet, Button } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Loading from '../components/Loading';
import CustomKeyboardView from '../components/CustomKeyboardView';
import { useAuth } from '../context/authContext';
import axios from 'axios';

export default function SignUp() {
  const router = useRouter();
  const { register } = useAuth(); 
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [images, setImages] = useState([]);

  const emailRef = useRef("");
  const passwordRef = useRef("");
  const usernameRef = useRef("");
  const profileRef = useRef("");

  useEffect(() => {
    const fetchImages = async () => {
      const imageUrls = [
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_cfaf40qU4s8zX30VSyODT2unsubGhWczjHGyyFYhI2PE8xp_FQcdV68&s=10',
        'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/765.png'
      ];
      setImages(imageUrls);
    };
    fetchImages();
  }, []);

  const handleRegister = async() => {
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
  };

  const handleImagePress = (imageUrl) => {
    profileRef.current = imageUrl;
    setModalVisible(false);
  };

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
              <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.button}>
                <Text style={styles.buttonText}>Selecionar</Text>
              </TouchableOpacity>
            </View>

            {/*submit button*/}
            <View>
              {loading ? (
                <View className="flex-row justify-center">
                  <Loading size={hp(6.5)} />
                </View>
              ) : (
                <TouchableOpacity onPress={handleRegister} style={{height: hp(6.5)}} className="bg-indigo-500 rounded-xl justify-center items-center">
                  <Text style={{fontSize: hp(2.7)}} className="text-white font-bold tracking-wider">
                    Cadastrar
                  </Text>
                </TouchableOpacity>
              )}
            </View>

            {/* sign up button */}
            <View className="flex-row justify-center">
              <Text style={{fontSize: hp(1.8)}} className="font-semibold text-neutral-500">Já possui uma conta? </Text>
              <Pressable onPress={() => router.push('signIn')}>
                <Text style={{fontSize: hp(1.8)}} className="font-bold text-teal-500">Entrar</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>

      {/* Modal for selecting image */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Select an Image</Text>
          <FlatList
            data={images}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleImagePress(item)}>
                <Image source={{ uri: item }} style={styles.image} />
              </TouchableOpacity>
            )}
          />
          <Button title="Close" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
    </CustomKeyboardView>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'blue',
    borderRadius: 5,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: 'white',
    fontSize: 14
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center'
  },
  image: {
    width: 100,
    height: 100,
    margin: 10
  }
});

