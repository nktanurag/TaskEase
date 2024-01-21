import { FlatList, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'

import Header from './Header'
import Task from './Task'
import TaskInputField from './TaskInputField'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { v4 as uuidv4 } from 'uuid';
import 'react-native-get-random-values';
import PushNotification from 'react-native-push-notification'

interface TaskType {
  id: string;
  title: string;
  description: string;
  priority: string;
  deadline: Date | null;
  image: string | null;
  isCompleted: boolean | false;
  // Add other properties as needed
}

const Homepage = ({ navigation }) => {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [task, setTask] = useState<TaskType>();

  useEffect(() => {
    createChannels();
  }, []); 

  const handleAddTask = (task: TaskType) => {
    // Ensure that the task has a title before adding it
    if (task.title.trim() === '') {
      // alert('Task title cannot be empty!');
      return;
    }
    setTasks((prevTasks) => [...prevTasks, task]);
  };
  const createChannels = () => {
    PushNotification.createChannel(
      {
        channelId: "test-channel",
        channelName: "Test channel"
      }
    )
  }
  const handleEditButton = (taskToEdit: TaskType) => {
    // console.log("taskToEdit",taskToEdit)
    navigation.navigate('PostScreen', { taskToEdit, handleEditTask });
  }
  const handleEditTask = (updatedTask: TaskType) => {
    updateEdit(updatedTask);
  }
  const updateEdit = (updatedTask: TaskType) => {
    const updatedTasks = tasks.map((oldTask) => {
      if (oldTask.id !== updatedTask.id) return oldTask;
      return updatedTask;
    });
    setTasks(updatedTasks);
    console.log(updatedTasks)
    setTask(undefined); 
  }
  const handleDeleteButton = (taskToDelete: TaskType) => {
    // console.log(taskToDelete);
    const newTasks = tasks.filter((task) => task.id !== taskToDelete.id);
    setTasks(newTasks);
  };
  const handleToggleCompletionButton = async (taskToToggle: TaskType) => {
    const updatedTasks = tasks.map((oldTask) => {
      if (oldTask.id !== taskToToggle.id) return oldTask;
      return ({ ...taskToToggle, isCompleted: !taskToToggle?.isCompleted });
    });
    setTasks(updatedTasks);
  }
    useEffect(() => {
      const loadTasks = async () => {
        try {
          // Load tasks from AsyncStorage
          const storedTasks = await AsyncStorage.getItem('tasks');
          if (storedTasks) {
            setTasks(JSON.parse(storedTasks));
          }
        } catch (error) {
          console.error('Error loading tasks:', error);
        }
      };

      loadTasks(); // Load tasks when the component mounts
    }, []); // Empty dependency array ensures this effect runs only once
    useEffect(() => {
      const saveTasks = async () => {
      try {
          // Save tasks to AsyncStorage
          await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
        } catch (error) {
          console.error('Error saving tasks:', error);
        }
      };

      saveTasks(); // Save tasks whenever the tasks state changes
    }, [tasks]); // Dependency ensures this effect runs whenever tasks change

    
  return (
    <KeyboardAvoidingView
      style={styles.container}
      keyboardVerticalOffset={25}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView style={styles.scrollView}>
        <Header />
        <FlatList
          data={tasks}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <Task
              task={item}
              onTaskDelete={handleDeleteButton}
              onTaskEdit={handleEditButton}
              onToggleCompletion={handleToggleCompletionButton}
            />
          )}
        />
      </ScrollView>
      <View style={styles.inputFieldContainer}>
        <TaskInputField handleAddTask={handleAddTask} />
      </View>
    </KeyboardAvoidingView>
  )
}

export default Homepage


const styles = StyleSheet.create({
  contentContainer: {
    padding: 16,
    minHeight: '100%', // Set a minimum height for the container
    justifyContent: 'space-between',
    backgroundColor: 'lightgray',
  },
  container: {
    flex: 1.0,
    backgroundColor: 'lightgray',
    // padding: 16,
  },
  scrollView: {
    flex: 1,
    marginLeft: 12,
    marginRight: 2
  },
  inputFieldContainer: { 
    marginLeft: 12
  },
});

