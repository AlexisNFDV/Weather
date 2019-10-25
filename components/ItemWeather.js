import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ImgWeather } from '../pages/HomePage';
import { ActivityIndicator } from 'react-native-paper';
import { Text, View, Button, StyleSheet } from 'react-native';
import { SwipeRow } from 'react-native-swipe-list-view';
import { connect } from 'react-redux'


class ItemWeather extends Component {
    static propTypes = {
        city: PropTypes.string.isRequired,
        onDelete: PropTypes.func.isRequired
    }

    state = {
        weather: null
    }

    componentDidMount(){
        const action = { type: "GET_DATA", value: this.props.city };
        this.props.dispatch(action);
    }

    render() {
        return (
            <SwipeRow leftOpenValue={0} rightOpenValue={-75} key={this.props.city}>
                <View style={styles.standaloneRowBack}>
                    <Text>Left</Text>
                    <Button title="Suppr." onPress={() => this.props.onDelete(this.props.city)} />
                </View>
                <View style={styles.standaloneRowFront}>
                    <View key={this.props.city} style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text>{this.props.city}</Text>
                        {this.state.weather !== null ? (
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <Text>{this.state.weather.main.temp}°C</Text>
                                <ImgWeather icon={this.state.weather.weather[0].icon} />
                            </View>
                        ) : (<ActivityIndicator />)}
                    </View>
                </View >
            </SwipeRow>

        );
    }
}
const styles = StyleSheet.create({
    standaloneRowFront: {
        alignItems: 'center',
        backgroundColor: '#CCC',
        justifyContent: 'center',
        height: 80,
    },
    standaloneRowBack: {
        alignItems: 'center',
        backgroundColor: '#CCC',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
    },
    backTextWhite: {
        color: '#FFF',
    }
});

const mapStateToProps = (state) => {
    return {
        data: state.data
    }
}

export default connect(mapStateToProps)(ItemWeather);
