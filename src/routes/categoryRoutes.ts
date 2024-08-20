import { Router } from 'express';
import { createCategory, getAllCategories, getCategoryById, getCategoryByName, updateCategory, deleteCategory } from '../controllers/categoryController';

const router = Router();

// create new category
router.post('/', createCategory);

// get all categories
router.get('/', getAllCategories);

// search category by name
router.get('/search', getCategoryByName); 

// get category by id
router.get('/:id', getCategoryById); 

// update a category
router.put('/:id', updateCategory);

// delete a category
router.delete('/:id', deleteCategory);

export default router;
