import { Request, Response } from 'express';
import Category from '../models/categoryModel';
import { z } from 'zod';

// Schema for validating category data
const categorySchema = z.object({
  name: z.string(),
  image: z.string().url(),
  description: z.string(),
  taxApplicability: z.boolean(),
  tax: z.number().optional(),
  taxType: z.string().optional()
});

// Partial schema for updating categories
const partialCategorySchema = categorySchema.partial();

// Controller to create a new category
export const createCategory = async (req: Request, res: Response) => {
  try {
    // Validate request body
    const parsed = categorySchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json(parsed.error.format());
    }

    // Create and save the new category
    const newCategory = new Category(parsed.data);
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};


// Controller to get all categories
export const getAllCategories = async (req: Request, res: Response) => {
  try {
    // Fetch all categories from the database
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// Controller to get a category by its ID
export const getCategoryById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Find the category by ID
    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// Controller to search a category by its name
export const getCategoryByName = async (req: Request, res: Response) => {
  try {
    const { name } = req.query;

    if (!name) {
      return res.status(400).json({ error: 'Name query parameter is required' });
    }

    const category = await Category.findOne({ name: name.toString().trim() });

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// Controller to update an existing category
export const updateCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const parsed = partialCategorySchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json(parsed.error.format());
    }

    const updatedCategory = await Category.findByIdAndUpdate(id, parsed.data, { new: true });

    if (!updatedCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// Controller to delete a category
export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedCategory = await Category.findByIdAndDelete(id);

    if (!deletedCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
