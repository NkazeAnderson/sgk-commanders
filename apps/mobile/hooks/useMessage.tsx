import { unknownErrorHandler } from "@/utils";
import { useEffect, useState } from "react";
import { messageT, userT } from "sgk-commanders-shared";
import { getMessages } from "sgk-commanders-shared/dist/supabase/messages";

const useMessage = (user:userT) => {
  const [messages, setMessages] = useState<messageT[]>([]);

  useEffect(() => {
     getMessages(user)
                  .then((res) => {
                    setMessages(res);
                  })
                  .catch((e) => {
                    unknownErrorHandler(e);
                  });
  }, [])
  
  return { messages, setMessages };
};

export default useMessage;
