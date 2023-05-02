import React, { useState } from "react";
import styled from "styled-components";

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  /* padding: 20px; */
  box-sizing: border-box;
`;

const ChatBox = styled.div`
  display: flex;
  flex-direction: column-reverse;
  overflow-y: auto;
  flex-grow: 1;
  padding: 20px;
`;

const MessageBubble = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  max-width: 80%;
  align-self: ${(props) => (props.isMine ? "flex-end" : "flex-start")};
  background-color: ${(props) => (props.isMine ? "#2979FF" : "#F5F5F5")};
  color: ${(props) => (props.isMine ? "#fff" : "#000")};
  border-radius: 20px;
  padding: 10px 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #f4f4f4;
  border-top: 0.8px solid #ccc;
  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: center;
  }
`;

const TextArea = styled.textarea`
  height: 50px;
  width: 70vw;
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin: 10px 0px 10px 40px;
  @media screen and (max-width: 768px) {
    width: 80vw;
    margin: 10px 0px 10px 0px;
  }
`;

const SubmitButton = styled.button`
  background-color: #2979ff;
  color: #fff;
  border: none;
  margin: 10px 40px 10px 0px;
  border-radius: 5px;
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
  width: 80vw;
  @media screen and (max-width: 768px) {
    margin: 0px 0px 10px 0px;
  }
`;

const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Label = styled.label`
  margin-right: 10px;
`;

function MessageComponent() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("http://localhost:3001/api/message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: message }),
    })
      .then((response) => response.json())
      .then((data) => {
        setMessages([
          ...messages,
          { text: message, isMine: true },
          { text: data.message, isMine: false },
        ]);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    setMessage("");
  };

  return (
    <ChatContainer>
      <ChatBox>
        {messages.map((msg, index) => (
          <MessageBubble key={index} isMine={msg.isMine}>
            {msg.text}
          </MessageBubble>
        ))}
      </ChatBox>

      <CenteredContainer>
        <Form onSubmit={handleSubmit}>
          <Label>
            <TextArea
              value={message}
              placeholder="Enter message"
              onChange={(event) => setMessage(event.target.value)}
            />
          </Label>
          <SubmitButton type="submit">Send Message</SubmitButton>
        </Form>
      </CenteredContainer>
    </ChatContainer>
  );
}

export default MessageComponent;
