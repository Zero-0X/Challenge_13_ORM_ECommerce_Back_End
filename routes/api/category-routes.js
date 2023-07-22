const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categories = await Category.findAll({ include: [{ model: Product }] });
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ message: 'not found' });
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryId = req.params.id;
    const category = await Category.findOne(categoryId, { include: [{ model: Product }] });
    res.status(200).json(category);
  } catch (err) {
    res.status(404).json({ message: 'not found' });
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const newCategory = await Category.create(req.body);
    res.status(200).json(newCategory);
  } catch (err) {
    res.status(500).json({ message: 'failed to create category' });
  }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  try {
    const updateCategory = Category.update(req.body);
    res.status(200).json(updateCategory);
  } catch (err) {
    res.status(400), json({ message: 'failed to update category by id' });
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryId = req.params.id;
    const deleteCategory = await Category.findByPk(categoryId);

    if (!deleteCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }
    await categoryId.destroy();
    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete category by id' });
  }
});

module.exports = router;
