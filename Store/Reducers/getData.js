import axios from 'axios';
import { AsyncStorage } from 'react-native';

const initialState = { data: null }

function getData(state = initialState, action) {
    const key = '3d13d25c0c34fa3c3db183ad6b8cdff4';
    const url = `https://api.openweathermap.org/data/2.5/weather?appid=${key}&units=metric`;

    switch (action.type) {
        case 'ADD_FAVORITE':
            AsyncStorage.getItem('cities').then(data => {
                let tab = [];
                if (data !== null) {
                    tab = JSON.parse(data);
                }
                tab.push(action.value);
                AsyncStorage.setItem('cities', JSON.stringify(tab))
                    .then(() => {
                        action.back.goBack();
                    })
                    .catch((err) => {
                        alert(err);
                    });
            });
            break;

        case 'GET_DATA':
            let weather = axios.get(`${url}&q=${action.value}`);

            weather.then((resp) => {
                return {
                    ...state,
                    data: resp.data
                }
            })

        default:
            return state
    }
}

export default getData