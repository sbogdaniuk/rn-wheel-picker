import React from 'react'
import { View, StyleSheet, FlatList } from 'react-native'

import { config } from './config'
import { FlatItem } from './FlatItem'


export const WheelPicker = ({ innerRef, ...rest }) => (
  <View style={styles.container}>
    <FlatList
      horizontal
      ref={innerRef}
      style={styles.list}
      keyExtractor={d => d.id}
      renderItem={FlatItem}
      getItemLayout={(data, index) => ({
        length: config.itemWidth,
        offset: config.itemWidth * index,
        index,
      })}
      {...rest}
      // scrollEventThrottle={16}
    />
    <View
      style={styles.arrowWrapper}
      pointerEvents="none"
    >
      <View style={styles.arrowBox}>
        <View style={styles.arrowLine} />
        <View style={styles.arrowTriangle} />
      </View>
    </View>
  </View>
)

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    alignSelf: 'stretch',
    height: 40,
  },
  list: {
    backgroundColor: '#EFEFF4',
    borderTopWidth: 1,
    borderTopColor: 'rgb(199, 198, 203)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgb(199, 198, 203)',
  },
  arrowWrapper: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowBox: {
    backgroundColor: 'red',
  },
  arrowLine: {
    backgroundColor: '#4A4A4A',
    width: 1,
    flex: 1,
    alignSelf: 'center',
  },
  arrowTriangle: {
    borderColor: 'transparent',
    borderBottomColor: '#4A4A4A',
    borderTopWidth: 0,
    borderWidth: 4,
    position: 'absolute',
    bottom: 0,
    left: -4,
  },
})
