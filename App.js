import React from 'react';
import { Button, KeyboardAvoidingView, FlatList, TouchableOpacity, StyleSheet, Text, TextInput, View } from 'react-native';

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

// solution skeleton, step by step expansion

// hit the API with a hardcoded request and display results in a crude list
// make a search bar where a user can input something, handle the state of that bar, and then hit the API by passing that value on onChangeValue in bar
// implement the tabNavigator and settings screen, showing the search when you click on the movies tab
// make two screens: a StackNavigator with the search and detail view (going between them) and tab between the search and settings/authorInfo view


export default class App extends React.Component {
  state = {
    movies: [],
    query: '',
    resultsOrNot: false,
  }

  getData = async () => {
    try {
        if (this.state.query) {
          const response = await fetch(`https://www.omdbapi.com/?apikey=112e34d6&s=${this.state.query}`)
          const json = await response.json()
          if (json.Response === 'False') {
            this.setState({
              movies: [],
              resultsOrNot: false,
            })
          }
          // in the future validate here to ensure you're not relying on API
          // when I fucked up the backticks we got a response without .Search which then led to a .values error
          else {
            const keyValues = json.Search
            const arrOfObjs = Object.values(keyValues)
            this.setState({
              movies: arrOfObjs,
              resultsOrNot: true,
            })
          }
        }
      } catch(err) {
        console.log(err)
      }
  }
//setState is async so the state is not set immediately when you make the call which is why it's a letter behind
// getData as a pure function would be better without getting state involved at all
// getData() returns something after invoking the function, as opposed to without which is just naming the function--arrow vs regular understand
  handleChangeText = query => {
    this.setState({query}, this.getData
  )}

// can't use if() within a render() because it strictly takes expressions => something that returns a values
// conditional rendering is done by 1) calling a functional comp with conditional in it 2) use a ternary (return can't work twice)
// use IFFEs for immediate returns
    render () {
      return (
        <View style={styles.container}>
          <Text>Search</Text>
            <KeyboardAvoidingView behavior="padding" style={styles.container} >
              <TextInput
              style={styles.input}
              value={this.state.query}
              onChangeText={this.handleChangeText}
              placeholder="Movie or series name"
              />
            </KeyboardAvoidingView>

              {this.state.resultsOrNot ?   <FlatList
                  data={this.state.movies}
                  renderItem={({item}) => {
                    return <Row {...item} />
                    }
                  }
                  keyExtractor={item => item.imdbID}
                  />
              :
              <Text style={styles.noResults}>No results</Text>}
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
      marginTop: 20,
      marginHorizontal: 20,
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 3,
    },
    noResults: {
      paddingBottom: '90%',
    }
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

// functional requirements in more detail

// home has a search bar, settings page is the other in the tabView
// as user types, updated state makes new API call to list any movies containing that word
  // containing the release date and media type below it as a subscript
  // as api is designed to with t=state.title on typing changes state
// there is a drop-down list of titles you can click on for more detail
// when you click on one it'll take you to a detailView with the poster, date of release,
  // rating, length, short summary, online scores as bar charts
