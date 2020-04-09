import React from 'react'
import { Button, Platform, KeyboardAvoidingView, FlatList, TouchableOpacity, StyleSheet, Text, TextInput, View } from 'react-native'
import { ListItem } from 'react-native-elements'
import { NavigationContainer, useNavigation } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { SvgUri } from 'react-native-svg'

// this is the form that we pass into the searchScreen which is what we render as one of two screens in the App.js tabNavigator
// svg technically hard and RN is new and so the accessibility isn't there to abstract it away cleanly and easily at scale
// tried local and then remote and then found remote url by going on inspect->network->xhr is like HTTP req shows all the reqs moving back and forth
// then deleting files from internal change to avoid crash

// also a bug when you type in 'win win win'

export default class SearchForm extends React.Component {
  state = {
    movies: [],
    query: '',
    page: 1,
  }

  getData = async () => {
    try {
        if (this.state.query) {
          const response = await fetch(`https://www.omdbapi.com/?apikey=112e34d6&s=${this.state.query}&page=${this.state.page}`)
          const json = await response.json()
          if (json.Response === 'False') {
            this.setState({
              movies: [],
            })
          }
          // in the future validate here to ensure you're not relying on API
          // when I fucked up the backticks we got a response without .Search which then led to a .values error
          else {
            const keyValues = json.Search
            const arrOfObjs = Object.values(keyValues)
            this.setState({
              movies: arrOfObjs,
            })
          }
        }
      } catch(err) {
        // change this to pop an alert with the error if there ever is one as the user can't see the console
        console.log(err)
      }
  }

  getMoreData = async () => {
    try {
        if (this.state.query) {
          const response = await fetch(`https://www.omdbapi.com/?apikey=112e34d6&s=${this.state.query}&page=${this.state.page}`)
          const json = await response.json()
          if (json.Response === 'False') {
            this.setState({
              movies: [],
            })
          }
          // in the future validate here to ensure you're not relying on API
          // when I fucked up the backticks we got a response without .Search which then led to a .values error
          else {
            const keyValues = json.Search
            const arrOfObjs = Object.values(keyValues)
            console.log(arrOfObjs)
            this.setState({
              movies: [...this.state.movies, ...arrOfObjs],
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
    this.setState({
      page: 1,
      query: query,
    }, this.getData
  )}

  firstToUpper = (str) => {
    if (typeof(str) === 'string') {
      return str.charAt(0).toUpperCase() + str.substring(1)
    }
    else return ''
  }

// makes sense to pass in props to a route when you navigate their obviously
// abstract out the renderItem so I can render a ListItem component and customize how each movie looks when displayed
// you could implement getData() here before navigating, but then you run into problems with race conditions
// look up docs and see titelstyle and then add fontweight as if it's a styles.el
renderItem = ({ item }) => (
      <ListItem
      title={this.firstToUpper(item.Title)}
      titleStyle={{fontWeight: "bold"}}
      subtitle={this.firstToUpper(item.Type) + ' (' + item.Year + ')'}
      rightAvatar={{
        source: item.Poster && { uri: item.Poster }, rounded: false, size: "large",
      }}
      bottomDivider
      chevron
      onPress = {() => this.props.navigation.navigate('Movie Details', {
        item: item,
      })}
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
          autoFocus={true}
          />
      </KeyboardAvoidingView>
    </View>
  )
}

moreDataOnScroll = () => {
    this.setState({
      page: this.state.page + 1,
    }, () =>
    this.getMoreData(),
  )
}

// can't use if() within a render() because it strictly takes expressions => something that returns a values
// conditional rendering is done by 1) calling a functional comp with conditional in it 2) use a ternary (return can't work twice)
// use IFFEs for immediate returns
    render () {
      return (
        <KeyboardAvoidingView
      behavior={Platform.Os == "ios" ? "padding" : "height"} style={styles.container}>
        {this.state.query === '' ?
        <View style={{
          alignItems: 'center',
        }}>
          <View style={{
            top: 160,
          }}>
                  <TextInput
                  style={styles.input}
                  value={this.state.query}
                  onChangeText={this.handleChangeText}
                  placeholder="Movie or series name"
                  />
          </View>
                  <SvgUri
                    width='325'
                    height='325'
                    uri="https://42f2671d685f51e10fc6-b9fcecea3e50b3b59bdc28dead054ebc.ssl.cf5.rackcdn.com/illustrations/home_cinema_l7yl.svg"
                    style={{
                      position: 'absolute',
                      bottom: -70,
                    }}
                  />
          </View>
        :
        <FlatList
                ListHeaderComponent={this.renderSearchBar}
                data={this.state.movies}
                renderItem={this.renderItem}
                keyExtractor={item => item.imdbID}
                onEndReached={this.moreDataOnScroll}
                onEndThreshold={0.1}
                />
              }
        </KeyboardAvoidingView>
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
      justifyContent: 'center',
      // top: 100,
    },
    row: {
      padding: 20,
    },
    input: {
      borderWidth: 1,
      borderColor: 'black',
      minWidth: 100,
      paddingHorizontal: 20 * 1.2,
      paddingVertical: 10 * 1.2,
      borderRadius: 25,
    },
  })
