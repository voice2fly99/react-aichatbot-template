# OpenAI Chatbot API Starter

This is a Node.js application that uses the OpenAI API to create a chatbot. It listens to incoming requests to the `/api/message` endpoint, receives a message from the request body, sends it to the OpenAI API, and returns a response to the client.

### Requirements

- Node.js
- OpenAI API key

### Setup

- Clone the repository
- Install the required packages using `npm install`
- Create a `.env` file and add your OpenAI API key: `REACT_APP_OPENAI_API_KEY=your_api_key_here`
- Run the application using `npm start`

### Usage

- Send a POST request to `http://localhost:3001/api/message` with a JSON body containing the message: `{ "message": "Hello" }`
- The server will send the message to the OpenAI API and return a response with the chatbot's reply: `{ "message": "Received message: Hi there!"`
