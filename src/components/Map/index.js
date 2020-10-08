import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native';
import MapView from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import Search from '../Search';

export default function Map() {

    const [region, setRegion] = useState(null);

    useEffect(() => {
        async function getLocation(){
            Geolocation.getCurrentPosition(
                ({coords: { latitude, longitude }}) => {
                    setRegion({ latitude, longitude, latitudeDelta: 0.0143, longitudeDelta: 0.0134 });
                },
                () => {},
                {
                    // timeout: 3000,
                    enableHighAccuracy: true,
                    maximuAge: 1000,
                }
            )
        }
        getLocation();
        console.log("REGION =>", region);
    }, []);

    return (
        <View style={{flex: 1}}>
            <MapView 
                style={{ flex: 1 }}
                region={region}
                showsUserLocation
                loadingEnabled
            />
            <Search />
        </View>
    )
}
