import { Router } from 'express'
import car from './car'
import komis from './komis'

const router = new Router()
router.use('/cars', car)
router.use('/dealers', komis)



export default router
