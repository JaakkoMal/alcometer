import { View, Text, StyleSheet, Pressable } from 'react-native'
import React, {useState} from 'react'
import Styles from './RadiobuttonStyles'

// Custom radiobutton tehty opettajan ohjeen mukaan.

export default function Radiobutton({options, onPress}) {

  const [choice, setChoice] = useState('Male');

  const handlePress = (madeChoice) => {
    setChoice(madeChoice);
    onPress(madeChoice);
  }

  return (
    <>
    {options.map((item) => (
      <View key={item.value} style={Styles.radiobuttonContainer}>
      <Text style={Styles.label}>{item.label}</Text>  
      <Pressable style={Styles.unChecked} onPress={() => handlePress(item.value)}>
        {choice === item.value && <View style={Styles.checked} />}
      </Pressable>
    </View>
    ))}
    
    </>
  )
}