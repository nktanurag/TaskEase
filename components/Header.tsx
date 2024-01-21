import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Header = () => {
  return (
    <View>
      <Text style={styles.taskHeading}>Task to do...</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    taskHeading: {
      marginTop: 15,
        fontSize: 25,
        fontWeight: 'bold',
        paddingBottom: '8%'
    },
})

export default Header