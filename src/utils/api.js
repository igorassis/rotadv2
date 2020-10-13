import axios from 'axios';
import { retriveUserData } from './storage';

const APP_ID = 'nQx44ZNmmR1Ti3oIe3cR';
const API_KEY = '4A8pxE3zn5R3zJp9g_ZXziLzTFGEzLNsY8SU3hnNfAc';
const baseUrl = 'https://route.ls.hereapi.com/routing/7.2/calculateroute.json';
let user = {};

async function getData(){
    user = await retriveUserData();
}
getData();

export const getRoutes = async (route) => {
    console.log('USER DATA API =>', user);
    return await axios.get(baseUrl+`?apiKey=${API_KEY}&mode=fastest;truck&waypoint0=geo!${route.from_lat},${route.from_long}&waypoint1=geo!${route.to_lat},${route.to_long}&language=pt-br&routeattributes=sh,legs,bb,gr&alternatives=4&height=${user.height}&width=${user.width}&length=${user.length}&limitedWeight=${user.limitedWeight}&weightPerAxle=${user.weightPerAxle}&axleCount=${user.axleCount}`).then(
        (res) => {
            return res;
        }
    ).catch((err) => {
        console.log("ERROR =>", err);
    });
};

//PARAMETROS PARA PASSAR
//alternatives=3
// shippedHazardousGoods


// axleCount
// height
// width
// length
// weightPerAxle
//limitedWeight
