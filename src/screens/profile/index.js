import React, {useEffect, useState} from 'react';
import { View, Text, TextInput, TouchableOpacity, Button, ScrollView, Image, ToastAndroid } from 'react-native';
import styled from 'styled-components/native';
import { retriveUserData, updateUserData } from '../../utils/storage';

const Container = styled(View)`
    display: flex;
    flex: 1;
    background-color: #212121;
    align-items: center;
    padding-bottom: 48px;
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
    align-items: center;
    width:100%;
    height: 64px;
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

    const [user, setUser] = useState({});
    const [form, setForm] = useState({});
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        async function getData(){
            const user = await retriveUserData();
            setForm(user);
            setUser(user);
            setIsLoading(false);
        }
        getData();
    }, []);

    useEffect(() => {
        console.log('FORM =>', form);
    }, [form]);

    const updateProfile = async () => {
        try {
            console.log('to aqui')
            await updateUserData(form).then(() => {
                ToastAndroid.show(
                    "Perfil atualizado com sucesso!",
                    ToastAndroid.SHORT
                ); 
            });
        }
        catch(err){
            console.log(err);
        }
    }

    if(isLoading){
        return(
            <View>
                <Text>Is Loading...</Text>
            </View>
        );
    }
    
    if(form.length){
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
                    <Text style={{color: '#fff', fontSize: 28}}>Editar Perfil</Text>
                </Header>
                    
                    <Form>
                    <StyledInput
                        value={form.name}
                        placeholder="Digite seu nome"
                        onChangeText={Name => setForm({...form, name:Name})}
                    />
                    </Form>
                    <Form>
                    <StyledInput
                        value={form.email}
                        placeholder="Digite seu e-mail"
                        onChangeText={Email => setForm({...form, email:Email})}
                    />
                    </Form>
                    <Form>
                    <StyledInput
                        value={form.password}
                        placeholder="Digite sua senha"
                        secureTextEntry
                        onChangeText={Password => setForm({...form, password:Password})}
                    />
                    </Form>
                    <Form>
                    <StyledInput
                        value={form.confirmPassword}
                        placeholder="Confirme sua senha"
                        secureTextEntry
                        onChangeText={ConfirmPassword => setForm({...form, confirmPassword:ConfirmPassword})}
                    />
                    </Form>
                    <Form>
                    <StyledInput
                        value={form.axleCount.toString()}
                        placeholder="Nº de Eixos"
                        onChangeText={AxleCount => setForm({...form, axleCount: parseFloat(AxleCount)})}   
                    />
                    </Form>
                    <Form>
                    <StyledInput
                        value={form.weightPerAxle.toString()}
                        placeholder="Peso Máximo Suportado por Eixo"
                        onChangeText={WeightPerAxle => setForm({...form, weightPerAxle: parseFloat(WeightPerAxle)})}   
                    />
                    <Text>toneladas</Text>
                    </Form>
                    <Form>
                    <StyledInput
                        value={form.limitedWeight.toString()}
                        placeholder="Peso Máximo Suportado"
                        onChangeText={LimitedWeight => setForm({...form, limitedWeight: parseFloat(LimitedWeight)})}   
                    />
                    <Text>toneladas</Text>
                    </Form>
                    <Form>
                        <StyledInput
                            value={form.height.toString()}
                            placeholder="Altura"
                            onChangeText={Height => setForm({...form, height: parseFloat(Height)})}   
                        />
                        <Text>metros</Text>
                    </Form>
                    <Form>
                    <StyledInput
                        value={form.width.toString()}
                        placeholder="Largura"
                        onChangeText={Width => setForm({...form, width: parseFloat(Width)})}   
                    />
                    <Text>metros</Text>
                    </Form>
                    <Form>
                    <StyledInput
                        value={form.length.toString()}
                        placeholder="Comprimento"
                        onChangeText={Length => setForm({...form, length: parseFloat(Length)})}   
                    />
                    <Text>metros</Text>
                    </Form>
    
                    <RegisterButton onPress={updateProfile}>
                        <Text style={{color: "#FFF", fontSize: 18}}>Salvar</Text>
                    </RegisterButton>
    {/* 
                    {err.length ? <Text style={{color: "#CD3C3C", fontSize: 18}}>{ err} </Text>: null}
                    {isAuth ? navigation.navigate('Home') : null} */}
                    </Container>
                    </ScrollView>
                    </View>
        );
    }
;}
