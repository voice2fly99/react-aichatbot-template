const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

const configuration = new Configuration({
  organization: "org-3sOHNO1e4FPncitAm9LV9trH",
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// Allow Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Parse incoming request bodies as JSON
app.use(bodyParser.json());

// API route
app.post("/api/message", async (req, res) => {
  try {
    const { message } = req.body;
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${message}`,
      //   prompt: "Say this is a test",
      max_tokens: 10,
      temperature: 0,
    });
    if (response.data) {
      if (response.data.choices) {
        res.json({
          message: `Response: ${response.data.choices[0].text}`,
          //   message: `Received message: ${response.status}`,
        });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
});

// Start the server
const port = 3001;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
