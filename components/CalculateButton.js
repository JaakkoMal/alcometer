import { View, Text } from 'react-native'
import React from 'react'
import Styles from './CalculateButtonStyles'

// Custom nappi, koska vakiona tuleva on niin surkean näköinen. 
// Napissa CSS-tyylittelyllä määritelty ominaisuus, että kun nappia klikkaa
// se välähtää eri värisenä (mustana).

export default function CalculateButton(props) {
  return (
    <View style={[Styles.calculateButton, props.pressed && {backgroundColor: '#000000'}]}>
      <Text style={Styles.buttonText}>Calculate</Text>
    </View>
  )
}