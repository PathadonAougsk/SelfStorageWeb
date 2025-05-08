const express = require("express");
const path = require("path");
const { MongoClient } = require("mongodb");
const router = express();

require("dotenv").config();
const client = new MongoClient(process.env.URL);

async () => {
  try {
    await client.connect();
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!",
    );
  } catch (e) {
    console.log(e);
  }
};

const database = client.db("Stock-App");
const collection = database.collection("Storage-Collection");

clientPath = path.join(__dirname, "..", "..", "client");

router.set("views", path.join(clientPath, "views"));
router.set("view engine", "pug");

router.post("/createItem", async (req, res) => {
  results = await collection.insertOne(req.body);
  if (!results) {
    res.status(500).send("Couldnt create iteam");
  }
  res.status(200).send("successfuly creating data");
});

router.get("/loadItem", async (req, res) => {
  results = collection.find().limit(5).sort({ $natural: -1 });
  if (!results) {
    res.status(500).send("Couldnt load iteam");
  }

  const jsonList = [];
  for await (const doc of results) {
    jsonList.push(doc);
  }

  res.status(200).send(JSON.stringify(jsonList));
});

router.get("/itemDetail/:id", async (req, res) => {
  res.render("cardSetting");
});

router.get("/", async (req, res) => {
  res.render("index");
});

module.exports = router;
