import { Router } from 'express';
import { 
  createSubCategory, 
  getAllSubCategories, 
  getSubCategoriesByCategory, 
  getSubCategoryById,
  getSubCategoryByName, 
  updateSubCategory,
  deleteSubCategoryById
} from '../controllers/subCategoryController';

const router = Router();

// create a new sub-category
router.post('/', createSubCategory);

// get all sub-categories
router.get('/', getAllSubCategories);

// get all sub categories under a category
router.get('/:categoryId/subcategories', getSubCategoriesByCategory);

// get a sub category by name
router.get('/search', getSubCategoryByName)

// get a sub-category by id
router.get('/:id', getSubCategoryById);

// update a sub-category by id
router.put('/:id', updateSubCategory);

// delete a subCategory by id
router.delete('/:id', deleteSubCategoryById);

export default router;
