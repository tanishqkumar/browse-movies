import React from 'react'
import SearchForm from '../SearchForm'
import { Button, KeyboardAvoidingView, FlatList, TouchableOpacity, StyleSheet, Text, TextInput, View } from 'react-native'
import { NavigationContainer, useNavigation } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

const SearchScreen = () => {
  const navigation = useNavigation()
      return (
        <SearchForm navigation={navigation} />
      )
}

export default SearchScreen
