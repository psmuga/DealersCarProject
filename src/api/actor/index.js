import { Router } from 'express'
import {index, show, create, update, destroy, searchByName, searchByHeight, searchByBirthday, count, listcount, paginatedIndex} from './controller'


const router = new Router()

// Other examples - not necessary but can upgrade your mark
router.get('/search/name/:name', searchByName)
router.get('/search/height/:min/:max', searchByHeight)
router.get('/search/birthday/:min/:max', searchByBirthday)
router.get('/count', count)
router.get('/list', listcount)
router.get('/index/:limit?/:skip?', paginatedIndex)

// Start here
// Core examples - you need to have it in your project!
router.get('/', index)
router.get('/:id', show)
router.post('/', create)
router.put('/:id', update)
router.delete('/:id', destroy)


export default router