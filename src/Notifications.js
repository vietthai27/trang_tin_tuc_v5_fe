import React, { useEffect } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Notifications() {
  useEffect(() => {
    const socketFactory = () => new SockJS("http://localhost:8080/ws");

    const client = new Client({
      webSocketFactory: socketFactory,
      reconnectDelay: 5000, // auto-reconnect after 5s
      onConnect: () => {
        console.log("Connected to WebSocket");
        client.subscribe("/topic/notifications", (message) => {
          try {
            const data = JSON.parse(message.body);
            toast.info(data.content, {
              position: "top-right",
              autoClose: 3000,
            });
          } catch (e) {
            console.error("Invalid message format", e);
          }
        });
      },
      onStompError: (frame) => {
        console.error("Broker error: " + frame.headers["message"]);
        console.error("Details: " + frame.body);
      },
    });

    client.activate();

    return () => {
      client.deactivate();
    };
  }, []);

  return null;
}
