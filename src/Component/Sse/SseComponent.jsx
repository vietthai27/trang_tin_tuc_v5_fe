import { useEffect, useState } from "react";
import { host } from "../../ultil";

export default function SseComponent() {
  const [messages, setMessages] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const eventSource = new EventSource(`${host}/sse/subscribe?token=${token}`);

    eventSource.onmessage = (event) => {
      setMessages(prev => [...prev, event.data]);
    };

    eventSource.addEventListener("time", (event) => {
      console.log("Time:", event.data);
    });

    eventSource.onerror = () => {
      console.error("SSE error");
      eventSource.close();
    };

    return () => eventSource.close();
  }, []);

  return (
    <div>
      <h3>SSE Messages</h3>
      {messages.map((m, i) => (
        <div key={i}>{m}</div>
      ))}
    </div>
  );
}
