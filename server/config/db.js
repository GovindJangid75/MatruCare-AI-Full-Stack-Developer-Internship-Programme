import mongoose from 'mongoose';

/**
 * Connect to MongoDB database
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`
    ╔══════════════════════════════════════════════╗
    ║  MongoDB Connected Successfully ✓            ║
    ║  Host: ${conn.connection.host.padEnd(34)}║
    ║  Database: ${conn.connection.name.padEnd(31)}║
    ╚══════════════════════════════════════════════╝
    `);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

// MongoDB connection events
mongoose.connection.on('disconnected', () => {
  console.log('⚠️  MongoDB disconnected');
});

mongoose.connection.on('error', (err) => {
  console.error(`❌ MongoDB connection error: ${err}`);
});

export default connectDB;