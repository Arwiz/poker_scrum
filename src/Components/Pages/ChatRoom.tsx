import React, {useState, useRef} from 'react';
import {
  View,
  ScrollView,
  TextInput,
  Keyboard,
  Button,
  StyleSheet,
  KeyboardAvoidingView,
  FlatList,
  Text,
  Alert,
} from 'react-native';
import {SocketHandler} from './Register';
import axios from 'axios';
import {getToken} from '../../Utility/Utility';

const ChatScreen: React.FC = (props: any) => {
  const scrollViewRef = useRef<ScrollView>(null);
  const [message, setMessage] = useState('');

  const story = props.route.params.story;

  const [allMessages, setAllMessages] = React.useState([]);

  /******
   *  Set all messages
   */

  const saveMyPoker = (message: string) => {
    try {
      const token = getToken();
      const headers = {
        Authorization: token,
        'Content-Type': 'application/json',
      };

      axios
        .post(
          'http://localhost:3000/api/chat',
          {
            story_id: story._id,
            message: message,
          },
          {headers},
        )
        .then((response: any) => {
          // Handle the response data here
          console.log(response.data);
          setMessage('');
        })
        .catch(error => {
          // Handle any errors here
          console.log(error);
        });
      // setData(result);
      // If user register successfully then redirect login page
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  //Socket ----------------------------------------------------------------

  React.useEffect(() => {
    const joinRoom = () => {
      try {
        const token = getToken();
        const headers = {
          Authorization: token,
          'Content-Type': 'application/json',
        };

        axios
          .post(
            'http://localhost:3000/api/poker/roomjoin',
            {
              story_id: story._id,
            },
            {headers},
          )
          .then((response: any) => {
            // Handle the response data here
            console.log('REsponse of Sevove', response.data);
          })
          .catch(error => {
            // Handle any errors here
            console.log(error);
          });
        // setData(result);
        // If user register successfully then redirect login page
      } catch (error) {
        console.log(error);
      } finally {
      }
    };
    const leaveRoom = () => {
      try {
        const token = getToken();
        const headers = {
          Authorization: token,
          'Content-Type': 'application/json',
        };

        axios
          .post(
            'http://localhost:3000/api/poker/roomleave',
            {
              story_id: story._id,
            },
            {headers},
          )
          .then((response: any) => {
            // Handle the response data here
            console.log(response.data);
          })
          .catch(error => {
            // Handle any errors here
            console.log(error);
          });
        // setData(result);
        // If user register successfully then redirect login page
      } catch (error) {
        console.log(error);
      } finally {
      }
    };

    const socket = SocketHandler.get_instance();
    if (socket && story?._id) {
      if (socket.connected) {
        saveMyPoker('');
        socket.emit('join.poker.room.client', `${story?._id}`);
      }
      socket.on('connect', () => {
        console.log('Connected to server 1234');
        socket.emit('join.poker.room.client', `${story?._id}`);
      });

      socket.on('disconnect', () => {
        console.log('Disconnected from server');
      });

      socket.on('poker.room.join.new.user', msg => {
        console.log('New message:******************** Receiev', msg);
        const data = msg?.voting;
        // toast.success('New User Added');
      });

      socket.on('poker.room.leave', msg => {
        console.log('room.leaved', msg);
      });

      socket.on('poker.room.updated', msg => {
        console.log('pokerroomupdate =>>>>>>', msg);
        setAllMessages(prevState => [...prevState, msg]);
      });
    }
    return () => {
      socket?.off('connect');
      socket?.off('disconnect');
      socket?.off('poker.room.join');
      socket?.off('poker.room.leave');
      socket?.off('poker.room.update');
      socket?.disconnect();
    };
  }, []);

  /********************************
   *
   *
   * */

  const handleSendMessage = () => {
    // Send message logic here
    console.log('Message sent:', message);
    saveMyPoker(message);
    setMessage('');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
      keyboardVerticalOffset={80}>
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        {/* Chat messages component */}
        <View style={styles.messagesContainer}>
          <FlatList
            data={allMessages}
            scrollEnabled={true}
            renderItem={({item}) => (
              <View style={styles.messageRow}>
                <Text style={styles.highlight}>{item.message}</Text>
              </View>
            )}
          />
        </View>
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="Type your message..."
        />
        <Button title="Send" onPress={handleSendMessage} />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  messagesContainer: {
    padding: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    backgroundColor: '#f9f9f9',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  highlight: {
    fontWeight: '700',
  },
  messageRow: {
    flex: 1,
    minHeight: 40,
    backgroundColor: '#cA',
    borderBlockColor: '#CCC',
    borderColor: '#CCC',
    borderWidth: 2,
    padding: 2,
    margin: 2,
  },
});

export default ChatScreen;
