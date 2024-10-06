import { createContext, useContext, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setNewOrder,
  setOrders,
  setMessage,
} from "../redux/features/socketSlice";
import io from "socket.io-client";
import toast from "react-hot-toast";
import notificationSound from "/sounds/not.mp3";

const SocketContext = createContext();

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    if (user) {
      const newSocket = io(import.meta.env.VITE_REACT_APP_API, {
        query: {
          userId: user._id,
          role: user.role,
        },
      });
      setSocket(newSocket);

      if (user.role === "admin") {
        newSocket.on("new-order", (newOrder) => {
          dispatch(setNewOrder(newOrder));
          toast.success("Yeni sipariş var!");
        });
      } else if (user.role === "user") {
        newSocket.on("orderStatusUpdated", (data) => {
          const message = data.message;
          const updatedOrder = data.order;
          data.shouldShake = true;
          const sound = new Audio(notificationSound);
          sound.play();
          dispatch(setOrders(updatedOrder));
          dispatch(setMessage(message));
          toast.success(message);
        });
      }

      return () => {
        newSocket.disconnect();
      };
    }
  }, [user, dispatch]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
