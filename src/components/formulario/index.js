import { StyleSheet, View } from 'react-native';
import {Button} from '../Button/index';
import { useState } from 'react';

function Login() {
    const [inputEmail, setInputEmail] = useState("")

    return (
        <View style={styles.inputArea}>
            
            <Button/>
        </View>
    )
}

const styles = StyleSheet.create({
    inputArea: {
        flexDirection: 'colum',
        borderRadius: 5,
        alignItems: 'center'
    },
});

export default Login