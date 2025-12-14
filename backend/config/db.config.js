const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const connectDB = async () => {
    try {
        let uri = process.env.MONGO_URI;

        // Try connecting to the provided URI first
        try {
            await mongoose.connect(uri, { serverSelectionTimeoutMS: 2000 });
            console.log(`MongoDB Connected: ${mongoose.connection.host}`);
        } catch (err) {
            console.log('Local MongoDB not found, starting in-memory instance...');
            // Try an older version which might have fewer missing DLL issues on some Windows envs
            const mongod = await MongoMemoryServer.create({
                binary: {
                    version: '5.0.14',
                },
            });
            uri = mongod.getUri();
            console.log(`In-Memory MongoDB started at ${uri}`);
            const conn = await mongoose.connect(uri);
            console.log(`MongoDB Connected (In-Memory): ${conn.connection.host}`);
        }

    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
