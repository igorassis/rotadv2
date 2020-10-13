import React, { useEffect, useState, useRef } from 'react'
import { View, Text, TouchableOpacity, Image, ToastAndroid } from 'react-native';
import MapView, { Polyline, Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import styled from 'styled-components/native';
import Search from '../Search';
import { getRoutes } from '../../utils/api';
import { formatDistance, formatTime } from '../../utils/utils';

export default function Map({navigation}) {


    const DrawerButton = styled(TouchableOpacity)`
        align-items: center;
        justify-content: center;
        width: 60px;
        height: 60px;
        border-radius: 50px;
        background-color: #212121;
        margin-bottom: 16px;
    `;

    const NewRoute = styled(TouchableOpacity)`
        align-items: center;
        justify-content: center;
        width: 120px;
        border-radius: 50px;
        height: 40px;
        background-color: #CD3C3C;
    `;

    const SummaryContainer = styled(View)`
        position: absolute;
        flex-direction: row;
        bottom: 0;
        width: 100%;
        height: 160px;
        padding-left: 8px;
        padding-bottom: 8px;
        background-color: #212121;
    `;

    const SummaryColumn = styled(View)`
        display: flex;
        flex-direction: column;
        align-items: ${(props) => props.align ? props.align : 'flex-start'};
        justify-content: space-between;
        flex: 1;
    `;

    const SummaryText = styled(Text)`
        font-size: 16px;
        color: #FFF;
    `;

    const [region, setRegion] = useState(null);
    const [destino, setDestino] = useState(null);
    const [routeCoordinates, setRouteCoordinates] = useState([]);
    const [routeData, setRouteData] = useState(null);
    const [initialRouteData ,setInitialRouteData] = useState(null);
    const [allRoutes, setAllRoutes] = useState([]);
    const [alternativeRoute, setAlternativeRoute] = useState(false);
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

    useEffect(() => {
            mapView.current.fitToCoordinates(routeCoordinates);
    }, [allRoutes]);


    useEffect(() => {
        console.log('ROUTE DATA =>', routeData);
    }, [routeData]);

    const goBack = () => {
        setDestino({});
        setRouteCoordinates([]);
        setAllRoutes([]);
        setAlternativeRoute(false);
        mapView.current.fitToCoordinates(region);
    };

    const alternativeRoutes = () => {
        if(allRoutes.length > 1){
            setAlternativeRoute(true);
        } else {
            ToastAndroid.show(
                "Sem rotas alternativas",
                ToastAndroid.SHORT
              );
        }
    }

    const updateSummary = (route) => {
        setRouteData(route);
    }

    const makeRoute = async (data, details) => {
        let route_coordinates = [];
        setDestino({ latitude: details.geometry.location.lat, longitude: details.geometry.location.lng, data: data});
        const route = {
            from_lat: parseFloat(region.latitude),
            from_long: parseFloat(region.longitude),
            to_lat: parseFloat(details.geometry.location.lat),
            to_long: parseFloat(details.geometry.location.lng),
        };

        await getRoutes(route).then((res) => {
            if (res) {
                setRouteData(res.data.response.route[0]);
                setInitialRouteData(res.data.response.route[0]);
                setAllRoutes(res.data.response.route);
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

    const randomColor = () => {
        let hex = '#'+Math.floor(Math.random()*16777215).toString(16);
        console.log('Random Color', hex);
        return hex;
    }
    randomColor();

    return (
        <View style={{flex: 1}}>
            <MapView 
                style={{ flex: 1 }}
                initialRegion={region}
                showsUserLocation
                loadingEnabled
                ref={mapView}
            >
                {routeCoordinates.length ? (
                    <>
                        <Polyline coordinates={routeCoordinates} tappable onPress={() => updateSummary(initialRouteData)} strokeWidth={7} strokeColor="#CD3C3C" geodesic={true}/>
                        <Marker coordinate={{latitude: region.latitude, longitude: region.longitude}} title="Starting location"/>
                        <Marker coordinate={{latitude: destino.latitude, longitude: destino.longitude}} title="Finishlocation"/>
                        {alternativeRoute && allRoutes.length > 1 ? 
                            allRoutes.slice(1).map(route => {
                                let route_coordinates = [];
                                route.shape.map((m) => {
                                    let latlong = m.split(',');
                                    let latitude = parseFloat(latlong[0]);
                                    let longitude = parseFloat(latlong[1]);
                                    route_coordinates.push({latitude: latitude, longitude: longitude});
                                });
                                let color = randomColor();
                                return <Polyline coordinates={route_coordinates} tappable onPress={() => updateSummary(route)} strokeWidth={7} strokeColor={color} geodesic={true}/>
                            }) : null
                        }
                    </>
                ) : null}
            </MapView>

            <DrawerButton style={{position: 'absolute', top: 8, left: 16}} onPress={() => navigation.openDrawer()}>
                <Image source={require('../../assets/hamburguer.png')} />
            </DrawerButton>

            {!routeCoordinates.length ? <Search getRoutes={makeRoute}/> : null}

            {routeCoordinates.length ? (
                <>
                    <SummaryContainer>
                        <SummaryColumn>
                            <SummaryText>Partida: </SummaryText>
                            <SummaryText>Destino: </SummaryText>
                            <SummaryText>Distancia Total: </SummaryText>
                            <SummaryText>Tempo de Viagem: </SummaryText>
                            <NewRoute onPress={() => goBack()}>
                                <SummaryText>Nova rota</SummaryText>
                            </NewRoute> 
                        </SummaryColumn>
                        <SummaryColumn align='center'>
                            <SummaryText>{routeData.waypoint[0].mappedRoadName}</SummaryText>
                            <SummaryText>{routeData.waypoint[1].mappedRoadName}</SummaryText>
                            <SummaryText>{formatDistance(routeData.summary.distance)} Km</SummaryText>
                            <SummaryText>{formatTime(routeData.summary.travelTime)} Horas</SummaryText>
                            {alternativeRoute ? <View style={{height: 40}} /> : <NewRoute onPress={() => alternativeRoutes()}>
                                <Text style={{color: "#FFF", fontSize: 14}}>Rotas alternativas</Text>
                            </NewRoute>} 
                        </SummaryColumn>
                    </SummaryContainer>
                </>
            ) : null}
        </View>
    )
}
