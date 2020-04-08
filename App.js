import React from 'react'
import { Button, KeyboardAvoidingView, FlatList, TouchableOpacity, StyleSheet, Text, TextInput, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
// import { Ionicons } from '@expo/vector-icons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import SearchScreen from './screens/SearchScreen'
import SettingsScreen from './screens/SettingsScreen'

const SearchStack = createStackNavigator()

function SearchStackScreen() {
  return (
    <SearchStack.Navigator initialRouteName="SearchScreen">
      <SearchStack.Screen name="Movie Search" component={SearchScreen} />
    </SearchStack.Navigator>
  )
}

const Tab = createBottomTabNavigator()

export default class App extends React.Component {
    render () {
      return (
        <NavigationContainer>
          <Tab.Navigator
          screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Search') {
              iconName = 'ios-search'
            } else if (route.name === 'Settings') {
              iconName = 'ios-settings'
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}
          >
            <Tab.Screen name="Search" component={SearchStackScreen} />
            <Tab.Screen name="Settings" component={SettingsScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      )
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  })

// Movie Browser Requirements
// - You may not import libraries other than the below:
//   - `expo`
//   - `react`
//   - `react-native`
//   - `prop-types`
//   - `react-navigation`
//   - Any library for icons
// - There should be at least one `StackNavigator`
// - There should be a search screen that allows users to search for movies
//   - You should show more than 10 results if more than 10 results exist
// - There should be a screen that shows additional information about a selected movie
