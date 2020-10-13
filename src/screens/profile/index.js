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
    justify-content: space-between;
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


const Label = styled(Text)`
color: #FFF;
font-size: 16;
align-self: flex-start;
margin-left: 20;

`;


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
                    <Text style={{color: '#fff', fontSize: 28, marginRight: 130}}>Editar Perfil</Text>
                </Header>
                <Text style={{color: "#FFF", fontSize: 22, paddingBottom: 30}}>Informações Pessoais</Text>
                    <Label>Nome</Label>
                    <Form>
                    <StyledInput
                        value={form.name}
                        placeholder="Digite seu nome"
                        onChangeText={Name => setForm({...form, name:Name})}
                    />
                    </Form>
                    <Label>E-mail</Label>
                    <Form>
                    <StyledInput
                        value={form.email}
                        placeholder="Digite seu e-mail"
                        onChangeText={Email => setForm({...form, email:Email})}
                    />
                    </Form>
                    <Label>Senha</Label>
                    <Form>
                    <StyledInput
                        value={form.password}
                        placeholder="Digite sua senha"
                        secureTextEntry
                        onChangeText={Password => setForm({...form, password:Password})}
                    />
                    </Form>
                    <Label>Confirme Senha</Label>
                    <Form>
                    <StyledInput
                        value={form.confirmPassword}
                        placeholder="Confirme sua senha"
                        secureTextEntry
                        onChangeText={ConfirmPassword => setForm({...form, confirmPassword:ConfirmPassword})}
                    />
                    </Form>
                    <Text style={{color: "#FFF", fontSize: 22, paddingTop:30, paddingBottom:30}}>Informações do Caminhão</Text>
                    <Label>Nº de Eixos</Label>
                    <Form>
                    <StyledInput
                        value={form.axleCount.toString()}
                        placeholder="Nº de Eixos"
                        onChangeText={AxleCount => setForm({...form, axleCount: parseFloat(AxleCount)})}   
                    />
                    </Form>
                    <Label>Peso Máximo Suportado por Eixo</Label>
                    <Form>
                    <StyledInput
                        value={form.weightPerAxle.toString()}
                        placeholder="Peso Máximo Suportado por Eixo"
                        onChangeText={WeightPerAxle => setForm({...form, weightPerAxle: parseFloat(WeightPerAxle)})}   
                    />
                    <Text>toneladas</Text>
                    </Form>
                    <Label>Peso Máximo Suportado</Label>
                    <Form>
                    <StyledInput
                        value={form.limitedWeight.toString()}
                        placeholder="Peso Máximo Suportado"
                        onChangeText={LimitedWeight => setForm({...form, limitedWeight: parseFloat(LimitedWeight)})}   
                    />
                    <Text>toneladas</Text>
                    </Form>
                    <Label>Altura</Label>
                    <Form>
                        <StyledInput
                            value={form.height.toString()}
                            placeholder="Altura"
                            onChangeText={Height => setForm({...form, height: parseFloat(Height)})}   
                        />
                        <Text>metros</Text>
                    </Form>
                    <Label>Largura</Label>
                    <Form>
                    <StyledInput
                        value={form.width.toString()}
                        placeholder="Largura"
                        onChangeText={Width => setForm({...form, width: parseFloat(Width)})}   
                    />
                    <Text>metros</Text>
                    </Form>
                    <Label>Comprimento</Label>
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

                    </Container>
                    </ScrollView>
                    </View>
        );
    }
;}
