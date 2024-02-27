import React from 'react';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

type MessageStatus = 'SENT' | 'DELIVERED' | 'READ';

type StatusProps = {
  status: MessageStatus;
};

const MessageStatus = (props: StatusProps) => {
  const status = props.status;
  console.log('status=>>', status);
  if (status === 'SENT') {
    console.log('status=>>SENT', status);
    return <Icon name="rocket" size={10} color="blue" />;
  }
  if (status === 'DELIVERED') {
    console.log('status=>>DELIVERED', status);
    return (
        <View
        style={{
          flex: 1,
                flexDirection: 'row',
        //   backgroundColor: 'red',
        }}>
        <Icon name="rocket" size={10} color="red" />
        <Icon name="rocket" size={10} color="red" />
        </View>
    );
  }
  if (status === 'READ') {
    console.log('status=>>READ', status);
    return (
      <View
        style={{
          flex: 1,
            flexDirection: 'row',
        }}>
        <Icon name="rocket" size={10} color="green" />
        <Icon name="rocket" size={10} color="green" />
      </View>
    );
  }
  return <></>;
};

export default MessageStatus;
