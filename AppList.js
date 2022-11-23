import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#D93600',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default function AppList() {
    return (
        <View style={styles.container}>
            <Text>List!</Text>
            <StatusBar style="light" />
        </View>
    );
}