import React from 'react'
import { Text, View, StyleSheet, Dimensions } from 'react-native'

import { config } from './config'

const getStyle = index => {
  const i = index % 3 + 1
  return styles[`box${i}`]
}

export const FlatItem = ({ item, index }) => {
  if (item.type === 'dummy') {
    return <View style={styles.dummy} />
  }

  return (
    <View style={[styles.container, getStyle(index)]}>
      <Text>{item.label}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  dummy: {
    width: (Dimensions.get('window').width - config.itemWidth) / 2 ,
  },
  container: {
    width: config.itemWidth,
    fontSize: 14,
    lineHeight: 19,
    letterSpacing: -.15,
    paddingTop: 15,
    textAlign: 'center',
    flex: 1,
    alignItems: 'center'
  },
  box1: {
    backgroundColor: 'rgba(0, 0, 0, 0)'
  },
  box2: {
    backgroundColor: 'rgba(0, 0, 0, .05)'
  },
  box3: {
    backgroundColor: 'rgba(0, 0, 0, .1)'
  },
})
