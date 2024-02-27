import AsyncStorage from '@react-native-async-storage/async-storage';
import Reactotron, {networking} from 'reactotron-react-native';
Reactotron.setAsyncStorageHandler(AsyncStorage)
  .configure({name: 'Poker_scrum', host: '192.168.1.3', port: 9090})
  .useReactNative()
  .use(networking())
  .connect();
