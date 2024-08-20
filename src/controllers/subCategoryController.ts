import { Request, Response } from 'express';
import SubCategory from '../models/subCategoryModel';
import Category from '../models/categoryModel';
import { z } from 'zod';

// Zod schema for SubCategory validation
const subCategorySchema = z.object({
  name: z.string(),
  image: z.string().url(),
  description: z.string(),
  taxApplicability: z.boolean().optional(),
  tax: z.number().optional(),
  categoryId: z.string()
});

// New SubCategory
export const createSubCategory = async (req: Request, res: Response) => {
  try {
    const parsed = subCategorySchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json(parsed.error.format());
    }

    const category = await Category.findById(parsed.data.categoryId);
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    // Set default tax applicability and tax from the category if not provided
    const taxApplicability = parsed.data.taxApplicability ?? category.taxApplicability;
    const tax = parsed.data.tax ?? category.tax;

    const newSubCategory = new SubCategory({
      ...parsed.data,
      taxApplicability,
      tax,
    });

    await newSubCategory.save();
    res.status(201).json(newSubCategory);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};

// Get all SubCategories
export const getAllSubCategories = async (req: Request, res: Response) => {
  try {
    const subCategories = await SubCategory.find();
    res.status(200).json(subCategories);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};

// Get SubCategories by Category
export const getSubCategoriesByCategory = async (req: Request, res: Response) => {
  try {
    const { categoryId } = req.params;
    const subCategories = await SubCategory.find({ categoryId });

    if (subCategories.length === 0) {
      return res.status(404).json({ message: 'No sub-categories found for this category' });
    }

    res.status(200).json(subCategories);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};

// Get a SubCategory by ID
export const getSubCategoryById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const subCategory = await SubCategory.findOne({
      $or: [{ _id: id }, { name: id }],
    });

    if (!subCategory) {
      return res.status(404).json({ message: 'Sub-category not found' });
    }

    res.status(200).json(subCategory);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};

// Get a SubCategory by Name
export const getSubCategoryByName = async (req: Request, res: Response) => {
  try {
    const { name } = req.query;

    if (!name || typeof name !== 'string') {
      return res.status(400).json({ error: 'Name query parameter is required and must be a string' });
    }

    const subCategory = await SubCategory.findOne({ name: name.trim() });

    if (!subCategory) {
      return res.status(404).json({ message: 'Sub-category not found' });
    }

    res.status(200).json(subCategory);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};

// Update a SubCategory
export const updateSubCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const parsed = subCategorySchema.partial().safeParse(req.body); // partial schema to allow partial updates
    if (!parsed.success) {
      return res.status(400).json(parsed.error.format());
    }

    const updatedSubCategory = await SubCategory.findByIdAndUpdate(id, parsed.data, { new: true });

    if (!updatedSubCategory) {
      return res.status(404).json({ message: 'Sub-category not found' });
    }

    res.status(200).json(updatedSubCategory);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};

// Delete subCategory
export const deleteSubCategoryById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Find and delete the subcategory by ID
    const result = await SubCategory.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ message: 'Sub-category not found' });
    }

    res.status(200).json({ message: 'Sub-category deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
