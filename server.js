var express = require("express")
var app = express()
var db = require("./database.js")

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var HTTP_PORT = 8000

// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT))
});

app.use(express.static('public'))


// app.use(express.static('public'))

// app.get("/loginsite", (req, res, next) => {
//   var sql = "select * from cars"
//   var params = []
//   db.all(sql, params, (err, rows) => {
//       if (err) {
//         res.status(400).json({"error":err.message});
//         return;
//       }
//       res.json({
//           "message":"success",
//           "data":rows
//       })
//     });
// });


app.post("/login", (req, res, next) => {
    console.log("First stop");
    var sql = `SELECT id,COUNT(*) AS logged FROM users WHERE username='${req.body.username}' and password='${req.body.password}'`;
    // var params = [req.params.username];

      db.get(sql, (err, row) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }

        console.log(row);
        var userid = 0;
        if(row.logged){
          userid = row.id;
        }
        
        res.json({
            "userid":userid,
        })
      });
    console.log(req.body.username);
    console.log(req.body.password);
});


app.post("/logout", (req, res, next) => {
    var sql = "SELECT * FROM users WHERE id = ?"
    var params = [req.params.id]
    db.get(sql, params, (err, row) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":row
        })
      });
});

// Root path
app.post("/", (req, res, next) => {
    res.json({"message":"Ok"})
});