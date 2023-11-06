import { StyleSheet, Text, TouchableOpacity, View, TextInput, Alert } from 'react-native';
import { Button } from '../../components/ButtonLogin';
import { styles } from '../Login/styles'
import { useState } from 'react';
export default function Login(props) {

    const [hidePass, setHidePass] = useState(true)
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")

    const mensagem = (tit, corpo) => {
        Alert.alert(tit, corpo)
    }


    const logar = () => {
        if (email == "" || senha == "") {
            mensagem("Atenção", "Preencha todos os campos")
        }else{
            mensagem("Atenção", "Usuario ou senha invalidos")
        }
        if (email == "teste@gmail.com" || senha == "1234") {
            mensagem("Aviso", "Usuario logado com sucesso")
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Login</Text>
            <View style={styles.inputArea}>
                <TextInput
                    style={styles.input}
                    placeholder="Email:"
                    value={email}
                    onChangeText={(texto) => setEmail(texto)}
                    placeholderTextColor={color = "black"}
                />
                <TextInput
                    value={senha}
                    onChangeText={(texto) => setSenha(texto)}
                    style={styles.input}
                    placeholder="Senha:"
                    placeholderTextColor={color = "black"}
                    secureTextEntry={hidePass}
                />
            </View>
            <Button onPress={logar} />
        </View>
    );
}

