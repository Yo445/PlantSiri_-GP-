// const express = require('express');
// const bodyParser = require('body-parser');
// const app = express();
// const port = 5000;
// app.use(bodyParser.json());
// const data = require("./routes/data");
// const { updateEndDate } = require("./routes/update"); // Update the path if necessary
// updateEndDate()
// // Call the function to update end dates

// app.use("/", data);

// const server = app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
// });


const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 5000;
app.use(bodyParser.json());
app.use(cors());


const data = require("./routes/data");
const { updateEndDate } = require("./routes/update"); // Update the path if necessary
updateEndDate()
// Call the function to update end dates

app.use("/", data);
const server = app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});