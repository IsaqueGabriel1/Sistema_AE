import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    titulo:{
      fontSize: 50,
      marginBottom: 70,
      color: "#2E9D4C"
    },
    inputArea: {
        flexDirection: 'colum',
        width: '80%',
        borderRadius: 5,
        height: 50,
        alignItems: 'center',   
        margin: 10,
    },
    input: {
        width: '100%',
        height: 50,
        borderColor: "#2E9D4C",
        borderBottomWidth: 1,
        borderRadius: 5,
        color: 'black',
        padding: 8,
        fontSize: 18,
        marginTop: 10
    },
  });

