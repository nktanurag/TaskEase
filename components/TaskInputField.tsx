import { Button, GestureResponderEvent, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import 'react-native-get-random-values';
import TaskType from './Homepage'

interface TaskInputFieldProps {
  handleAddTask: (task: typeof TaskType) => void;  // Adjust the return type accordingly
}
const TaskInputField: React.FC<TaskInputFieldProps> = ({ handleAddTask }) => {
  const [task, setTask] = useState<typeof TaskType>({
    id: uuidv4(),
    title: '',
    description: '',
    priority: 'low',
    deadline: null,
    image: null,
    isCompleted: false,
    // Add other properties as needed
  });
  const handleTask = () => {
    handleAddTask(task);
    setTask({
      id: uuidv4(),
      title: '',
      description: '',
      priority: 'low',
      deadline: null,
      image: null,
      isCompleted: false
    });
  }
  const handleTitleChange = (text: string) => {
    setTask((prevTask) => ({ ...prevTask, title: text }));
  };

  return (
    <View style={styles.container}>
      <TextInput style={styles.inputField} value={task.title} onChangeText={text => handleTitleChange(text)} placeholder="Type your task here..."></TextInput>
      <TouchableOpacity style={styles.addButton} onPress={handleTask}>
        <Text style={styles.buttonText}>Add</Text>
      </TouchableOpacity>
    </View>
  )
}

export default TaskInputField

const styles = StyleSheet.create({
    container: {
      borderColor: '#fff',
      backgroundColor: '#3E3364',
      borderWidth: 1,
      marginRight: 15,
      borderRadius: 12,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 10,
      position: 'absolute',
      bottom: 50,
      left: 0,
      right: 0,
    },
    inputField: {
        color: '#fff',
        height: 50,
        flex: 0,
    },
    addButton: {
      backgroundColor: '#841584', // Button background color
      paddingVertical: 14,
      paddingHorizontal: 20,
      borderRadius: 12, // Adjust the radius to your preference
    },
    buttonText: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
})