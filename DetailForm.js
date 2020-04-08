import React from 'react'
import { Button, StyleSheet, Text, TextInput, View } from 'react-native'

const DetailForm = () => {
// we want to render an image and below it a bunch of information about the movie, including a description and ratings
// we grab the information from the props passed into this and display it here, as well as a navigation.navigate.goBack() to the searchScreen
      return (
        <View style={styles.container}>
          <Text>You are on a detail view that has not yet been tied to a specific movie</Text>
        </View>
      )
  }
  // <View>
  // {item.Title} {item.Type}
  // </View>

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'center',
    },
    row: {
      padding: 20,
    },
  })

export default DetailForm
