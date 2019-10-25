import React from 'react';
import { Text, View, Button, TextInput, AsyncStorage } from 'react-native';
import { connect } from 'react-redux'

class AddFavoritesPage extends React.Component {

    static navigationOptions = {
        title: 'Ajouter une ville'
    };

    state = {
        cityName: ''
    };

    changeText(value) {
        this.setState({ cityName: value });
    }

    _addFavorite() {
        const action = { type: "ADD_FAVORITE", value: this.state.cityName, back: this.props.navigation };
        this.props.dispatch(action);
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <TextInput onChangeText={(text) => this.changeText(text)} />
                <Button title="Ajouter" onPress={() => this._addFavorite()} />
            </View>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch: (action) => { dispatch(action) }
    }
}

export default connect(mapDispatchToProps)(AddFavoritesPage);