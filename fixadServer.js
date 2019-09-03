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
    console.log("First stop")
    var sql = "SELECT COUNT(*) AS logger FROM users WHERE username='bob' and password='123'"
    // var params = [req.params.username]

      db.all(sql, (err, row) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        console.log(row);
        
        
        res.json({
            "message":"success",
        })
      });
    console.log(req.body.username);
    console.log(req.body.password);
});


app.post("logout/:id", (req, res, next) => {
    var sql = "select * from users where id = ?"
    var params = [req.params.id]
    db.post(sql, params, (err, row) => {
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