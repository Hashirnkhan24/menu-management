import express from 'express';
import mongoose from 'mongoose';
import categoryRoutes from './routes/categoryRoutes';
import subCategoryRoutes from './routes/subCategoryRoutes';
import itemRoutes from './routes/itemRoutes';
import dotenv from 'dotenv';

dotenv.config()
const app = express();

app.use(express.json());

// Route handlers
app.use('/categories', categoryRoutes);
app.use('/category/subcategories', subCategoryRoutes);
app.use('/items', itemRoutes);

const startServer = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(`${process.env.MONGODB_URI}`);
    console.log('MongoDB connected');

    // Start the server
    app.listen(process.env.PORT || 3000, () => {
      console.log('Server is running on port 3000');
    });
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1)
  }
};

startServer();
