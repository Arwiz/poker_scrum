import React, {useState} from 'react';
import {View, TextInput, Button, StyleSheet} from 'react-native';

interface Props {
  onSendMessage: (message: string) => void;
}

const ChatInput: React.FC<Props> = ({onSendMessage}) => {
  const [message, setMessage] = useState('');

  const handleMessageChange = (text: string) => {
    setMessage(text);
  };

  const handleSend = () => {
    if (message.trim() !== '') {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Type your message..."
        value={message}
        onChangeText={handleMessageChange}
      />
      <Button title="Send" onPress={handleSend} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
});

export default ChatInput;
