import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import Map from '../../components/Map';
import { retriveUserData } from '../../utils/storage';


export default function Home({navigation}) {

    useEffect(() => {
        async function getData(){
            const user = await retriveUserData();
            console.log('USERDATA ==>', user);
        }
        getData();
    }, []);

    return (
        <Map />
    );
};
