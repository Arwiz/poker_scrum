import {View, Text} from 'react-native';
// import dayjs from 'dayjs';

import {StyleSheet} from 'react-native';

import Colors from '../../constants/Colors';
import {getCurrentUser} from '../../Utility/Utility';
import MessageStatus from './MessageStatus';

const styles = StyleSheet.create({
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

const MessageBox = (props: any) => {
  const currentUSer = getCurrentUser();
  const {message} = props;
  const isMyMessage = message.sender_id === currentUSer._id;
  return (
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
              <Text style={styles.highlight}>{message.content}</Text>
              {isMyMessage && (
                <MessageStatus status={message.status} />
              )}
              </View>
  );
};

export default MessageBox;
