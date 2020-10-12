import React, {useState} from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import firebase from 'react-native-firebase';
import errorFirebase from '../../configs/FirebaseError.js';
import styled from 'styled-components/native';

const Container = styled(View)`
    display: flex;
    /* flex-direction: ${props => props.flexDirectionContainer || "column"}; */
    flex: 1;
    background-color: #212121;
    align-items: center;
    padding-top: 48px;
`;

const StyledInput = styled(TextInput)`
    height: 58px;
    width: ${props => props.inputWidth || "90%"};
    background-color: #FFF;
    margin-bottom: 16px;
`;

const RegisterButton = styled(TouchableOpacity)`
    align-items: center;
    justify-content: center;
    width: 180px;
    border-radius: 50px;
    height: 60px;
    background-color: #CD3C3C;
    margin-bottom: 16px;
`;

export default function Register({navigation}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isAuth, setIsAuth] = useState(false);
    const [err, setErr] = useState('');
    const [form, setForm] = useState({});

    const register = async () => {
        try{
            const user = await firebase.auth().createUserWithEmailAndPassword(email, password)
                .then(() => {
                    firebase.firestore().collection('Users').doc().set({form})
                setIsAuth(true);
                })
        } catch (error) {
            console.log(form)
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
            <ScrollView> 
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
            />
            <StyledInput
                placeholder="Confirme sua senha"
                value={confirmPassword}
                secureTextEntry
                onChangeText={ConfirmPassword => setConfirmPassword(ConfirmPassword)}
                style={{marginBottom: 36}}
            />
            
                <StyledInput
                    placeholder="Altura"
                    onChangeText={HeightRegister => setForm({...form, height: HeightRegister})}
                    inputWidth="150"
                    keyboardType="numeric"
                />
                <StyledInput
                    placeholder="Largura"
                    onChangeText={WidthRegister => setForm({...form, width: WidthRegister})}
                    inputWidth="150"
                    keyboardType="numeric"
                />
        
                <StyledInput
                    placeholder="Comprimento"
                    onChangeText={LengthRegister => setForm({...form, length: LengthRegister})}
                    inputWidth="150"
                    keyboardType="numeric"
                />
                <StyledInput
                    placeholder="Peso"
                    onChangeText={WeightRegister => setForm({...form, weight: WeightRegister})}
                    inputWidth="150"
                    keyboardType="numeric"
                />
                <StyledInput
                    placeholder="N de Exios"
                    onChangeText={AxisRegister => setForm({...form, axisNumber: AxisRegister})}
                    inputWidth="150"
                    keyboardType="numeric"
                />
                <StyledInput
                    placeholder="Peso por eixo"
                    onChangeText={AxleWeightRegister=> setForm({...form, axleWeight: AxleWeightRegister})}
                    inputWidth="150"
                    keyboardType="numeric"
                />
                
            <RegisterButton onPress={register}>
                <Text style={{color: "#FFF", fontSize: 18}}>Registrar</Text>
            </RegisterButton>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={{color: "#FFF", fontSize: 18}}>Já é registrado? Faça o login. </Text>
            </TouchableOpacity>

            {err.length ? <Text style={{color: "#CD3C3C", fontSize: 18}}>{ err} </Text>: null}
            {isAuth ? navigation.navigate('Home') : null}
            </ScrollView>
        </Container>
    );
};
