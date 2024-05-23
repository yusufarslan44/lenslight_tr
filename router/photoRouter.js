const { createPhoto, getallPhoto, getaPhoto, deletePhoto, updatePhoto } = require('../controller/photoController');

const router = require('express').Router();

router.post('/', createPhoto)
router.get('/', getallPhoto)
router.get('/:id', getaPhoto)
router.delete('/:id', deletePhoto)
router.put('/:id', updatePhoto)

module.exports = router