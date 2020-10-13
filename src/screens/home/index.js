import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import Map from '../../components/Map';
import { retriveUserData } from '../../utils/storage';
import styled from 'styled-components/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Profile from '../profile';
import Login from '../login';
import { config } from 'react-native-firebase';

const Drawer = createDrawerNavigator();

export default function Home({navigation}) {

    const DrawerContainer = styled(View)`
        width: 100%;
        height: 100%;
        flex: 1;
        background-color: #212121;
    `;

    const Header = styled(View)`
        width: 100%;
        height: 160px;
        align-items: center;
        justify-content: center;
        background-color: #E85858;
    `;

    const ContainerButton = styled(View)`
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 76%;
    `;


    const [user, setUser] = useState({});

    useEffect(() => {
        async function getData(){
            const user = await retriveUserData();
            console.log('USER DATA =>', user);
            setUser(user);
        }
        getData();
    }, []);

    function CustomDrawerContent(props) {
        const userInfo = user;
        return (
            <DrawerContainer>
                <Header>
                    <Text style={{color: '#FFF', fontSize: 24, fontWeight: 'bold', fontFamily: 'Roboto'}}>Bem-Vindo</Text>
                    {/* mudar para nome */}
                    <Text style={{color: '#FFF', fontSize: 18, }}>{userInfo ? userInfo.name : null}</Text>
                </Header>
                <ContainerButton>
                <Button
                title="Seu perfil"
                color="#41A8E8"
                onPress={() => {
                    // Navigate using the `navigation` prop that you received
                    props.navigation.navigate('Profile');
                }}
                />
                <Button
                title="Logout"
                color="#E85858"
                onPress={() => {
                    // Navigate using the `navigation` prop that you received
                    props.navigation.navigate('login');
                }}
                />
                </ContainerButton>
            </DrawerContainer>
        );
      }

    return (
        <Drawer.Navigator initialRouteName="Home" drawerContent={(props)=> <CustomDrawerContent {...props}/>}>
            <Drawer.Screen name="Home" component={Map} />
            <Drawer.Screen name="Profile" component={Profile} />
            <Drawer.Screen name="login" component={Login} />
            {/* <Drawer.Screen name="Notifications" component={NotificationsScreen} /> */}
        </Drawer.Navigator>
    );
};
