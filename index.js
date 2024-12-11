var express = require('express');
var cors = require('cors');
const multer = require('multer')
require('dotenv').config()

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.use(multer({ dest: "uploads" }).single("upfile"));

app.post('/api/fileanalyse', (req, res) => {
  const filedata = req.file
  res.json({
    name: filedata.originalname,
    type: filedata.mimetype,
    size: filedata.size
  })
})


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
