import { StatusBar } from 'expo-status-bar';
import { useState, useCallback } from 'react'
import { Text, View, ScrollView, SafeAreaView, TextInput, Pressable, Alert } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Radiobutton from './components/Radiobutton';
import CalculateButton from './components/CalculateButton';

import Styles from './Styles'

export default function App() {


  // Määritellään tilamuuttjat
  const [weight, setWeight] = useState(0);
  const [bottles, setBottles] = useState(0);
  const [hours, setHours] = useState(0);
  const [gender, setGender] = useState('Male');
  const [promilles, setPromilles] = useState(0);

  // Radiobuttonin vaihtoehdot määritellään taulukkona, jonka alkiot ovat olioita, sisältäen avain-arvo parin sukupuolelle
  const genderOptions = [
    {
      label: 'Male',
      value: 'Male'
    },
    {
      label: 'Female',
      value: 'Female'
    }
  ]

  // Dropdownpickerin tarvitsemat tilamuuttujat. Items muuttujalle varmaan löytyisi parempikin tapa asettaa arvot, kuin kovakoodaamaalla.
  const [open, setOpen] = useState(false)
  const [items, setItems] = useState([
    {
      label: '1',
      value: 1
    },
    {
      label: '2',
      value: 2
    },
    {
      label: '3',
      value: 3
    },
    {
      label: '4',
      value: 4
    },
    {
      label: '5',
      value: 5
    },
    {
      label: '6',
      value: 6
    },
    {
      label: '7',
      value: 7
    },
    {
      label: '8',
      value: 8
    },
    {
      label: '9',
      value: 9
    },
    {
      label: '10',
      value: 10
    }
  ])

  // Toisen dropdownpickerin tarvitsemat tilamuuttujat
  const [openSecond, setOpenSecond] = useState(false);
  const [secondItems, setSecondItems] = useState([
    {
      label: '1 hour',
      value: 1
    },
    {
      label: '2 hours',
      value: 2
    },
    {
      label: '3 hours',
      value: 3
    },
    {
      label: '4 hours',
      value: 4
    },
    {
      label: '5 hours',
      value: 5
    },
    {
      label: '6 hours',
      value: 6
    },
    {
      label: '7 hours',
      value: 7
    },
    {
      label: '8 hours',
      value: 8
    },
    {
      label: '9 hours',
      value: 9
    },
    {
      label: '10 hours',
      value: 10
    }

  ])

  // funktio joka suoritetaan, kun Bottles dropdown-valikko avataan. Sulkee toisen Time-valikon.
  const onOpen = useCallback(() => {
    setOpenSecond(false);
  }, []);

  // funktio, joka suoritetaan, kun Time dropdown-valikko avataan. Sulkee Bottles-valikon.
  const onOpenSecond = useCallback(() => {
    setOpen(false);
  }, [])
  
  // funktio, jossa suoritetaan promillemäärän lasku. Käyttää tilamuuttujien arvoja, sekä annettua kaavaa. 
  // Huolehtii myös if-lauseessa siitä, että negatiiviset tulokset esitetään nollana.
  const calculatePromilles = () => {
    if (weight > 0){
      if (bottles === 0){
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
      let grams = (bottles * 0.33) * 8 * 4.5;
      let burning = weight / 10;
      let gramsLeft = grams - burning * hours;
      let result;
      if(gender === 'Male'){
        result = gramsLeft / (weight * 0.7)
      } else {
        result = gramsLeft / (weight * 0.6)
      }
      if(result < 0){
        setPromilles(0)
      } else {
        setPromilles(result);
      }
    }
    else {
      Alert.alert(
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

