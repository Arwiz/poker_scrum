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
  TouchableOpacity,
} from 'react-native';
import {SocketHandler} from './Register';
import axios from 'axios';
import {getToken} from '../../Utility/Utility';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useAuth} from '../contexts/AuthContext';
import {useRoute} from '@react-navigation/native';

const ContactScreen: React.FC = (props: any) => {
  const navigation = props.navigation;
  const scrollViewRef = useRef<ScrollView>(null);
  const [users, setUsers] = useState([]);
  const {token} = useAuth();
  const route = useRoute();
  const data = route?.params?.data;

  /******
   *  Set all messages
   */

  const getAllUsers = () => {
    try {
      const headers = {
        Authorization: token,
        'Content-Type': 'application/json',
      };

      axios
        .get('http://localhost:3000/api/users', {headers})
        .then((response: any) => {
          // Handle the response data here
          console.log(response.data);
          setUsers(response.data);
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
    getAllUsers();
    return () => {};
  }, []);

  /********************************
   *
   *
   * */

  const handleClick = (item: any) => {
    console.log('handleClick', item.email);
    navigation.navigate({
      name: 'ConversationScreen',
      params: { contactData: item },
      merge: true,
    });


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
          <Icon.Button
            name="facebook"
            backgroundColor="#3b5998"
            // onPress={this.loginWithFacebook}
          >
            Login with Facebook
          </Icon.Button>

          <FlatList
            data={users}
            scrollEnabled={true}
            renderItem={({item}) => (
              <TouchableOpacity onPress={() => handleClick(item)}>
                <View style={styles.messageRow}>
                  <Text style={styles.highlight}>{item.email}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </ScrollView>
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

export default ContactScreen;
