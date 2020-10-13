import React, {useState} from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import firebase from 'react-native-firebase';
import errorFirebase from '../../configs/FirebaseError.js';
import styled from 'styled-components/native';
import { storeUserData } from '../../utils/storage';

const Container = styled(View)`
    display: flex;
    flex: 1;
    background-color: #212121;
    align-items: center;
    padding-top: 48px;
`;

const StyledInput = styled(TextInput)`
    height: 58px;
    width: 90%;
    background-color: #FFF;
    margin-bottom: 16px;
`;

const LoginButton = styled(TouchableOpacity)`
    align-items: center;
    justify-content: center;
    width: 180px;
    border-radius: 50px;
    height: 60px;
    background-color: #CD3C3C;
    margin-bottom: 16px;
`;

export default function Login({navigation}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isAuth, setIsAuth] = useState(false);
    const [err, setErr] = useState('');

    const login = async () => {
        try{
            if (email =='' || password == '') {
                setErr('Insira seus dados')
            } else { 
            const user = await firebase.auth().signInWithEmailAndPassword(email, password);
            // storeUserData(user);
            setIsAuth(true);
            }
        } catch (error) {
            let err = error.code;
            if (errorFirebase[err]) {
                setErr(errorFirebase[err]);
            } else {
                setErr(err);
            };
        };
    };

    return (
        <Container>
            <Image source={require('../../assets/rotaD.png')} />
            <StyledInput
                placeholder="Digite seu e-mail"
                value={email}
                onChangeText={Email => setEmail(Email)}
                style={{marginTop: 56}}
            />
            <StyledInput
                placeholder="Digite sua senha"
                value={password}
                secureTextEntry
                onChangeText={Password => setPassword(Password)}
                style={{marginBottom: 36}}
            />
            {err.length ? <Text style={{color: "#CD3C3C", fontSize: 18, maxWidth: 320, textAlign: "center"}}>{ err} </Text>: null}
            <LoginButton onPress={login}>
                <Text style={{color: "#FFF", fontSize: 18}}>Login</Text>
            </LoginButton>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={{color: "#FFF", fontSize: 18}}>Registre-se</Text>
            </TouchableOpacity>

            {isAuth ? navigation.navigate('Home') : null}
        </Container>
    );
};
