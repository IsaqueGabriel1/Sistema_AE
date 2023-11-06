import { useState } from 'react';
import { Alert, Image, ScrollView, Text, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker'
import * as ImageManipulator from 'expo-image-manipulator'
import { styles } from './styles';
import { api } from '../../components/services/api';

import { Tip } from '../../components/Tip';
import { Item, ItemProps } from '../../components/Item';
import { Button } from '../../components/Button';
import { Loading } from '../../components/Loading';

export function Home() {
  const [selectedImageUri, setSelectedImageUri] = useState('');
  const [isLoading, setIsLoading] = useState(false)
  const [items, setItems] = useState<ItemProps[]>([])

  async function handleSelectImage() {
    try {
      //solicita permissão para acessasr galeria
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      //se o usuario aceitar, prosegue o fluxo, se não exibe um alerta
      if (status !== ImagePicker.PermissionStatus.GRANTED) {
        return Alert.alert("Aceite a permissão para seguir utilizando o APP")
      }

      setIsLoading(true)

      //recupera a imagem
      const response = await ImagePicker.launchImageLibraryAsync({
        //configurações padrão para a imagem
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 4],
        quality: 1
      });

      //se true, o usuario não selecionou uma imagem
      if (response.canceled) {
        return setIsLoading(false)
      }

      if (!response.canceled) {
        const imgManipuled = await ImageManipulator.manipulateAsync(
          response.assets[0].uri,
          [{ resize: { width: 900 } }],
          {
            compress: 1,
            format: ImageManipulator.SaveFormat.JPEG,
            base64: true
          }
        )
        setSelectedImageUri(imgManipuled.uri)
        foodDetect(imgManipuled.base64)
      }

    } catch (error) {
      console.log(error)
    }
  }

  async function foodDetect(imageBase64: string | undefined) {
    const response = await api.post(`/v2/models/${process.env.EXPO_PUBLIC_API_MODEL_ID}/versions/${process.env.EXPO_PUBLIC_API_MODEL_VERSION_ID}/outputs`, {
      "user_app_id": {
        "user_id": process.env.EXPO_PUBLIC_API_USER_ID,
        "app_id": process.env.EXPO_PUBLIC_API_APP_ID
      },
      "inputs": [
        {
          "data": {
            "image": {
              "base64": imageBase64
            }
          }
        }
      ]
    })
    const foods = response.data.outputs[0].data.concepts.map((concept: any) => {
      return {
        name: concept.name,
        percentage: `${Math.round(concept.value * 100)}%`
      }
    })

    setItems(foods)
    setIsLoading(false)
  }

  return (
    <View style={styles.container}>
      <Button onPress={handleSelectImage} disabled={isLoading} />

      {
        selectedImageUri ?
          <Image
            source={{ uri: selectedImageUri }}
            style={styles.image}
            resizeMode="cover"
          />
          :
          <Text style={styles.description}>
            Selecione a foto do seu prato para analizar.
          </Text>
      }

      <View style={styles.bottom}>
        {
          isLoading ? <Loading/> :
          <>
            <Tip message="Composição do prato" />

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingVertical: 24 }}>

              <View style={styles.items}>
                {
                  items.map((item) => (
                    <Item key={item.name} data={item} />
                  ))
                }
              </View>
            </ScrollView>
          </>
        }
      </View>
    </View>
  );
}