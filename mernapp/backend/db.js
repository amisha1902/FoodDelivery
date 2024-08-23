const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://goFood:gofoodmern@cluster0.gbcifpg.mongodb.net/gofoodmern?retryWrites=true&w=majority"

async function mongoDB() {
    try {
        await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('MongoDB Connected');

        const collection = mongoose.connection.db.collection('food_items');
        const data = await collection.find({}).toArray();
        const foodCategory = mongoose.connection.db.collection('food_category');
        const catData = await foodCategory.find({}).toArray();
        global.food_category = catData; // Assigning data to global.food_items

        console.log(global.food_category);
        global.food_items = data; // Assigning data to global.food_items

        console.log(global.food_items);
    } catch (error) {
        console.error(error);
    }
}

module.exports = mongoDB;


// const mongoDB = async()=> {
//     await mongoose.connect(mongoURI, {useNewUrtParser: true}, async(err,result)=>{
//         if(err) console.log("---", err)
//         else{
//     console.log("connected");
// const fetched_data = await mongoose.connection.db.collection("food_items");
// fetched_data.find({}).toArray(function(err, data){
//     if(err) console.log(err);
//     else console.log();
// })
// }
//     }
//     );
// }
// const mongoDB = async()=>{
//     await mongoose.connect(mongoURI, {useNewUrlParser: true}, async(err, result)=>{
//         if(err) console.log("---", err)
//         else{
//     console.log("connected");
// const fetched_data = await mongoose.connection.db.collection("food_items");
// fetched_data.find({}).toArray(function(err, data){
//     if(err) console.log(err);
//     else{
//         global.food_items = data;
//         console.log(global.food_items)
//     }
// })}
//     });
// }