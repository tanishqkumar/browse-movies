import React from 'react'
import { Button, KeyboardAvoidingView, FlatList, TouchableOpacity, StyleSheet, Text, TextInput, View } from 'react-native'

function firstToUpper(str) {
  if (typeof(str) === 'string') {
    return str.charAt(0).toUpperCase() + str.substring(1)
  }
  else return ''
}

const Row = props => (
    <TouchableOpacity style={styles.row}>
      <Text>
       {/* good to check that Title exists in the future and also can't use regular DOM elements
        be careful with the above because some elements can only have one child and so you'd have to wrap things in a view
        note this all uses flexbox for display */}
        {firstToUpper(props.Title)}
      </Text>
      <Text>
        {firstToUpper(props.Type)} ({firstToUpper(props.Year)})
      </Text>
    </TouchableOpacity>
)


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    padding: 20,
  },
})


export default Row
