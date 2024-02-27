// // SocketContext.tsx
// import React, {
//   ReactNode,
//   createContext,
//   useContext,
//   useEffect,
//   useState,
// } from 'react';
// import {io, Socket} from 'socket.io-client';
// import {SocketHandler} from '../Pages/Register';
// import {useAuth} from './AuthContext';

// // Define the context type
// type SocketContextType = {
//   socket: Socket | null;
//   chat: any;
// };

// // Create the context with initial values
// const SocketContext = createContext<SocketContextType>({
//   socket: null,
//   chat: null,
// });

// // Custom hook to access the socket context
// export const useSocket = () => useContext(SocketContext);

// // Component to provide the socket context to the entire app
// export const SocketProvider: React.FC<{children: ReactNode}> = ({children}) => {
//   const [socket, setSocket] = useState<Socket | undefined>(undefined);
//   const {token} = useAuth();

//   const [chat, setChat] = useState<any | null>(null);

//   useEffect(() => {
//     // Initialize the socket connection
//     const newsocket = SocketHandler.get_instance(token);
//     setSocket(newsocket);
//   }, []);

//   useEffect(() => {
//     console.log('socket Block ', socket);
//     if (socket) {
//       console.log('socket Block in 1');
//       if (socket.connected) {
//         socket.emit('join.poker.room.client');
//       }
//       socket.on('connect', () => {
//         console.log('Connected to server 1234');
//         socket.emit('join.poker.room.client');
//       });

//       socket.on('disconnect', () => {
//         console.log('Disconnected from server');
//       });

//       // socket.on('poker.chat.updated', msg => {
//       //   console.log('poker.chat.updated =>>>>>>', msg);
//       //   setChat(msg);
//       // });

//       socket.on('poker.chat.acknowledge', msg => {
//         console.log('poker.chat.acknowledge =>>>>>>', msg);
//       });
//     }
//     return () => {
//       socket?.off('connect');
//       socket?.off('disconnect');
//       socket?.off('poker.room.join');
//       socket?.off('poker.room.leave');
//       //socket?.off('poker.room.update');
//       socket?.disconnect();
//     };
//   }, [socket]);

//   return (
//     <SocketContext.Provider value={{socket}}>
//       {children}
//     </SocketContext.Provider>
//   );
// };

// SocketContext.tsx
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import {Socket} from 'socket.io-client';
import {SocketHandler} from '../Pages/Register';
import {useAuth} from './AuthContext';

// Define the context type
// type SocketContextType = Socket | null;

// Create a new context for the socket
const SocketContext = createContext<Socket | undefined>(undefined);

// Custom hook to access the socket context
export const useSocket = () => useContext(SocketContext);

// Component to provide the socket context to the entire app
export const SocketProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const [socket, setSocket] = useState<Socket | undefined>(undefined);
  const {token} = useAuth();

  useEffect(() => {
    // Connect to the WebSocket server
    let newsocket: Socket | undefined;
    if (token) {
      newsocket = SocketHandler.get_instance(token);
      if (newsocket) {
        setSocket(newsocket);
      }
    }

    // Clean up function to disconnect the socket when the component unmounts
    return () => {
      newsocket?.disconnect();
    };
  }, [token]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
