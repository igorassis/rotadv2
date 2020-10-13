import React, {useState} from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import firebase from 'react-native-firebase';
import errorFirebase from '../../configs/FirebaseError.js';
import styled from 'styled-components/native';
import { storeUserData, getData } from '../../utils/storage';

const Container = styled(View)`
    display: flex;
    flex-direction: column;
    /* width:100%; */
    flex: 1;
    justify-content: center;
    background-color: #212121;
    align-items: center;
    /* padding-top: 48px; */
`;

const Form = styled(View)`
    display: flex;
    flex-direction: row;
    width:90%;
    height: 60px;
    background-color: white;
    margin: 10px 0;
    justify-content: flex-start;
    align-items: center;
`;

const StyledInput = styled(TextInput)`
    height: 58px;
    width: 80%;
    background-color: #FFF;
    /* margin-top: 16px; */
`;

const ImageLogo = styled(Image)`
    margin: 70px 0;
 `

const RegisterButton = styled(TouchableOpacity)`
    align-items: center;
    justify-content: center;
    width: 180px;
    border-radius: 50px;
    height: 60px;
    background-color: #CD3C3C;
    margin-top: 16px;
`;

export default function Register({navigation}) {
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    // const [confirmPassword, setConfirmPassword] = useState('');
    const [isAuth, setIsAuth] = useState(false);
    const [form, setForm] = useState({});
    const [err, setErr] = useState('');

    const register = async () => {
        try{
            console.log(form)
            const password = form.password;
            const confirmPassword = form.confirmPassword;
            const email = form.email;
            if (password !== confirmPassword) { 
                setErr('As senhas não são iguais!');
            } else {
                const user = await firebase.auth().createUserWithEmailAndPassword(email, password);
                await storeUserData(form);
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
            <ScrollView>
            <Container>
                <ImageLogo source={require('../../assets/rotaD.png')} />
                <Form>
                <StyledInput
                    placeholder="Digite seu nome"
                    onChangeText={Name => setForm({...form, name:Name})}
                />
                </Form>
                <Form>
                <StyledInput
                    placeholder="Digite seu e-mail"
                    onChangeText={Email => setForm({...form, email:Email})}
                />
                </Form>
                <Form>
                <StyledInput
                    placeholder="Digite sua senha"
                    secureTextEntry
                    onChangeText={Password => setForm({...form, password:Password})}
                />
                </Form>
                <Form>
                <StyledInput
                    placeholder="Confirme sua senha"
                    secureTextEntry
                    onChangeText={ConfirmPassword => setForm({...form, confirmPassword:ConfirmPassword})}
                />
                </Form>
                <Form>
                <StyledInput
                    placeholder="Nº de Eixos"
                    onChangeText={AxleCount => setForm({...form, axleCount: parseFloat(AxleCount)})}   
                />
                </Form>
                <Form>
                <StyledInput
                    placeholder="Peso Máximo Suportado por Exio"
                    onChangeText={WeightPerAxle => setForm({...form, weightPerAxle: parseFloat(WeightPerAxle)})}   
                />
                <Text>toneladas</Text>
                </Form>
                <Form>
                <StyledInput
                    placeholder="Peso Máximo Suportado"
                    onChangeText={LimitedWeight => setForm({...form, limitedWeight: parseFloat(LimitedWeight)})}   
                />
                <Text>toneladas</Text>
                </Form>
                <Form>
                    <StyledInput
                        placeholder="Altura"
                        onChangeText={Height => setForm({...form, height: parseFloat(Height)})}   
                    />
                    <Text>metros</Text>
                </Form>
                <Form>
                <StyledInput
                    placeholder="Largura"
                    onChangeText={Width => setForm({...form, width: parseFloat(Width)})}   
                />
                <Text>metros</Text>
                </Form>
                <Form>
                <StyledInput
                    placeholder="Comprimento"
                    onChangeText={Length => setForm({...form, length: parseFloat(Length)})}   
                />
                <Text>metros</Text>
                </Form>

                <RegisterButton onPress={register}>
                    <Text style={{color: "#FFF", fontSize: 18}}>Registrar</Text>
                </RegisterButton>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={{color: "#FFF", fontSize: 18, padding: 12}}>Já é registrado? Faça o login. </Text>
                </TouchableOpacity>

                {err.length ? <Text style={{color: "#CD3C3C", fontSize: 18}}>{ err} </Text>: null}
                {isAuth ? navigation.navigate('Home') : null}
                </Container>
            </ScrollView>
            </View>
        
    );
};
