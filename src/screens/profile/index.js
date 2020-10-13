import React, {useState} from 'react';
import { View, Text, TextInput, TouchableOpacity, Button, ScrollView, Image } from 'react-native';
import styled from 'styled-components/native';

const Container = styled(View)`
    display: flex;
    flex: 1;
    background-color: #212121;
    align-items: center;
    padding-top: 48px;
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

const RegisterButton = styled(TouchableOpacity)`
    align-items: center;
    justify-content: center;
    width: 180px;
    border-radius: 50px;
    height: 60px;
    background-color: #CD3C3C;
    margin-top: 16px;
`;

const Header = styled(View)`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    width:100%;
    height: 50px;
    background-color: #41A8E8;
    margin-bottom: 32px;
`;

const ImageButtonBack = styled(Image)`
    width: 30px;
    height: 30px;
    margin: 0 10px;
 `;

 const StyledText = styled(View)`
    display: flex;
    align-items: center;
    justify-content: center;
 `;

// const StyledInput = styled(TextInput)`
//     height: 58px;
//     width: 90%;
//     background-color: #FFF;
//     margin-bottom: 16px;
// `;

// const LoginButton = styled(TouchableOpacity)`
//     align-items: center;
//     justify-content: center;
//     width: 180px;
//     border-radius: 50px;
//     height: 60px;
//     background-color: #CD3C3C;
//     margin-bottom: 16px;
// `;

export default function Profile({navigation}) {
    
    return (
        <View>
            <ScrollView>
        <Container>
            <Header>
                <TouchableOpacity onPress={() => {navigation.navigate('Home')}}>
                <ImageButtonBack source={require('../../assets/back.png')}>
                </ImageButtonBack>
                </TouchableOpacity>
                {/* <Button
                title="Voltar"
                
                /> */}
                <Text style={{color: '#fff', fontSize: 28}}>Você está no seu perfil!</Text>
            </Header>
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
                    onChangeText={AxleCount => setForm({...form, axleCount:AxleCount})}   
                />
                </Form>
                <Form>
                <StyledInput
                    placeholder="Peso Máximo Suportado por Exio"
                    onChangeText={WeightPerAxle => setForm({...form, weightPerAxle:WeightPerAxle})}   
                />
                <Text>toneladas</Text>
                </Form>
                <Form>
                <StyledInput
                    placeholder="Peso Máximo Suportado"
                    onChangeText={LimitedWeight => setForm({...form, limitedWeight:LimitedWeight})}   
                />
                <Text>toneladas</Text>
                </Form>
                <Form>
                    <StyledInput
                        placeholder="Altura"
                        onChangeText={Height => setForm({...form, height:Height})}   
                    />
                    <Text>metros</Text>
                </Form>
                <Form>
                <StyledInput
                    placeholder="Largura"
                    onChangeText={Width => setForm({...form, width:Width})}   
                />
                <Text>metros</Text>
                </Form>
                <Form>
                <StyledInput
                    placeholder="Comprimento"
                    onChangeText={Length => setForm({...form, length:Length})}   
                />
                <Text>metros</Text>
                </Form>

                <RegisterButton>
                    <Text style={{color: "#FFF", fontSize: 18}}>Salvar</Text>
                </RegisterButton>
{/* 
                {err.length ? <Text style={{color: "#CD3C3C", fontSize: 18}}>{ err} </Text>: null}
                {isAuth ? navigation.navigate('Home') : null} */}
                </Container>
                </ScrollView>
                </View>
    );
;}
