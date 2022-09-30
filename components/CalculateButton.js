import { View, Text } from 'react-native'
import React from 'react'
import Styles from './CalculateButtonStyles'

export default function CalculateButton(props) {
  return (
    <View style={[Styles.calculateButton, props.pressed && {backgroundColor: '#000000'}]}>
      <Text style={Styles.buttonText}>Calculate</Text>
    </View>
  )
}