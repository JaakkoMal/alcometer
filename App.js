import { StatusBar } from 'expo-status-bar';
import { useState, useCallback } from 'react'
import { Text, View, ScrollView, SafeAreaView, TextInput, Pressable, Alert } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Radiobutton from './components/Radiobutton';
import CalculateButton from './components/CalculateButton';
import Styles from './Styles'

export default function App() {

  const [weight, setWeight] = useState(0);                // Määritellään tilamuuttjat
  const [bottles, setBottles] = useState(0);
  const [hours, setHours] = useState(0);
  const [gender, setGender] = useState('Male');
  const [promilles, setPromilles] = useState(0);

  const genderOptions = [                                 // Radiobutton-komponentin vaihtoehdot määritetään olioina taulukkoon.
    {
      label: 'Male',
      value: 'Male'
    },
    {
      label: 'Female',
      value: 'Female'
    }
  ]

  
  const [open, setOpen] = useState(false)                 // Bottles dropdownpickerin tilamuuttujat
  const [items, setItems] = useState(
    Array(10).fill('').map((_,i) => ({label: (i+1).toString(), value: i+1}))
  )

  const [openSecond, setOpenSecond] = useState(false);    // Time dropdownpickerin tilamuuttujat
  const [secondItems, setSecondItems] = useState(
    Array(10).fill('').map((_,i) => ({label: `${i+1} hours`, value: i+1}))
    )

  const onOpen = useCallback(() => {                      //Funktio, joka avaa Bottles-valikon ja samalla sulkee Time-valikon
    setOpenSecond(false);
  }, []);

  const onOpenSecond = useCallback(() => {                // Funktio, joka avaa Time-valikon ja sulkee Bottles-valikon
    setOpen(false);
  }, [])
  
  const calculatePromilles = () => {                      // Funktio, jossa lasketaan promillemäärä
    if (weight > 0){                                      // Alussa tarkistetaan, onko Bottles tai Time arvoja valittu
      if (bottles === 0){                                 // ja annetaan näytölle alert, jos ei.
        Alert.alert(
          "Bottles missing!",
          "Select amount of bottles drank."
        )
        return
      } else if (hours === 0){
        Alert.alert(
          "Time missing!",
          "Select time since first bottle."
        )
        return
      }
      let grams = (bottles * 0.33) * 8 * 4.5;               // Määritellään laskukaavassa tarvittavien muuttujien arvot
      let burning = weight / 10;                            // annetun kaavan mukaan.    
      let gramsLeft = grams - burning * hours;
      let result;
      if(gender === 'Male'){                                // If-lauseissa lasketaan promillemäärä käyttäjän syöttämän
        result = gramsLeft / (weight * 0.7)                 // sukupuolen mukaan.
      } else {
        result = gramsLeft / (weight * 0.6)
      }
      if(result < 0){                                       // Asetetaan promilles-tilamuuttujan arvoksi 0, jos tulos negatiivinen.
        setPromilles(0)
      } else {
        setPromilles(result);                               // Asetetaan promilles-tilamuuttujaan laskusta saatu arvo.
      }
    }
    else {                                                  // Tämä else suoritetaan, jos käyttäjä ei ole syöttänyt painoa
      Alert.alert(                                          // Eli annetaan ruudulle alert.
        "Weight missing",
        "Type in your weight and calculate again."
      )
      return
    } 
    
    
  }

  DropDownPicker.setListMode("SCROLLVIEW")

  return (
    <SafeAreaView style={Styles.container}>
      <Text style={Styles.title}>Alcometer</Text>
      <Text style={Styles.info}>By Jaakko Malmi</Text>
      <ScrollView style={Styles.scrollView}>
        <View style={Styles.form}>
          <Text style={Styles.label}>Weight</Text>
          <TextInput style={Styles.inputField} placeholder="Enter your weight in kilograms" keyboardType='number-pad' onChangeText={text => setWeight(text)}>{(weight > 0) ? weight : null}</TextInput>
          <Text style={Styles.label}>Bottles</Text>
          <View style={{zIndex: 10}}>
            <DropDownPicker
              open={open}
              onOpen={onOpen}
              value={bottles}
              items={items}
              setOpen={setOpen}
              setValue={setBottles}
              setItems={setItems}
              placeholder="Bottles drank"
              />
          </View>
          <Text style={Styles.label}>Time</Text>
          <View style={{zIndex: 9}}>
            <DropDownPicker 
              open={openSecond}
              onOpen={onOpenSecond}
              value={hours}
              items={secondItems}
              setOpen={setOpenSecond}
              setValue={setHours}
              setItems={setSecondItems}
              placeholder="Hours since first bottle"
            />
          </View>
          <Text style={Styles.label}>Gender</Text>
          <Radiobutton options={genderOptions} onPress={(value) => {setGender(value)}}/>  
        </View>
        <View style={Styles.resultContainer}>
          {promilles > 0.5 ? <Text style={Styles.resultTextRed}>{promilles.toFixed(2)}</Text>
          :
          <Text style={(promilles >= 0.22) ? Styles.resultTextYellow : Styles.resultTextGreen}>{promilles.toFixed(2)}</Text>
          }
          <Pressable onPress={calculatePromilles}>
            {(state) => <CalculateButton pressed={state.pressed} />}
          </Pressable>
        </View>
      </ScrollView>
      <StatusBar style="auto"/>
    </SafeAreaView>
  );
}

