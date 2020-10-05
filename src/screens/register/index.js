import React, {useState} from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import firebase from 'react-native-firebase';
import errorFirebase from '../../configs/FirebaseError.js';

export default function Register({navigation}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isAuth, setIsAuth] = useState(false);
    const [err, setErr] = useState('');

    const register = async () => {
        try{
            if (password !== confirmPassword) { 
                setErr('As senhas não são iguais!')
            } else {
                const user = await firebase.auth().createUserWithEmailAndPassword(email, password);
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
        <View>
            <TextInput
                placeholder="Digite seu e-mail"
                value={email}
                onChangeText={Email => setEmail(Email)}
            />
            <TextInput
                placeholder="Digite sua senha"
                value={password}
                onChangeText={Password => setPassword(Password)}
            />
            <TextInput
                placeholder="Confirme sua senha"
                value={confirmPassword}
                onChangeText={ConfirmPassword => setConfirmPassword(ConfirmPassword)}
            />
            <TouchableOpacity onPress={register}>
                <Text>CONFIRMAR</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text>FAZER LOGIN</Text>
            </TouchableOpacity>

            {err.length ? <Text>{ err} </Text>: null}
            {isAuth ? navigation.navigate('Home') : null}
        </View>
    );
};
