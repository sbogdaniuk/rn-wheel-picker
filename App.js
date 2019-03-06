import React from 'react'
import { Text, StyleSheet, View } from 'react-native'
import debounce from 'debounce'
import moment from 'moment'

import { WheelPicker } from './components'

const wait = ms => new Promise((resolve) => setTimeout(resolve, ms));

const startDay = moment().subtract(7, 'd').startOf('day')
console.log(111, 'startDay', startDay.format())
const data = new Array(24 * 7 * 3 + 1)
  .fill(0)
  .map((_, i) => i)
  .map(d => {
    const date = startDay.clone().add(d, 'hour')
    return {
      id: String(d),
      label: date.format('HH:mm'),
      date,
    }
  })
const dataWithDummy = [
  { id: 'dummy-start', type: 'dummy' },
  ...data,
  { id: 'dummy-end', type: 'dummy' },
]

export default class App extends React.Component {
  state = {
    active: moment(),
  }

  componentDidMount () {
    const { active } = this.state
    wait(5).then( () => {
      // this.picker.scrollToIndex({ animated: false, index: active.get('h') })
      this.picker.scrollToOffset({
        offset: this.getNowOffset()
      })
    });
  }

  getNowOffset = () => {
    const nowOffset = moment().diff(startDay, 'm')
    // console.log(111, 'nowOffset', nowOffset)
    return nowOffset
  }

  setCurrentAccordingToOffset = (x) => {
    this.setState({
      active: startDay.clone().add(x, 'm')
    })
  }

  onMomentumScrollEnd = (event) => {
    const x = event.nativeEvent.contentOffset.x
    // console.log(222, 'onMomentumScrollEnd', x)
    this.setCurrentAccordingToOffset(x)
  }

  onScrollEndDrag = (event) => {
    const x = event.nativeEvent.contentOffset.x
    // console.log(111, 'onScrollEndDrag', x)
    this.setCurrentAccordingToOffset(x)
  }

  render () {
    const { active } = this.state

    return (
      <View style={styles.container}>
        <WheelPicker
          innerRef={el => this.picker = el}
          data={dataWithDummy}
          onScrollEndDrag={this.onScrollEndDrag}
          onMomentumScrollEnd={this.onMomentumScrollEnd}
          decelerationRate={.1}
        />
        <Text style={styles.text}>{active.format('YYYY-MM-DD HH:mm')}</Text>
      </View>
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
  text: {
    paddingVertical: 10
  }
})
