const express = require("express");
const bodyParser = require("body-parser");
const date = require("./date");
const mongoose = require("mongoose");
require("dotenv").config();
const _=require('lodash');

const app = express();

//To tell the express using ejs via view engin
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

//Conntect database with mongoose
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((con) => {
    //console.log(con.connections);
    console.log("Successfull");
  })
  .catch((e) => {
    console.log("not connected");
  });

//Creating New Schema for Item
const itemSchema = new mongoose.Schema({
  name: String,
});

const Item = mongoose.model("Item", itemSchema);

//Creating document out of model
const item1 = new Item({
  name: "Well come to-Do list",
});

const item2 = new Item({
  name: "Buy Fruit",
});

const item3 = new Item({
  name: "Go-To-Gym",
});

let defaultItems = [item1, item2, item3];


//New Schema
const listSchema = new mongoose.Schema({
  name: String,
  items: [itemSchema],
});

//Create Document
const List = mongoose.model("List", listSchema);


//Creating dcument in default list and render it
app.get("/", function(req, res) {

  Item.find({}, function(err, foundItems){

    if (foundItems.length === 0) {
      Item.insertMany(defaultItems, function(err){
        if (err) {
          console.log(err);
        } else {
          console.log("Successfully savevd default items to DB.");
        }
      });
      res.redirect("/");
    } else {
      res.render("list", {listTitle: "Today", newListItems: foundItems});
    }
  });

});

//Creating document in custom list
app.get("/:customListName", function(req, res){
  const customListName = _.capitalize(req.params.customListName);

  List.findOne({name: customListName}, function(err, foundList){
    if (!err){
      if (!foundList){
        //Create a new list
        const list = new List({
          name: customListName,
          items: defaultItems
        });
        list.save();
        res.redirect("/" + customListName);
      } else {
        //Show an existing list

        res.render("list", {listTitle: foundList.name, newListItems: foundList.items});
      }
    }
  });



});

//Adding document in custom as default list

app.post("/", function(req, res){

  const itemName = req.body.newItem;
  const listName = req.body.list;

  const item = new Item({
    name: itemName
  });

  if (listName === "Today"){
    item.save();
    res.redirect("/");
  } else {
    List.findOne({name: listName}, function(err, foundList){
      foundList.items.push(item);
      foundList.save();
      res.redirect("/" + listName);
    });
  }
});

//Delete document from custom as well default list
app.post("/delete", function(req, res){
  const checkedItemId = req.body.checkbox;
  const listName = req.body.listName;

  if (listName === "Today") {
    Item.findByIdAndRemove(checkedItemId, function(err){
      if (!err) {
        console.log("Successfully deleted checked item.");
        res.redirect("/");
      }
    });
  } else {
    List.findOneAndUpdate({name: listName}, {$pull: {items: {_id: checkedItemId}}}, function(err, foundList){
      if (!err){
        res.redirect("/" + listName);
      }
    });
  }


});
app.listen(`${process.env.PORT}`, () => {
  console.log(`Server has started at ${process.env.PORT}`);
});