import React, { useEffect, useState, useRef } from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native';
import MapView, { Polyline, Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import styled from 'styled-components/native';
import Search from '../Search';
import { getRoutes } from '../../utils/api';

export default function Map({navigation}) {

    const [region, setRegion] = useState(null);
    const [destino, setDestino] = useState(null);
    const [routeCoordinates, setRouteCoordinates] = useState([]);
    const [routeData, setRouteData] = useState(null);
    const mapView = useRef(null);

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
    }, []);

    useEffect(() => {
        if(region && destino && mapView.current){
            mapView.current.fitToCoordinates(routeCoordinates);
        }
    }, [routeCoordinates]);

    const DrawerButton = styled(TouchableOpacity)`
        align-items: center;
        justify-content: center;
        width: 60px;
        height: 60px;
        border-radius: 50px;
        background-color: #212121;
        margin-bottom: 16px;
    `;

    const makeRoute = async (data, details) => {
        let route_coordinates = [];
        setDestino({ latitude: details.geometry.location.lat, longitude: details.geometry.location.lng, data: data});
        const route = {
            from_lat: parseFloat(region.latitude),
            from_long: parseFloat(region.longitude),
            to_lat: parseFloat(details.geometry.location.lat),
            to_long: parseFloat(details.geometry.location.lng),
        }
        await getRoutes(route).then((res) => {
            if (res) {
                setRouteData(res.data.response.route[0]);
                res.data.response.route[0].shape.map( (m) => {
                    let latlong = m.split(',');
                    let latitude = parseFloat(latlong[0]);
                    let longitude = parseFloat(latlong[1]);
                    route_coordinates.push({latitude: latitude, longitude: longitude});
                });
                setRouteCoordinates(route_coordinates);
            }
        }).catch(err => {
            console.log(err);
        });
    };

    return (
        <View style={{flex: 1}}>
            <MapView 
                style={{ flex: 1 }}
                region={region}
                showsUserLocation
                loadingEnabled
                ref={mapView}
            >
                {routeCoordinates.length ? (
                    <>
                        <Polyline coordinates={routeCoordinates} strokeWidth={7} strokeColor="#CD3C3C" geodesic={true}/>
                        <Marker coordinate={{latitude: region.latitude, longitude: region.longitude}} title="Starting location"/>
                        <Marker coordinate={{latitude: destino.latitude, longitude: destino.longitude}} title="Finishlocation"/>
                    </>
                ) : null}
            </MapView>
            <DrawerButton style={{position: 'absolute', top: 8, left: 16}} onPress={() => navigation.openDrawer()}>
                <Image source={require('../../assets/hamburguer.png')} />
            </DrawerButton>
            <Search getRoutes={makeRoute}/>
            
        </View>
    )
}
