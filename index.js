var express = require('express');
var cors = require('cors');
var app = express();
const port = 22666;

app.use(cors())
app.use(express.json())

app.get('/', function (req, res) {
   console.log(req.body)
   res.send('Process');
})

app.post("/add", function(req, res) {
    console.log("add task")
    console.log(req.body)
    res.set("CPEE-CALLBACK", true);
    res.json({test: "newWorkListItem"});
})
app.listen(port, () => {
        console.log(`listening on port ${port}`);
});  