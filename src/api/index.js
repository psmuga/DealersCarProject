import { Router } from 'express'
import car from './car'
import komis from './komis'
import user from './user'
import auth from './auth'

const router = new Router()
router.use('/cars', car)
router.use('/dealers', komis)

router.use('/user',user)
router.use('/auth',auth)

export default router
