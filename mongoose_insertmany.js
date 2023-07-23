const mongoose = require('mongoose');
// console.log('Test')

const url = 'mongodb://127.0.0.1:27017/countyDB';

mongoose.connect(url);

const peopleSchema = new mongoose.Schema({ name: String, gender: String });

const Person = mongoose.model('Person', peopleSchema);

const users = [{ name: 'Sam', gender: 'Male' }, { name: 'Rose', gender: 'Female' }, { name: 'Esther', gender: 'Female' }];

// user.save().then(() => console.log('User has been created succesfully!'));
Person.insertMany(users).then(() => {
    console.log("Successfully saved defult items to DB");
}).catch((err) => {
    console.err(err);
});
