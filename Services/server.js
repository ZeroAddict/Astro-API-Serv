const express = require('express');
const axios = require('axios');
const { MongoClient } = require('mongodb');
import dotenv from 'dotenv'
const databaseName = 'apod_database';
const collectionName = 'apod_collection';
const fs = require('fs');
const { createProxyMiddleware } = require('http-proxy-middleware');

const apiProxy = createProxyMiddleware({
  target: 'http://localhost:8000', // assuming your API server is running on port 8000
  changeOrigin: true,
  pathRewrite: { '^/api': '' },
});

app.use('/api', apiProxy);


const app = express();

app.get('/apod', async (req, res) => {
  const date = req.query.date;
  const apiKey = 'NASA_API_KEY';
  const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`;

async function saveApodDataToMongoDB(data, mongoUrl, databaseName, collectionName) {
  const client = new MongoClient(mongoUrl);
  await client.connect();
  const db = client.db(databaseName);
  const collection = db.collection(collectionName);
  await collection.insertOne(data);
}

async function saveApodDataToMongoDB(data, mongoUrl, databaseName, collectionName) {
  const client = new MongoClient(mongoUrl);
  await client.connect();
  const db = client.db(databaseName);
  const collection = db.collection(collectionName);
  await collection.insertOne(data);
}

getApodData(apiKey).then((data) => {
  saveApodDataToMongoDB(data, mongoUrl, databaseName, collectionName);
});

async function downloadApod(imageUrl, savePath) {
  const response = await axios.get(imageUrl, { responseType: 'stream' });
  response.data.pipe(fs.createWriteStream(savePath));
}

  try {
    const response = await axios.get(url);
    const data = response.data;
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to retrieve APOD data' });
  }
});

const axios = require('axios');

async function getRockets() {
  try {
    const response = await axios.get('https://api.spacex.com/v4/rockets');
    const rockets = response.data;
    return rockets;
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function getCapsules() {
  try {
    const response = await axios.get('https://api.spacex.com/v4/capsules');
    const capsules = response.data;
    return capsules;
  } catch (error) {
    console.error(error);
    return null;
  }
}

getRockets().then((rockets) => {
  if (rockets) {
    console.log(rockets[0].name);
  } else {
    console.log('Failed to retrieve rockets');
  }
});

getCapsules().then((capsules) => {
  if (capsules) {
    console.log(capsules[0].capsule_serial);
  } else {
    console.log('Failed to retrieve capsules');
  }
});

const port = 3001;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});