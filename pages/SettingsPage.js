import React from 'react';
import { Text, View, Button, AsyncStorage } from 'react-native';
class SettingsPage extends React.Component {

    onDeleteFavoritesPress() {
        AsyncStorage.removeItem('cities').then(() => alert('Favoris supprimés'));
    }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Button title="Supprimer les favoris" onPress={() => this.onDeleteFavoritesPress()} />
            </View>
        );
    }
}

export default SettingsPage;