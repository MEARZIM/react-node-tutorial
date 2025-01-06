const mongoose = require('mongoose');


const db = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB connected');
    } catch (error) {
        console.log('MongoDB connection failed');
    }
}

module.exports = db;
