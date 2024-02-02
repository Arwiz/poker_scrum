import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  useColorScheme,
  FlatList,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import {PSCircularButton, PSPokerButton} from '../atom/PSButton';
import {SocketHandler} from './Register';
import Modal from 'react-native-modal';
import {PSColors} from '../../Utility/PSColors';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import {getToken} from '../../Utility/Utility';
import {Socket} from 'socket.io-client';

const demoImage = require('../../assets/demo_user.png');
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

interface User {
  _id?: string;
  user_id?: string;
  name?: string;
  email?: string;
  vote?: number;
}

const stories = [{}];

type Participant = {
  email: string;
  user_id: string;
  vote: number;
};

type ParticipantListProps = {
  participants: Participant[];
};

export const ParticipantList: React.FC<ParticipantListProps> = ({
  participants = [],
}) => {
  return (
    <FlatList
      horizontal={true}
      data={participants}
      keyExtractor={item => item.user_id} // Provide a unique key for each item
      renderItem={({item}) => (
        <View style={styles.userProfile}>
          <Text>
            12313{item.email} {item.user_id}
          </Text>
          <Text>Vote: {item.vote}</Text>
        </View>
      )}
    />
  );
};

const UserProfile = (imageUrl, name = '', vote = 0) => {
  console.log(name, vote);
  return (
    <>
      <View style={[styles.imageContainer]}>
        {imageUrl ? (
          <Image
            source={{uri: imageUrl}}
            style={styles.profileImage}
            resizeMode="contain"
          />
        ) : (
          <Image
            source={demoImage}
            style={styles.profileImage}
            resizeMode="contain"
          />
        )}
      </View>
      <Text> {name}</Text>
      <Text> {vote}</Text>
    </>
  );
};

const NUM_COLUMNS = 3; // Number of columns
const COLUMN_WIDTH = (Dimensions.get('window').width - 40) / NUM_COLUMNS;

const PokerRoom: React.FC = (props: any) => {
  // const story = props.navigation.param.story;
  const story = props.route.params.story;
  const [socketConnection, setSocketConnection] = React.useState(null);

  const [isModalVisible, setModalVisible] = React.useState(false);
  const [name, setName] = React.useState(null);
  const [pokerNumbers, setPokerNumbers] = React.useState([
    1, 2, 3, 5, 8, 13, 21, 34, 55,
  ]);
  const [participatns, setParticipatns] = React.useState<Participant[]>([]);

  const [vote, setVote] = React.useState<number | undefined>(undefined);
  const [message, setMessage] = React.useState<string | undefined>(undefined);

  const isDarkMode = useColorScheme() === 'dark';

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
        saveMyPoker(0);
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
        console.log('pokerroomupdate', msg);
        const data = msg?.voting;
        if (data && msg._id === story._id) {
          const array: any[] = Object.values(data);
          setParticipatns(array);
        }
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

  //----------------------------------------------------------------

  const saveMyPoker = (poker: number) => {
    try {
      setVote(poker);
      const token = getToken();
      const headers = {
        Authorization: token,
        'Content-Type': 'application/json',
      };

      axios
        .post(
          'http://localhost:3000/api/poker',
          {
            story_id: story._id,
            poker: poker,
          },
          {headers},
        )
        .then((response: any) => {
          // Handle the response data here
          console.log(response.data);
          setVote(poker);
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

  return (
    <View style={[styles.container]}>
      <Text>{story?.name} </Text>
      <Text>
        The Message: {message} {participatns.length}{' '}
      </Text>
      <ParticipantList participants={participatns} />
      <View>
        <Text style={styles.highlight}>{vote}</Text>
      </View>

      <View style={styles.container_poker}>
        <FlatList
          // contentContainerStyle={[styles.container_poker]}
          data={pokerNumbers}
          scrollEnabled={false}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => {
                saveMyPoker(item);
              }}>
              <View style={styles.pokerButton}>
                <Text style={styles.highlight}>{item}</Text>
              </View>
            </TouchableOpacity>
          )}
          numColumns={3} // Number of items per row
        />
      </View>
    </View>
  );
};

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
  container_poker: {
    alignItems: 'center',
  },
  container_user: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
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
  pokerButton: {
    width: COLUMN_WIDTH,
    height: COLUMN_WIDTH,
    backgroundColor: 'blue',
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userProfile: {
    fle: 1,
    width: 100,
    height: 100,
    backgroundColor: PSColors.greeen_4,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },

  imageContainer: {
    height: 50,
    width: 50,
    borderRadius: 100, // Creates a circular shape
    overflow: 'hidden', // Ensures the image stays within the circular container
    backgroundColor: 'red', //
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: 50,
    height: 50,
  },
  profileName: {
    // marginTop: 10,
    // fontSize: 16,
    // fontWeight: 'bold',
  },
});

export default PokerRoom;
