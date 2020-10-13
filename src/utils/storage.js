import AsyncStorage from '@react-native-community/async-storage';

export const storeUserData = async (user) => {
    try{
        const jsonUser = JSON.stringify(user)
        await AsyncStorage.setItem('@user', jsonUser);
    }catch(error){
        console.log(error);
    }
};

export const updateUserData = async (user) => {
    try{
        const jsonUser = JSON.stringify(user)
        await AsyncStorage.mergeItem('@user', jsonUser);
    }catch(error){
        console.log(error);
    }
};

export const retriveUserData = async () => {
    const user = await AsyncStorage.getItem('@user')
    console.log('USER ==> ', JSON.parse(user));
    return JSON.parse(user);
};