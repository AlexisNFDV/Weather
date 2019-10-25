import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Loading from '../components/Loading';
import { connect } from 'react-redux'


class HomePage extends React.Component {

    state = {
        wea: null
    };

    componentDidMount() {
        const action = { type: "GET_DATA", value: this.props.city };
        this.props.dispatch(action);
    }

    render() {
        return (
            <LinearGradient colors={['#0000ff', '#ffffff']} style={{ flex: 1 }}>
                {this.state.wea != null ? (

                    <View style={{ flex: 1 }}>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Text>{this.state.wea.name}</Text>
                            <Text>Vendredi 11 octobre 2019</Text>
                        </View>
                        <View style={[styles[this.state.wea.weather.main], { flex: 2, justifyContent: 'center', alignItems: 'center' }]}>
                            <ImgWeather icon={this.state.wea.weather[0].icon} />
                            <Text>{this.state.wea.main.temp}°c</Text>
                        </View>
                        <View style={{ flex: 3 }}>
                            <Sunrise time={this.state.wea.sys.sunrise} />
                            <Sunset time={this.state.wea.sys.sunset} />
                        </View>

                    </View>

                ) : (
                        <Loading displayColor='orange'>
                            <Text>connexion au serveur...</Text>
                        </Loading>
                    )}
            </LinearGradient>
        );
    }
}

export const ImgWeather = (props) => {
    return (
        <Image style={{ width: 80, height: 80 }} source={{ uri: `http://openweathermap.org/img/wn/${props.icon}@2x.png` }} />
    );
}

const Sunrise = (props) => {
    const dt = new Date(props.time * 1000);
    return (
        < Text > {`${dt.getHours()}:${dt.getMinutes()}`}</Text>
    );
}

const Sunset = (props) => {
    const dt = new Date(props.time * 1000);
    return (
        < Text > {`${dt.getHours()}:${dt.getMinutes()}`}</Text>
    );
}

const mapStateToProps = (state) => {
    return {
        data: state.data
    }
}

export default connect(mapStateToProps)(HomePage);

const styles = StyleSheet.create({
    Clear: {
        color: 'blue'
    },
    Sunny: {
        color: 'yellow'
    }
});