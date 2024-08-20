import { Request, Response } from 'express';
import Item from '../models/itemModel';
import SubCategory from '../models/subCategoryModel';
import Category from '../models/categoryModel';
import { z } from 'zod';

// Validation schema using Zod
const itemSchema = z.object({
  name: z.string(),
  image: z.string().url(),
  description: z.string(),
  taxApplicability: z.boolean(),
  tax: z.number().optional(),
  baseAmount: z.number(),
  discount: z.number(),
  totalAmount: z.number(),
  subCategoryId: z.string().optional(),
  categoryId: z.string().optional()
});

// Create Item
export const createItem = async (req: Request, res: Response) => {
  try {
    const parsed = itemSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json(parsed.error.format());
    }

    const { subCategoryId, categoryId } = parsed.data;

    if (subCategoryId) {
      const subCategory = await SubCategory.findById(subCategoryId);
      if (!subCategory) {
        return res.status(404).json({ error: 'SubCategory not found' });
      }
    }

    if (categoryId) {
      const category = await Category.findById(categoryId);
      if (!category) {
        return res.status(404).json({ error: 'Category not found' });
      }
    }

    const newItem = new Item(parsed.data);
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// Get all items
export const getAllItems = async (req: Request, res: Response) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// Get item by ID
export const getItemById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const item = await Item.findOne({
      $or: [{ _id: id }, { name: id }]
    });

    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }

    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// Get item by name
export const getItemByName = async (req: Request, res: Response) => {
  try {
    const { name } = req.query;

    if (!name || typeof name !== 'string') {
      return res.status(400).json({ error: 'Name query parameter is required and must be a string' });
    }

    const item = await Item.findOne({ name: name.trim() });

    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }

    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// Update item by ID
export const updateItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const parsed = itemSchema.partial().safeParse(req.body); // Allow partial updates
    if (!parsed.success) {
      return res.status(400).json(parsed.error.format());
    }

    const updatedItem = await Item.findByIdAndUpdate(id, parsed.data, { new: true });
    if (!updatedItem) {
      return res.status(404).json({ error: 'Item not found' });
    }

    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// Delete item by ID
export const deleteItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedItem = await Item.findByIdAndDelete(id);
    if (!deletedItem) {
      return res.status(404).json({ error: 'Item not found' });
    }

    res.status(200).json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
