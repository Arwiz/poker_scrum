import React, {useState, useRef, useEffect} from 'react';
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
import {useAuth} from '../contexts/AuthContext';
import {useSocket} from '../contexts/SocketContext';
import {TouchableOpacity} from 'react-native';

const MessageRow = ({data, socket, currentUser}) => {
  const handleClick = (item: any) => {
    //socket.emit('click', item);
  };

  useEffect(() => {
    if (
      (data?.status === 'DELIVERED' || data?.status === 'SENT') &&
      data?.created_by !== currentUser._id
    ) {
      socket.emit('poker.chat.acknowledge', {...data, status: 'READ'});
    }
  }, [data?.status]);

  return (
    <TouchableOpacity onPress={() => handleClick(data)}>
      <View
        style={[
          styles.messageRow,
          {
            alignSelf:
              data?.created_by === currentUser._id ? 'flex-end' : 'flex-start',
          },
        ]}>
        <Text>{data?.message}</Text>
        {data?.created_by === currentUser._id && (
          <MessageStatus status={data?.status} />
        )}
      </View>
    </TouchableOpacity>
  );
};

const ConversationDetailScreen: React.FC = (props: any) => {
  const scrollViewRef = useRef<ScrollView>(null);
  const [message, setMessage] = useState('');
  const {token} = useAuth();
  const socket = useSocket();

  const conversation = props.route.params.conversation;
  const currentUser = getCurrentUser();

  const [allMessages, setAllMessages] = React.useState<any[]>([]);
  const flatListRef = React.useRef<FlatList>(null);

  const sendMessage = () => {
    try {
      const headers = {
        Authorization: token,
        'Content-Type': 'application/json',
      };

      axios
        .post(
          'http://localhost:3000/api/messages',
          {
            conversation_id: conversation._id,
            message: message,
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

  /******
   *  Set all messages
   */

  const getConversationMessages = () => {
    try {
      const headers = {
        Authorization: token,
        'Content-Type': 'application/json',
      };

      axios
        .get(
          `http://localhost:3000/api/messages?conversation_id=${conversation._id}`,
          {headers},
        )
        .then((response: any) => {
          // Handle the response data here
          console.log('REsponse from chat api', response.data);
          setAllMessages(() => [...response.data]);
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

  useEffect(() => {
    getConversationMessages();
  }, [conversation?._id]);

  useEffect(() => {
    if (socket) {
      // Example: Listen for events from the server
      socket.on('poker.chat.updated', msg => {
        console.log('poker.chat.updated =>>>>>>', msg);
        const fidMessage = allMessages.find(m => m._id === msg._id);
        if (!fidMessage) {
          socket.emit('poker.chat.acknowledge', {...msg, status: 'DELIVERED'});
        }
        setAllMessages(prev => [...prev, {...msg, status: 'DELIVERED'}]);
      });

      socket.on('poker.chat.updated.message', msg => {
        console.log('poker.chat.updated.message=>>>>>>', msg);
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
      });

      socket.on('poker.chat.acknowledge', msg => {
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
      socket?.off('poker.chat.updated');
      socket?.off('poker.chat.updated.message');
      socket?.off('poker.chat.acknowledge');
    };
  }, [socket]);

  /********************************
   *
   *
   * */

  const handleSendMessage = () => {
    // Send message logic here
    console.log('Message sent:', message);
    sendMessage();
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
      keyboardVerticalOffset={80}>
      <View style={styles.messagesContainer}>
        <Text>Conversations</Text>

        <FlatList
          ref={flatListRef}
          onContentSizeChange={() =>
            flatListRef.current?.scrollToEnd({animated: true})
          }
          data={allMessages}
          scrollEnabled={true}
          renderItem={({item}) => (
            <MessageRow data={item} socket={socket} currentUser={currentUser} />
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
    flex: 1,
  },
  inputContainer: {
    // flex:1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    backgroundColor: '#f9f9f9',
    marginBottom: 10,
    height: 100,
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

export default ConversationDetailScreen;
