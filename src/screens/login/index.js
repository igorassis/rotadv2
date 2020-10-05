import React, {useState} from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import firebase from 'react-native-firebase';
import errorFirebase from '../../configs/FirebaseError.js';

export default function Login({navigation}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isAuth, setIsAuth] = useState(false);
    const [err, setErr] = useState('');

    const login = async () => {
        try{
            const user = await firebase.auth().signInWithEmailAndPassword(email, password);
            setIsAuth(true);
            console.log(user);
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
            <TouchableOpacity onPress={login}>
                <Text>LOGAR</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text>REGISTER</Text>
            </TouchableOpacity>

            {err.length ? <Text>{err} </Text>: null}
            {isAuth ? <Text>LOGADO COM SUCESSO</Text> : null}
        </View>
    );
};
