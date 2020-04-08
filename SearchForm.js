import React from 'react'
import { Button, KeyboardAvoidingView, FlatList, TouchableOpacity, StyleSheet, Text, TextInput, View } from 'react-native'
import { ListItem } from 'react-native-elements'
// import Row from './Row'
import * as Svg from 'react-native-svg'

// this is the form that we pass into the searchScreen which is what we render as one of two screens in the App.js tabNavigator

// Svg
// class SvgEl extends React.Component {
//   state = {
//     showing: true,
//   }
//
//   render() {
//     return (
//       <View>
//       <Svg
//           add code here
//           </Svg>
//       </View>
//     )
//   }
// }


export default class SearchForm extends React.Component {
  state = {
    movies: [],
    query: '',
    // resultsOrNot: false,
  }

  getData = async () => {
    try {
        if (this.state.query) {
          const response = await fetch(`https://www.omdbapi.com/?apikey=112e34d6&s=${this.state.query}`)
          const json = await response.json()
          if (json.Response === 'False') {
            this.setState({
              movies: [],
              // resultsOrNot: false,
            })
          }
          // in the future validate here to ensure you're not relying on API
          // when I fucked up the backticks we got a response without .Search which then led to a .values error
          else {
            const keyValues = json.Search
            const arrOfObjs = Object.values(keyValues)
            this.setState({
              movies: arrOfObjs,
              // resultsOrNot: true,
            })
          }
        }
      } catch(err) {
        // change this to pop an alert with the error if there ever is one as the user can't see the console
        console.log(err)
      }
  }
//setState is async so the state is not set immediately when you make the call which is why it's a letter behind
// getData as a pure function would be better without getting state involved at all
// getData() returns something after invoking the function, as opposed to without which is just naming the function--arrow vs regular understand
  handleChangeText = query => {
    this.setState({query}, this.getData
  )}

  firstToUpper = (str) => {
    if (typeof(str) === 'string') {
      return str.charAt(0).toUpperCase() + str.substring(1)
    }
    else return ''
  }

// abstract out the renderItem so I can render a ListItem component and customize how each movie looks when displayed
renderItem = ({ item }) => (
  <ListItem
    title={this.firstToUpper(item.Title)}
    subtitle={this.firstToUpper(item.Type) + ' (' + item.Year + ')'}
    rightAvatar={{
      source: item.Poster && { uri: item.Poster }, rounded: false, size: "large",
    }}
    bottomDivider
    chevron
  />
)

renderSearchBar = () => {
  return (
    <View>
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
          <TextInput
          style={styles.input}
          value={this.state.query}
          onChangeText={this.handleChangeText}
          placeholder="Movie or series name"
          />
      </KeyboardAvoidingView>
    </View>
  )
}

// can't use if() within a render() because it strictly takes expressions => something that returns a values
// conditional rendering is done by 1) calling a functional comp with conditional in it 2) use a ternary (return can't work twice)
// use IFFEs for immediate returns
    render () {
      return (
        <View>
        {this.state.query === '' ?     <View style={styles.container}>
                  <TextInput
                  style={styles.input}
                  value={this.state.query}
                  onChangeText={this.handleChangeText}
                  placeholder="Movie or series name"
                  />
        </View> : <FlatList
                ListHeaderComponent={this.renderSearchBar}
                data={this.state.movies}
                renderItem={this.renderItem}
                keyExtractor={item => item.imdbID}
                />
              }
          </View>
      )
    }
  }

  // when you just have one expression inside {} it automatically assume you want to return it, as opposed to multi-line, where you have to be explicit as a full function declaration
  // thinking in terms of future features imdbID > index as a key in terms of uniqueness
  // key wanted string and docs showed you can destructure to get metadata in object built in
  // renderItem takes in item, index, smt else
  // uses scrollView or the recyclerListView

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
    input: {
      borderWidth: 1,
      borderColor: 'black',
      minWidth: 100,
      marginTop: 10,
      marginBottom: 10,
      marginHorizontal: 10,
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderRadius: 25,
    },
  })
