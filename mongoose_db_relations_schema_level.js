const mongoose = require("mongoose");

let uri =
  "mongodb+srv://jbarasa:jbarasa@cluster0.zvocyod.mongodb.net/ke_CountiesDB";

async function mongoEngine() {
  mongoose.connect(uri);

  const economicSchema = await new mongoose.Schema({
    activity: {
      type: String,
      required: [true, "Please enter activity name"],
    },
    rating: {
      type: Number,
      required: [true, "Please enter your rating"],
    },
  });

  const CountySchema = await new mongoose.Schema({
    name: {
      type: String,
      required: [true, "Please enter county name"],
    },
    order: {
      type: Number,
      required: [true, "Please enter county number"],
      min: 1,
      max: 47,
    },
    activity: economicSchema,
  });

  const activity = mongoose.model("Economic_Activity", economicSchema);
  const county = mongoose.model("Counties", CountySchema);

  const agric = new activity({ activity: "Agriculture", rating: 90 });
  const trade = new activity({ activity: "Trade", rating: 60 });
  //   agric.save();
  //   trade.save();

  activity
    .insertMany([agric, trade])
    .then(() => {
      console.log("\nActivities inserted succesfully...");
      mongoose.connection.close();
    })
    .catch((err) => {
      console.error(err);
    });

  county
    .insertMany([
      { name: "Nairobi", order: 47, activity: trade },
      { name: "Mombasa", order: 1, activity: agric },
      { name: "Trans-Nzoia", order: 26, activity: agric },
    ])
    .then(() => {
      console.log("\nCounties inserted succesfully...");
    })
    .catch((err) => {
      console.error(err);
    });
}

Promise.resolve(mongoEngine()).then(() => console.log("value is here"));

// mongoEngine()
//   .then((res) => {
//     console.log("\nDatabase acitivities completed succesfully...");
//     mongoose.connection.close();
//   })
//   .catch((err) => console.error(err));
