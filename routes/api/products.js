const router = require('express').Router();
const productController = require('../../controllers/product-crud-controllers');

router.get('/all', productController.all);
router.post('/create', productController.create);
router.get('/find/:id', productController.findById);
router.put('/update/:id', productController.update);
router.delete('/delete/:id', productController.delete);

module.exports = router;
