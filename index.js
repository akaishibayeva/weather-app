import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

const yourAPIKey = "openuv-ja7rrlz4quyom-io";

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
// app.set('view engine', 'ejs');

// Home Route
app.get('/', (req, res) => {
    res.render("index.ejs", { uvData: null, error: null });
  });

  // Fetch UV Data
app.post('/', async (req, res) => {
    const { latitude, longitude, altitude, dateTime } = req.body;
    const url = `https://api.openuv.io/api/v1/uv?lat=${latitude}&lng=${longitude}&alt=${altitude || ''}&dt=${dateTime || ''}`;
  
    try {
      const response = await axios.get(url, {
        headers: {
          "x-access-token": yourAPIKey,
          "Content-Type": "application/json"
        }
      });
      const uvData = response.data.result;
      res.render("index.ejs", { uvData, error: null });
    } catch (error) {
      console.error(error);
      res.render("index.ejs", { uvData: null, error: "Error, please try again" });
    }
  });
  
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });