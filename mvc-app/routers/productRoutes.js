/**
 * Product Routes
 * 
 * User Routes ile aynı pattern'i takip eder.
 */

import express from 'express'
import * as productController from '../controllers/productController.js'

const router = express.Router()

// RESTful Routes
router.get('/', productController.index)
router.get('/create', productController.create)
router.get('/:id', productController.show)
router.get('/:id/edit', productController.edit)
router.post('/', productController.store)
router.put('/:id', productController.update)
router.delete('/:id', productController.destroy)

export default router

