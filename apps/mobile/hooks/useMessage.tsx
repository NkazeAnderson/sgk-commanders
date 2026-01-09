import { useState } from "react";
import { messageT } from "sgk-commanders-shared";

const useMessage = () => {
  const [messages, setMessages] = useState<messageT[]>([]);
  return { messages, setMessages };
};

export default useMessage;
