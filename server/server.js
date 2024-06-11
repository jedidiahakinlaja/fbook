const express =require('express');
const mongoose =require('mongoose');
const cors =require('cors');
const route = require("./Routes/index");
const image = require('./Models/imageModel');
const bodyParser = require('body-parser');
const path = require('path');


const PORT = 5500;
const HOSTNAME = "localhost";

const corsOptions={
    origin:'http://localhost:4200',
    credential:true,
    optionSuccessStatus:200
}

// Request Management
const app = express();
app.use(express.json());        // A body Parser Required to post a data
app.use(bodyParser.json());
app.set('view engine', 'ejs');

app.use(cors(corsOptions));
app.use('/', route);
mongoose.set('strictQuery',false);



const MongoAtlas = "mongodb+srv://jedidiahAkinlaja:jedidiahAkinlaja@cluster0.wfy398f.mongodb.net/FinalProject?retryWrites=true&w=majority&appName=Cluster0";

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

app.use('/images', express.static(path.join('images')));


mongoose.connect(MongoAtlas, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})   .then(res => {
        app.listen(PORT, HOSTNAME, () => {
            console.log(`Server is running at ${HOSTNAME}: ${PORT}`)
        });
    })
    .catch(err => console.log(err));