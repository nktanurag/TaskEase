import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons';
import PushNotification from "react-native-push-notification";import CheckBox from '@react-native-community/checkbox';
;
const moment = require('moment');

const Task = (props) => {
  // console.log(props)
  useEffect(() => {
    if(props?.task?.deadline) handleNotification(props.task)
  }, [props?.task]); 
    
  const handleNotification = (item) => {
    if (!item || !item.deadline) {
      return;
    }
    // PushNotification.cancelAllLocalNotifications();
    const deadlineDate = new Date(item.deadline);
    // const largeIconPath = item?.image?.assets[0]?.uri;

    const notification = PushNotification.localNotificationSchedule({
      channelId: "test-channel",
      title: "Reminder | " + item.title,
      message: "You have a reminder for a task which hits it deadline at " + deadlineDate,
      date: new Date(deadlineDate.getTime() + 5 * 1000),
      bigText:  item.description,
      color: "red",
      allowWhileIdle: true,
      // largeIcon: largeIconPath,

      // largeIcon: props.task.image.assets[0].uri,
      // smallIcon: props.task.image.assets[0].uri,
      // vibrate: true,
      // playSound: true,
      // soundName: "default",
      id: item.id
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{props.task.title}</Text>
      <View style={styles.operations}>
        <TouchableOpacity  onPress={() => props.onTaskEdit(props.task)}>
          <Icon name="edit" size={28} color="red" />
        </TouchableOpacity>
        <View style={{ width: 10 }} />
        <TouchableOpacity onPress={() => props.onTaskDelete(props.task)}>
          <Icon name="delete" size={28} color="red" />
        </TouchableOpacity>
        <View style={{ width: 10 }} />
        <CheckBox
          value={props.task.isCompleted}
          onValueChange={() => props.onToggleCompletion(props.task)}
        />
      </View>
    </View>
  )
}
export default Task

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: 'white', 
      padding: 4,
      paddingLeft: 20, 
      paddingRight: 10,
      borderRadius: 5, 
      marginRight: 15,
      alignItems: 'center',
      marginBottom: 15,
    },
    operations: {
      flexDirection: 'row',
    },
    text: {
      fontSize: 16
    },
})
