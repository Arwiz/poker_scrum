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
import {getToken, getCurrentUser} from '../../Utility/Utility';
import MessageStatus from '../molecules/MessageStatus';
import Colors from '../../constants/colors';

const OneToOneChatScreen: React.FC = (props: any) => {
  const scrollViewRef = useRef<ScrollView>(null);
  const [message, setMessage] = useState('');

  const story = props.route.params.story;
  const anotherContact = props.route.params;

  const [allMessages, setAllMessages] = React.useState<any[]>([]);

  const currentUser = getCurrentUser();

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
            to_user_id: anotherContact._id,
            message: message,
            chat_type: 'ONE',
          },
          {headers},
        )
        .then((response: any) => {
          // Handle the response data here
          console.log('REsponse from chat api', response.data);
          setAllMessages(prevState => [...prevState, response.data]);
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
    const socket = SocketHandler.get_instance();
    if (socket && anotherContact?._id) {
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
        //setAllMessages(prevState => [...prevState, msg]);
        socket.emit('acknowledge', {...msg, status: 'DELIVERED'});
        setAllMessages(prevState => [
          ...prevState,
          {...msg, status: 'DELIVERED'},
        ]);
      });

      socket.on('acknowledge', msg => {
        console.log('acknowledge =>>>>>>', msg, allMessages);
        // Update Message;
        setAllMessages(prevState => {
          const allNewMessage: any[] = prevState.map((item: any) => {
            if (item._id === msg._id) {
              console.log('item.status =>>>>>>', item.status);
              item.status = msg.status;
              console.log('item.status =>>>>>>', item.status);
            }
            return item;
          });
          return allNewMessage;
        });
        console.log('all message =>>>>>>', allMessages);
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
      <View style={styles.messagesContainer}>
        <Text>Hello One To One{anotherContact?.email}</Text>

        <FlatList
          data={allMessages}
          scrollEnabled={true}
          renderItem={({item}) => (
            <View
              style={[
                styles.messageRow,
                {
                  alignSelf:
                    item.sender_id === currentUser._id
                      ? 'flex-end'
                      : 'flex-start',
                },
              ]}>
              <Text style={styles.highlight}>{item.content}</Text>
              {item.sender_id === currentUser._id && (
                <MessageStatus status={item.status} />
              )}
            </View>
          )}
        />
      </View>

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
    minHeight: 30,
    backgroundColor: '#cA',
    borderBlockColor: '#CCC',
    borderColor: '#CCC',
    borderWidth: 1,
    padding: 10,
    margin: 2,
    borderRadius: 10,
    cursor: 'pointer',
  },
  messageContainer: {
    width: '65%',
    marginVertical: 3,
    marginHorizontal: 16,
    paddingVertical: 10,
    flexDirection: 'row',
    borderRadius: 5,
  },
  leftMessageArrow: {
    height: 0,
    width: 0,
    borderLeftWidth: 10,
    borderLeftColor: 'transparent',
    borderTopColor: Colors.light.white,
    borderTopWidth: 10,
    alignSelf: 'flex-start',
    borderRightColor: 'black',
    right: 10,
    bottom: 10,
  },
  messageText: {
    fontSize: 16,
    width: '65%',
  },
  timeAndReadContainer: {
    flexDirection: 'row',
  },
  timeText: {
    fontSize: 12,
    color: Colors.light.grey,
  },
  rightMsgArrow: {
    height: 0,
    width: 0,
    borderRightWidth: 10,
    borderRightColor: 'transparent',
    borderTopColor: Colors.light.msgGreen,
    borderTopWidth: 10,
    alignSelf: 'flex-start',
    left: 6,
    bottom: 10,
  },
});

export default OneToOneChatScreen;
