import React from 'react'
import { Button, KeyboardAvoidingView, FlatList, TouchableOpacity, StyleSheet, Text, TextInput, View } from 'react-native'
import { Ionicons } from 'react-native-vector-icons/Ionicons'

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    tabBarIcon: ({focused, tintColor}) => (
      <Ionicons name={`ios-options${focused ? '' : '-outline'}`} size={25} color={tintColor} />
    ),
  }

  render() {
    return (
      <View style={styles.container}>
      <Text style={styles.text}>Settings coming soon.</Text>
      <Text style={styles.text}></Text>
        <Text style={styles.text}>Made with love, in Abu Dhabi.</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
  },
  text: {
    textAlign: 'center',
  },
})
