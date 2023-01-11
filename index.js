const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
const cors = require("cors");
const port = process.env.PORT || 5000;

const app = express();

//middle ware:

app.use(cors());
app.use(express.json());

const uri =
  "mongodb+srv://decare_user1:BXkTMO2VDCf1j3eI@cluster0.74koj4x.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    const appointmentOptionCollection = client
      .db("doctors-portal")
      .collection("availableOptions");

    app.get("/availableOptions", async (req, res) => {
      const query = {};
      const options = await appointmentOptionCollection.find(query).toArray();
      res.send(options);
    });
  } catch (error) {
    console.log(error);
  }
}

run();

app.get("/", (req, res) => {
  res.send(`Server Running From Port ${port}`);
});

app.listen(port, () => {
  console.log("Server Running on port 5000.");
});

//Export API
module.exports = app;