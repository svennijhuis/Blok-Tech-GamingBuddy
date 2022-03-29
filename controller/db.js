const mongoose = require('mongoose');

const connectDB = () => {
    try {
        mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.acfzh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('connection success');
    } catch (err) {
        throw err;
    }
}

module.exports = connectDB;