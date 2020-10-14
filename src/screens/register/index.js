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
    margin: 60px 0;
 `;

const RegisterButton = styled(TouchableOpacity)`
    align-items: center;
    justify-content: center;
    width: 180px;
    border-radius: 50px;
    height: 60px;
    background-color: #CD3C3C;
    margin-top: 16px;
`;

const Label = styled(Text)`
    color: #FFF;
    font-size: 16px;
    align-self: flex-start;
    margin-left: 20px;

`;

export default function Register({navigation}) {
    const [isAuth, setIsAuth] = useState(false);
    const [form, setForm] = useState({});
    const [err, setErr] = useState('');

    const validated = () => {

        if (form.name == undefined) {
            setErr("Por favor, preencha seu nome.");
            return;
        };
        if (form.axleCount == undefined) {
            setErr("Por favor, preencha a quantidade de eixos.");
            return;
        };
        if (form.weightPerAxle == undefined) {
            setErr("Por favor, preencha o peso suportado por cada eixo.");
            return;
        };
        if (form.limitedWeight == undefined) {
            setErr("Por favor, preencha o peso total suportado.");
            return;
        };
        if (form.height == undefined) {
            setErr("Por favor, preencha a altura do caminhão.");
            return;
        };
        if (form.width == undefined) {
            setErr("Por favor, preencha a largura do caminhão.");
            return;
        }; 
        register();
    };

    const register = async () => {
      
        try{
            
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
                <Text style={{color: "#FFF", fontSize: 22, paddingBottom: 30}}>Informações Pessoais</Text>
                <Label>Nome</Label>
                <Form>
                <StyledInput
                    placeholder="Digite seu nome"
                    onChangeText={Name => setForm({...form, name:Name})}
                />
                </Form>
                <Label>E-mail</Label>
                <Form>
                <StyledInput
                    placeholder="Digite seu e-mail"
                    onChangeText={Email => setForm({...form, email:Email})}
                />
                </Form>
                <Label>Senha</Label>
                <Form>
                <StyledInput
                    placeholder="Digite sua senha"
                    secureTextEntry
                    onChangeText={Password => setForm({...form, password:Password})}
                />
                </Form>
                <Label>Confirme Senha</Label>
                <Form>
                <StyledInput
                    placeholder="Confirme sua senha"
                    secureTextEntry
                    onChangeText={ConfirmPassword => setForm({...form, confirmPassword:ConfirmPassword})}
                />
                </Form>
                <Text style={{color: "#FFF", fontSize: 22, paddingTop:30, paddingBottom:30}}>Informações do Caminhão</Text>
                <Label>Nº de Eixos</Label>
                <Form>
                <StyledInput
                    placeholder="Nº de Eixos"
                    onChangeText={AxleCount => setForm({...form, axleCount: parseFloat(AxleCount)})}   
                />
                </Form>
                <Label>Peso Máximo Suportado por Eixo</Label>
                <Form>
                <StyledInput
                    placeholder="Peso Máximo Suportado por Eixo"
                    onChangeText={WeightPerAxle => setForm({...form, weightPerAxle: parseFloat(WeightPerAxle)})}   
                />
                <Text>toneladas</Text>
                </Form>
                <Label>Peso Máximo Suportado</Label>
                <Form>
                <StyledInput
                    placeholder="Peso Máximo Suportado"
                    onChangeText={LimitedWeight => setForm({...form, limitedWeight: parseFloat(LimitedWeight)})}   
                />
                <Text>toneladas</Text>
                </Form>
                <Label>Altura</Label>
                <Form>
                    <StyledInput
                        placeholder="Altura"
                        onChangeText={Height => setForm({...form, height: parseFloat(Height)})}   
                    />
                    <Text>metros</Text>
                </Form>
                <Label>Largura</Label>
                <Form>
                <StyledInput
                    placeholder="Largura"
                    onChangeText={Width => setForm({...form, width: parseFloat(Width)})}   
                />
                <Text>metros</Text>
                </Form>
                <Label>Comprimento</Label>
                <Form>
                <StyledInput
                    placeholder="Comprimento"
                    onChangeText={Length => setForm({...form, length: parseFloat(Length)})}   
                />
                <Text>metros</Text>
                </Form>

                {err.length ? <Text style={{color: "#CD3C3C", fontSize: 18, maxWidth: 320, textAlign: "center"}}>{ err} </Text>: null}
                <RegisterButton onPress={validated}>
                    <Text style={{color: "#FFF", fontSize: 18}}>Registrar</Text>
                </RegisterButton>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={{color: "#FFF", fontSize: 18, padding: 12}}>Já é registrado? Faça o login. </Text>
                </TouchableOpacity>

                {isAuth ? navigation.navigate('Home') : null}
                </Container>
            </ScrollView>
            </View>
        
    );
};
