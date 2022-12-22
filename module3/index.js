import express from 'express';
import path from 'path';
import fs from 'fs';
import mongoose from 'mongoose';
import {requestTime, logger} from './modules/middlware.js';

// import { fileURLToPath } from 'url';
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);





const page = '../module2/index.html'
const app = express();
const PORT = process.env.PORT || 3000;
const db = 'mongodb+srv://admin:12345@cluster0.ubn9cdr.mongodb.net/?retryWrites=true&w=majority';


const pagePatch = path.resolve(page);
const pagePathFolder = path.dirname(pagePatch)
console.log(pagePathFolder);

app.use(requestTime);
app.use(logger);
app.use(express.static(pagePathFolder));



mongoose
    .set('strictQuery', false)
    .connect(db)
    .then(res => console.log("db connect"))
    .catch(error => console.log(error));


app.get("/", (request, response) => {
    response.sendFile(page);
});


app.listen(PORT, (error) => {
    error ? console.log(error) : console.log(`Listening port ${PORT}`);
});

