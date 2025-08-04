const express = require('express');
const app = express();
const pool = require('./.config/db.js');

app.use(express.json());

app.get('/calls', async (_,res) => {
    
})