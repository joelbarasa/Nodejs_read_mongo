const mongoose = require("mongoose");
const url =
  "mongodb+srv://jbarasa:jbarasa@cluster0.zvocyod.mongodb.net/applicationUsers";

mongoose.connect(url);

const peopleSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please specify your name"],
  },
  age: {
    type: Number,
    min: 0,
    max: 500,
    required: [true],
  },
  county: String,
  hobbies: { sports: String, travel: String },
});

const users = mongoose.model("Users", peopleSchema);

const personel = [
  {
    name: "Fob",
    county: "Trans-Nzoia",
    age: 76,
    hobbies: { sports: false, travel: false },
  },
  {
    name: "Dama",
    county: "Busia",
    age: 75,
    hobbies: { sports: false, travel: true },
  },
  {
    name: "Rio",
    county: "Nairobi",
    age: 7,
    hobbies: { sports: true, travel: true },
  },
];
//Creating system users
// users
//   .insertMany(personel)
//   .then(() => {
//     console.log("Users have been succesfully created in the database..");
//     mongoose.connection.close();
//   })
//   .catch((error) => {
//     console.error(error);
//   });

// await Tank.updateOne({ size: "large" }, { name: "T-90" });
// query.get("name");

console.log("Updating specific users...");
const query = users
  .updateOne({ _id: "64c2a29b9be658cb5a5671a1" }, { name: "Daniii" })
  .then(() => {
    console.log("\nData has been updated succesfully..");
  })
  .catch((err) => {
    console.log(err);
  });

console.log("\nDelete records....");

const deleteQuery = users
  .deleteMany({ _id: "64c2a29b9be658cb5a5671a3" })
  .then(() => {
    console.log("\nData deleted succesfully...");
  })
  .catch((err) => {
    console.error(err);
  });

console.log("\nRetrieving all users...");
users
  .find()
  .then((res) => {
    //if succeded do this block of code
    // console.log(res);

    for (let i = 0; i < res.length; i++) {
      console.log(res[i].name);
    }
  })
  .catch((err) => {
    //catch error
    console.error(err);
  });

// mongoose.connection.close();
