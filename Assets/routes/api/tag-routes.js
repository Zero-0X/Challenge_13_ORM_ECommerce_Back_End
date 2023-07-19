const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tags = await Tag.product({ include: [{ model: Product }] });
    res.status(200).json(tags)
  } catch (err) {
    res.status(500).json({ message: 'not found' });
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagId = req.params.id;
    const tag = await Tag.findOne(tagId, { include: [{ model: Product }] });
    res.status(200).json(tag)
  } catch (err) {
    res.status(400).json({ message: 'Tag id not found' });
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const newTag = await Tag.create(req.body);
    res.status(200).json(newTag);
  } catch (err) {
    res.status(500).json({ message: 'failed to create category' });
  }
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  try {
    const updateTag = Tag.update(req.body, {
      where: { id: req.params.id }
    });
    res.status(200).json(updateTag);
  } catch (err) {
    res.status(404).json({ message: 'failed to find Tag by this id'})
    res.status(500), json({ message: 'failed to update category by id' });
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagId = req.params.id;
    const deleteTag = await Product.findByPk(tagId);

    if (!deleteTag) {
      return res.status(404).json({ message: 'Product not found' });
    }
    await tagId.destroy();

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete product by id' });
  }
});

module.exports = router;
