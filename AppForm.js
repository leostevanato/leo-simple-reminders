import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { saveItem } from './Database';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#D93600',
        alignItems: 'center',
    },
    title: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 50,
    },
    inputContainer: {
        flex: 1,
        marginTop: 30,
        width: '90%',
        padding: 20,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        alignItems: 'stretch',
        backgroundColor: '#fff'
    },
    input: {
        marginTop: 10,
        height: 60,
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingHorizontal: 24,
        fontSize: 16,
        alignItems: 'stretch'
    },
    button: {
        marginTop: 10,
        height: 60,
        backgroundColor: 'blue',
        borderRadius: 10,
        paddingHorizontal: 24,
        fontSize: 16,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 20,
        shadowOpacity: 20,
        shadowColor: '#ccc',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    }
});

export default function AppForm({ route, navigation }) {
    const id = route.params ? route.params.id : undefined;
    const [descricao, setDescricao] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [saveEnabled, setSaveEnabled] = useState('disabled');
    const [disabledStyle, setDisabledStyle] = useState({ opacity: 1 });

    useEffect(() => {
        navigation.addListener('blur', () => {
            clearForm();
        });
    }, [navigation]);

    useEffect(() => {
        if (!route.params) return;
        setDescricao(route.params.descricao);
        setQuantidade(route.params.quantidade.toString());
    }, [route]);

    useEffect(() => {
        handleSaveEnabled();
    }, [descricao, quantidade]);

    useEffect(() => {
        if (saveEnabled === 'disabled') {
            setDisabledStyle({ opacity: 0.6 });
        } else {
            setDisabledStyle({ opacity: 1 });
        }
    }, [saveEnabled]);

    function handleSaveEnabled() {
        if (descricao.trim() === '' || (quantidade === '' || isNaN(quantidade) || quantidade <= 0)) {
            setSaveEnabled('disabled');
        } else {
            setSaveEnabled('');
        }
    }

    function handleDescriptionChange(descricao) {
        setDescricao(descricao);
    }

    function handleQuantityChange(quantidade) {
        setQuantidade(quantidade);
    }

    function clearForm() {
        setDescricao('');
        setQuantidade('');
    }

    async function handleSavePress() {
        const listItem = { descricao, quantidade: parseInt(quantidade) };

        console.log(listItem)


        saveItem(listItem, id)
            .then(response => {
                navigation.navigate("AppList", listItem);
            });
    }

    function handleCancelPress() {
        navigation.navigate("AppList");
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Item para comprar</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    onChangeText={handleDescriptionChange}
                    placeholder="O que está faltando em casa?"
                    clearButtonMode="always"
                    value={descricao} />
                <TextInput
                    style={styles.input}
                    onChangeText={handleQuantityChange}
                    placeholder="Digite a quantidade"
                    keyboardType={'numeric'}
                    clearButtonMode="always"
                    value={quantidade.toString()} />
                <Pressable style={[styles.button, disabledStyle]} onPress={handleSavePress} disabled={saveEnabled}>
                    <Text style={styles.buttonText}>Salvar</Text>
                </Pressable>
                <Pressable style={styles.button} onPress={handleCancelPress}>
                    <Text style={styles.buttonText}>Cancelar</Text>
                </Pressable>
            </View>
            <StatusBar style="light" />
        </View>
    );
}