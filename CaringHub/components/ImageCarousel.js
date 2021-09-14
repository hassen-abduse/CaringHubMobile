
import React, { useRef, useState } from 'react'
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  ImageBackground
} from 'react-native'
import Carousel from 'react-native-anchor-carousel'
import { alignSelf, height, marginTop } from 'styled-system'
import { SimplePaginationDot } from './SimplePaginationDot'

const { width: windowWidth } = Dimensions.get('window')

const data = [
  {
    uri: 'https://i.imgur.com/fRGHItn.jpg',
    title: 'Don\'t miss an opportunity to contribute',
    content: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet'
  },
  {
    uri: 'https://i.imgur.com/IGRuEAa.jpg',
    title: 'Find interesting projects',
    content:
      'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...'
  },
]

const INITIAL_INDEX = 0
export default ImageCarousel = (props) => {
  const carouselRef = useRef(null)
  const [currentIndex, setCurrentIndex] = useState(INITIAL_INDEX)

  function handleCarouselScrollEnd (item, index) {
    setCurrentIndex(index)
  }

  function renderItem ({ item, index }) {
    const { uri, title, content } = item
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={styles.item}
        onPress={() => {
          carouselRef.current.scrollToIndex(index)
        }}
      >
        <ImageBackground   source={{ uri: uri }} style={styles.imageBackground}>
        </ImageBackground>
        <View style={styles.lowerContainer}>
          <Text style={styles.titleText}>{title}</Text>
          <Text style={styles.contentText}>{content}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.container}>
      <Carousel
        style={styles.carousel}
        data={data}
        renderItem={renderItem}
        itemWidth={windowWidth}
        inActiveOpacity={0.3}
        containerWidth={windowWidth}
        onScrollEnd={handleCarouselScrollEnd}
        ref={carouselRef}
      />
      <SimplePaginationDot currentIndex={currentIndex} length={data.length}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { 
    backgroundColor: '#fff', 
    marginBottom: 30,
  },
  carousel: {
    backgroundColor: '#fff',
    aspectRatio: 1.5,
    flexGrow: 0,
    marginBottom: 5,
    alignSelf: 'center'
  },
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderColor: 'white',
    elevation: 0,
    marginBottom:50,
    //alignSelf:'center'
  },
  imageBackground: {
    flex: 2,
    backgroundColor: '#EBEBEB',
    borderColor: 'white',
  },
  rightTextContainer: {
    marginLeft: 'auto',
    marginRight: -2,
    backgroundColor: 'rgba(49, 49, 51,0.5)',
    padding: 3,
    marginTop: 3
  },
  rightText: { color: 'white' },
  lowerContainer: {
    flex: 1,
    //margin: 10,
    marginTop:10
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 20,
    marginHorizontal:10,
    textAlign: 'center'
  },
  contentText: {
    marginHorizontal: 10,
    marginVertical:5,
    fontSize: 15,
    textAlign: 'center'
  }
})
