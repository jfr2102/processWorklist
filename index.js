var express = require('express');
var app = express();
const port = 22666;
app.get('/', function (req, res) {
   console.log(req.body)
   res.send('Hello World');
})


app.listen(port, () => {
        console.log(`listening on port ${port}`);
});  