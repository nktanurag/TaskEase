import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Picker } from '@react-native-picker/picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import TaskType from './Homepage'

const PostScreen = (props) => {
  const taskToEdit = props.route.params.taskToEdit

  const [task, setTask] = useState<typeof TaskType>({
    id: taskToEdit.id,
    title: taskToEdit.title,
    description: taskToEdit.description,
    priority: taskToEdit.priority,
    deadline: taskToEdit.deadline,
    image: taskToEdit.image,
    isCompleted: taskToEdit.isCompleted,
    // Add other properties as needed
  });
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
 
  const openDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleDateConfirm = (date) => {
    handleDeadlineChange(moment(date).format('YYYY-MM-DD HH:mm:ss'));
    hideDatePicker();
  };
  const handleTitleChange = (text: string) => {
    setTask((prevTask: any) => ({ ...prevTask, title: text }));
  };
  const handleDescriptionChange = (text: string) => {
    setTask((prevTask: any) => ({ ...prevTask, description: text }));
  };
  const handlePriorityChange = (text: string) => {
    setTask((prevTask: any) => ({ ...prevTask, priority: text }));
  };
  const handleImageChange = (text: string | null) => {
    setTask((prevTask: any) => ({ ...prevTask, image: text }));
  };
  const handleDeadlineChange = (text: Date | string | null) => {
    setTask((prevTask: any) => ({ ...prevTask, deadline: text }));
  };

 // Handle image upload
  const handleImageUpload = () => {
    const options = {
      mediaType: 'photo',
    };

    // Use optional chaining operator to handle undefined object
    launchImageLibrary(options, (response) => {
      // console.log(response.assets);
      if (response) {
        handleImageChange(response);
      }
    });
  };

  useEffect(() => {
    props.route.params.handleEditTask(task)
  }, [task]);

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Title"
        value={task?.title}
        onChangeText={(text) => handleTitleChange(text)}
        multiline
        style={{fontSize: 25}}
      />
      <TextInput
        placeholder="body text (optional)"
        value={task?.description}
        onChangeText={(text) => handleDescriptionChange(text)}
        multiline
        style={{fontSize: 15}}
      />
      <View style={{ height: 50 }} />
      <Text>Completion Status: {task.isCompleted ? "Task Completed" : "Not yet completed"}</Text>
      {task?.priority ? null : <Text>Select priority</Text>}

      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text>Priority: </Text>
        <Picker
          selectedValue={task?.priority}
          onValueChange={(itemValue) => handlePriorityChange(itemValue)}
          style={{ width: 200 }}
        >
          <Picker.Item label="Low" value="low" />
          <Picker.Item label="Medium" value="medium" />
          <Picker.Item label="High" value="high" />
        </Picker>
      </View>

      {task?.deadline ? 
        (<View style={{flexDirection: 'row' }}>
          <Text>Deadline: {task?.deadline}</Text>
          <TouchableOpacity onPress={openDatePicker}>
            {<Text> (Update Deadline) </Text> }
          </TouchableOpacity>
        </View>) :
        (<TouchableOpacity onPress={openDatePicker}>
          {<Text>Select Deadline</Text>}
        </TouchableOpacity>)}

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        onConfirm={handleDateConfirm}
        onCancel={hideDatePicker}
      />

      <TouchableOpacity onPress={handleImageUpload}>
        {task?.image ? <Text>Change Image</Text> : <Text>Upload Image</Text>} 
      </TouchableOpacity>
      
      {task?.image?.assets?.length > 0 ? 
        <Image 
          source = {{ uri: task.image.assets[0]?.uri }} 
          style = {{ width: 250, height: 250, resizeMode: 'cover' }} 
        /> : null}
    </View>
  )
}

export default PostScreen

const styles = StyleSheet.create({
    container: {
      margin: 14,
      // marginBottom: 25,
    }
})