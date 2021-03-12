const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

const MongoClient = require("mongodb").MongoClient;
const ObjectID = require("mongodb").ObjectID;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.options("*", cors());
const port = process.env.PORT || 8080;

console.log(process.env.PORT);

app.listen(port, () => {
  console.log("app listen at 8080");
});

const url =
  "mongodb+srv://Mati:Mati@cluster0.t1pfj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const getDate = () => {
  let date_ob = new Date();
  let year = date_ob.getFullYear();
  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
  let date = ("0" + date_ob.getDate()).slice(-2);
  let hours = date_ob.getHours();
  let minutes = date_ob.getMinutes();
  let seconds = date_ob.getSeconds();

  let actualDate = `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;

  return actualDate;
};

MongoClient.connect(
  url,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, client) => {
    if (err) {
      return console.log(err);
    } else {
      console.log("Connected");

      const db = client.db("notesDB");
      const notesCollection = db.collection("notes");

      app.get("/notes", cors(), (req, res) => {
        notesCollection.find({}).toArray((err, notes) => {
          if (err) {
            console.log("Błąd pobierania danych", err);
          } else {
            res.json(notes);
          }
        });
      });

      app.post("/send", cors(), (req, res) => {
        const { title, content } = req.body;

        if (title === "" || content === "" || title.length > 10) {
          res.status(400).send("Inputs cant be empty");
          return;
        } else {
          notesCollection.insertOne({
            title,
            content,
            created: getDate(),
            modified: "---",
            version: 1,
            oldRecords: [],
          });
        }
      });

      app.put("/update", cors(), (req, res) => {
        const { title, content, id, created, version, modified } = req.body;

        if (title === "" && content === "") {
          res.status(400).send("Inputs cant be empty");
          return;
        } else {
          console.log(created, version, modified);
          notesCollection.findOneAndUpdate(
            {
              _id: ObjectID(id),
            },
            {
              $set: {
                title,
                content,
                version: version + 1,
                modified: getDate(),
              },

              $push: {
                oldRecords: { title, content, version: version, modified },
              },
            }
          );
        }
      });

      app.delete("/delete/:id", cors(), (req, res) => {
        const { id } = req.params;

        notesCollection.deleteOne({
          _id: ObjectID(id),
        });
      });
    }
  }
);
