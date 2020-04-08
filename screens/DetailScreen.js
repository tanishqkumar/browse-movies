import React from 'react'
import { Image, Button, StyleSheet, Text, TextInput, View, Dimensions } from 'react-native'

// need to fetch data on different API path and then render it on detailView based on title
// this is a copied fetch to get data like this


export default class DetailScreen extends React.Component {
// we want to render an image and below it a bunch of information about the movie, including a description and ratings
// we grab the information from the props passed into this and display it here, as well as a navigation.navigate.goBack() to the searchScreen

// read about react hooks as a way of making functional components with state--faster and more intuitive
// can't def const, var, let inside a class because syntax
  state = {
    movie: {},
  }
// use json formatters for clarity
// can't use function in classes but const is okay because it's inside a function as opposed to tied to a function

// stylistic thought process:
// uses sketch/xd to get intuition for what UI looks like
// has themes in mind but also experiments a lot and gets better over time, of course
// any website without a landing page like quora, linkedin etc, needs custom layout--things like React were made to be able to
// piece together novel web/mobile apps in a quick manner--not landing pages or standard things like ecommerce
// depends on scale--say, <10K is fine with a template
  getData = async () => {
    const { item } = this.props.route.params
    try {
        if (item.imdbID) {
          const response = await fetch(`https://www.omdbapi.com/?apikey=112e34d6&i=${item.imdbID}`)
          const json = await response.json()
          if (json.Response === 'False') {
            this.setState({
              movie: {},
            })
          }
          else {
            this.setState({
              movie: json,
            })
          }
        }
      } catch(err) {
        // change this to pop an alert with the error if there ever is one as the user can't see the console
        console.log(err)
      }
  }
// need a lifecycle method to fetch data SIMULTANEOUSLY with the listview button being pressed
// check docs and know how to look where for docs intuitively
componentDidMount() {
  this.getData()
}
// you can never control when a component renders--that's the whole point of the declarative paradigm
// do a conditional render like before where you check whether this.state.title even exists
// all sites crop images to fit their layout
// get used to nested views becoming smaller
// default sizes are made smaller from image libararies like s3 since they want to limit bandwith and so .replace is very clever to get better images
// anytime you're inside a JSX element if you're already writing js feel free to use the ternary freely
// note clever use of view as a bar, and use 70% as opposed to a fraction of dimension.getScreen
  render() {
    // make sure each value in this arr is 0-100
    // map percentArr to a bunch of <View> JSX elements where they are paired for title and length
    // const percentArr = this.state.movie.Ratings
    return (
      <View style={styles.container}>
        <Image source={{
          uri:  this.state.movie.Poster ? this.state.movie.Poster.replace('sx300', 'sx500') : undefined
        }} style={styles.image}/>
          <Text>{this.state.movie.Title} {this.state.movie.Type}</Text>
          <Text>{this.state.movie.Plot} {this.state.movie.Awards}</Text>
        { /* <View style={{backgroundColor: '#0f0', width: percentArr[0] + '%', height: 20}}></View> */ }
      </View>
    )
}
  }

// ask about selective bolding
// note the non-fixed screen width in the dimensions.get to allow for many different widths
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      // alignItems: 'flex-start',
    },
    row: {
      padding: 20,
    },
    image: {
      width: Dimensions.get('screen').width,
      height: Dimensions.get('screen').width,
      justifyContent: 'center',
    }
  })
