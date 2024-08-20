import { Router } from 'express';
import {
  createItem,
  getAllItems,
  getItemById,
  getItemByName,
  updateItem,
  deleteItem,
} from '../controllers/itemController';

const router = Router();

// create a new item
router.post('/', createItem);

// get all items
router.get('/', getAllItems);

// get item by name
router.get('/search', getItemByName)

// get a specific item by id 
router.get('/:id', getItemById);

// update a specific item by id
router.put('/:id', updateItem);

// delete a specific item by id
router.delete('/:id', deleteItem);

export default router;
