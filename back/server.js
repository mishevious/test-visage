const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors')
const bodyParser = require("body-parser");

const app = express();

app.use(express.static('public'));
app.use(cors());
app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/pdf', express.static(__dirname + '/public/pdf'));
process.env.APPDIR = `${__dirname}`
const db = require("./app/models");
// db.sequelize.sync();
db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
});

require("./app/routes/profile.routes")(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});