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

router.post('/', (req, res) => {
  // create a new tag
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
