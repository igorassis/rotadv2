import React, {useState} from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import firebase from 'react-native-firebase';

export default function Login({navigation}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isAuth, setIsAuth] = useState(false);

    const login = async () => {
        try{
            console.log('EMAIL =>', email)
            console.log('password =>', password)
            const user = await firebase.auth().signInWithEmailAndPassword(email, password);
            setIsAuth(true);
            console.log(user);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <View>
            <TextInput
                placeholder="Digite seu e-mail"
                value={email}
                onChangeText={email => setEmail(email)}
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

            {isAuth ? <Text>LOGADO COM SUCESSO</Text> : null}
        </View>
    )
}
