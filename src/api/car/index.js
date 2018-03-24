import { Router } from 'express'
import {index, show, create, update, destroy,dealerByCar, searchByBrand,searchByEngineType, searchByAge, count, listcount, paginatedIndex} from './controller'


const router = new Router()

// Other examples - not necessary but can upgrade your mark
router.get('/search/brand/:brand', searchByBrand)
router.get('/search/enginetype/:type', searchByEngineType)
//?
router.get('/search/production/:min/:max', searchByAge)


router.get('/count', count)
router.get('/list', listcount)
router.get('/index/:limit?/:skip?', paginatedIndex)
router.get('/:id/dealer', dealerByCar)

// Start here
// Core examples - you need to have it in your project!
router.get('/', index)
router.get('/:id', show)
router.post('/', create)
router.put('/:id', update)
router.delete('/:id', destroy)


export default router