import {StyleSheet} from 'react-native'

export default StyleSheet.create({
    radiobuttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      width: '100%',
      marginTop: 10,
    },
    unChecked: {
      height: 32,
      width: 32,
      borderRadius: 50,
      borderWidth: 1,
      borderColor: '#08467c',
      alignItems: 'center',
      justifyContent: 'center',
    },
    checked: {
      width: 24,
      height: 24,
      borderRadius: 50,
      backgroundColor: '#08467c'
    },
    label: {
        marginTop: 5,
        fontSize: 16,
        color: '#08467c',
        fontWeight: 'bold',
    }
  })