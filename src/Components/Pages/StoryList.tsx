import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  useColorScheme,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {PSButton, PSCircularButton} from '../atom/PSButton';
import {SocketHandler} from './Register';
import Modal from 'react-native-modal';
import {PSColors} from '../../Utility/PSColors';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import {getToken} from '../../Utility/Utility';
const arr = [];

interface StoryWeight {
  email: string;
  point: number;
}

interface Story {
  id: string;
  name: string;
  storyWeight: StoryWeight[];
  isFreeze: boolean;
  freezeTime: Date;
}

interface Doc {
  _id: string;
  name: string;
  createdBy?: any;
  type: string;
}

const stories = [{}];

function StoryList(props: any) {
  const navigation = props.navigation;
  const project = props.route.params.project;

  const [isModalVisible, setModalVisible] = React.useState(false);
  const [name, setName] = React.useState(null);
  const [stories, setStories] = React.useState([]);

  const isDarkMode = useColorScheme() === 'dark';

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const saveStoryModal = () => {
    try {
      const token = getToken();
      const headers = {
        Authorization: token,
        'Content-Type': 'application/json',
      };

      axios
        .post(
          'http://localhost:3000/api/stories',
          {
            name,
            project_id: project._id,
          },
          {headers},
        )
        .then((response: any) => {
          // Handle the response data here
          console.log(response.data);
          getAllStory();
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
      toggleModal();
    }
  };

  function getAllStory() {
    try {
      const token = getToken();
      const headers = {
        Authorization: token,
        'Content-Type': 'application/json',
      };
      axios
        .get(`http://localhost:3000/api/stories/${project._id}`, {headers})
        .then((response: any) => {
          // Handle the response data here
          console.log(response.data);
          setStories(response.data);
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
      setModalVisible(false);
    }
  }

  React.useEffect(() => {
    getAllStory();
  }, []);

  return (
    <View style={[styles.container]}>
      <FlatList
        data={stories}
        renderItem={({item}) => (
          <TouchableOpacity style={styles.container} onPress={() => {}}>
            <View style={[styles.container, styles.block]}>
              <Text>{item.name} </Text>
              {}
              <PSButton
                title={'Join Poker Room'}
                onPress={() => navigation.navigate('PokerRoom', {story: item})}
              />
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item: Doc) => item._id}
      />
      <PSCircularButton title="Add New Story" onPress={toggleModal} />
      <Modal isVisible={isModalVisible}>
        <View
          style={{
            position: 'absolute',
            top: 12,
            right: 10,
            alignItems: 'flex-end',
          }}>
          <Icon name="remove" color={'white'} size={25} onPress={toggleModal} />
        </View>
        <View style={[styles.block, styles.dark]}>
          <View style={[]}>
            <Text
              style={[
                styles.label,
                {color: isDarkMode ? PSColors.light : PSColors.dark},
              ]}>
              Story Name:
            </Text>
            <TextInput
              style={styles.input}
              onChangeText={setName}
              value={name}
              placeholder="Story Name"
            />
            <View style={[{marginTop: 30}]}>
              <PSCircularButton title="Save" onPress={saveStoryModal} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  container: {
    flex: 1,
  },
  block: {
    margin: 10,
    padding: 10,
    borderRadius: 5,
    // shadowColor: 'blue',
    shadowOpacity: 0.7,
    borderWidth: 1,
    borderShadow: true,
  },
  dark: {
    backgroundColor: PSColors.dark,
  },
  black: {
    backgroundColor: PSColors.black,
  },
  yellow: {
    backgroundColor: PSColors.yellow,
  },
  orange: {
    backgroundColor: PSColors.orange,
  },
  light: {
    backgroundColor: PSColors.light,
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    borderRadius: 5,
    // borderColor: 'red',
    // shadowColor: 'blue',
    shadowOpacity: 0.7,
    // baseText: {
    //   fontFamily: 'Cochin',
    // },
    // titleText: {
    //   fontSize: 20,
    //   fontWeight: 'bold',
    // },
    color: 'white',
  },
});

export default StoryList;
