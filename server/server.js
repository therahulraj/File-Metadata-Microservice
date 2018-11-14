const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const multer = require('multer');

var port = process.env.PORT || 3000;
var app = express();
app.use(cors());
app.use(bodyParser.json());
var urlencodedParser = bodyParser.urlencoded({extended: false});
var upload = multer({ dest: 'uploads/'});

const basePath = path.join(__dirname, '..', 'public');
app.use(express.static(basePath));


app.get('/', (req, res) => {
  res.status(200).sendFile(basePath, 'index.html');
})
app.post('/api/fileanalyse', upload.single('file'), (req, res, next) => {
  var fileDetails = {
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  }
  res.send(fileDetails);
})



app.listen(port, () => {
  console.log(`listening on port ${port}`)
})
