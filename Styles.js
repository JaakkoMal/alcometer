import {StyleSheet} from 'react-native'

export default StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fdead8',
      alignItems: 'center',
      justifyContent: 'center',
    },
    scrollView: {
      width: '100%',
      marginTop: 40,
    },
    title: {
      color: '#08467c',
      fontSize: 32,
      fontWeight: 'bold',
      paddingTop: 10,
    },
    form: {
      marginLeft: 15,
      marginRight: 15
    },
    label: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#08467c',
      position: 'relative',
      marginTop: 10,
      marginBottom: 10
    },
    inputField: {
      fontSize: 24,
      borderBottomWidth: 1,
      borderBottomColor: "#76b5c5"
    },
    test: {
      marginTop: 100
    },
    resultContainer: {
      alignItems: 'center',
      marginTop: 64,
      marginBottom: 24,
    },
    resultTextGreen: {
      fontSize: 48,
      shadowOffset: {width: 1, height: 1},
      shadowRadius: 2,
      shadowOpacity: 0.65,
      color: '#00a650',
      zIndex: 8
    },
    resultTextYellow: {
      fontSize: 48,
      color: '#e7fa09',
      shadowOffset: {width: 1, height: 1},
      shadowRadius: 2,
      shadowOpacity: 0.65,
      shadowColor: '#000000'
    },
    resultTextRed: {
      fontSize: 48,
      shadowOffset: {width: 1, height: 1},
      shadowRadius: 2,
      shadowOpacity: 0.65,
      color: '#ed1c24'
    },
    info: {
      fontSize: 8,
      color: '#bcbcbc'
    }
  });

  