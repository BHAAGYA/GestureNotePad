import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native'
import React from 'react'
import { AnimatedProps,SkImage } from '@shopify/react-native-skia';


type Props={
    style:StyleProp<ViewStyle>;
    image:AnimatedProps<SkImage | null>
    chidren?: React.ReactNode;
}
const SkratchCard:React.FC<Props> = () => {
  return (
    <View>
      <Text>SkratchCard</Text>
    </View>
  )
}

export default SkratchCard

const styles = StyleSheet.create({})