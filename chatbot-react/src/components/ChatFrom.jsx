import { useRef } from "react";

export const ChatFrom = ({
  chatHistory,
  setChatHistory,
  generateBotResponse,
}) => {
  const inputRef = useRef();
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const userMessage = inputRef.current.value.trim();
    if (!userMessage) return;
    inputRef.current.value = "";

    setChatHistory((history) => [
      ...history,
      { role: "user", text: userMessage },
    ]);

    setTimeout(() => {
      setChatHistory((history) => [
        ...history,
        { role: "model", text: "thinking..." },
      ]);
    }, 600);

    // generateBotResponse([
    //   ...chatHistory,
    //   {
    //     role: "user",
    //     text: `Using the details provided above, please address this query: ${userMessage}`,
    //   },
    // ]);
    generateBotResponse([
      ...chatHistory,
      {
        role: "user",
        text: userMessage,
      },
    ]);
  };
  return (
    <form action="#" className="chat-form" onSubmit={handleFormSubmit}>
      <input
        ref={inputRef}
        type="text"
        placeholder="Message..."
        className="message-input"
        required
      />
      <button className="material-symbols-rounded">arrow_upward</button>
    </form>
  );
};
