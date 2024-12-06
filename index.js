import express from "express";
import cors from "cors"; 
import recipies from "./routes/recipies.js";
import dotenv from "dotenv";
import commandSpeech from "./routes/commandspeech.js";

dotenv.config();

const app = express();
const PORT = 5001;

// Enable CORS
app.use(cors());

// Middleware to interpret JSON
app.use(express.json());

const router = express.Router();

// Import routes
commandSpeech(router);
recipies(router);

//Add prefix
app.use("/api", router);


// Default route
app.get('/', (req, res) => {
  res.send('Welcome to the home page!');
});


app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});