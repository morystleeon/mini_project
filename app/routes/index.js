let express = require('express')

let authController = require('../controllers/authController')
let merchantController = require('../controllers/merchantController')
let productController =  require('../controllers/productController')
let authMiddleware =  require('../middlewares/authMiddleware')

let router = express.Router()

router.post('/login',authController.login)

router.get('/merchant',authMiddleware.isAuthenticate,merchantController.getMerchant)
router.get('/merchant/:id',authMiddleware.isAuthenticate,merchantController.getMerchantById)
router.post('/merchant',merchantController.createMerchant)
router.put('/merchant/:id',authMiddleware.isAuthenticate,merchantController.updateMerchant)
router.delete('/merchant/:id',authMiddleware.isAuthenticate,merchantController.deleteMerchant)

router.get('/product',authMiddleware.isAuthenticate,productController.getProduct)
router.get('/product/:id',authMiddleware.isAuthenticate,productController.getProductById)
router.post('/product',productController.createProduct)
router.put('/product/:id',authMiddleware.isAuthenticate,productController.updateProduct)
router.delete('/product/:id',authMiddleware.isAuthenticate,productController.deleteProduct)

module.exports = router
