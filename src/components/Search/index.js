import React from 'react'
import { View, Text } from 'react-native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

export default function Search({getRoutes}) {
    return (
        <GooglePlacesAutocomplete 
            placeholder="Digite o destino da sua carga"
            placeholderTextColor="#333"
            onPress={(data, details) => {
                getRoutes(data, details);
            }}
            query={{
                key: 'AIzaSyDyhv_pXanMg_uLlo7nv5W_h8gwh-zXdHg',
                language: 'pt'
            }}
            textInputProps={{
                autoCapitalize: "none",
                autoCorrect: false,
            }}
            fetchDetails
            enablePoweredByContainer={false}
            styles={{
                container: {
                    position: "absolute",
                    top: 40,
                    width: "100%"
                },
                textInputContainer: {
                    flex: 1,
                    backgroundColor: 'transparent',
                    height: 54,
                    marginHorizontal: 20,
                    borderTopWidth: 0,
                    borderBottomWidth: 0
                },
                textInput: {
                    height: 54,
                    margin: 0,
                    borderRadius: 0,
                    paddingTop: 0,
                    paddingBottom: 0,
                    paddingLeft: 20,
                    paddingRight: 20,
                    marginTop: 0,
                    marginLeft: 0,
                    marginRight: 0,
                    elevation: 5,
                    fontSize: 18,
                    borderWidth: 1,
                    borderColor: "#DDD"
                },
                listView: {
                    borderWidth: 1,
                    borderColor: "#DDD",
                    backgroundColor: "#FFF",
                    marginHorizontal: 20,
                    elevation: 5,
                    marginTop: 10,
                },
                description: {
                    fontSize: 16
                },
                row: {
                    padding: 20,
                    height: 58
                },
            }}
        />
    )
}
