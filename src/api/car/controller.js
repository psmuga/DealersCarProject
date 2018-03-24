import { success, notFound } from '../../services/response/'
import Cars from './model'
import Dealers from '../komis/model'
export const index = (req, res, next) => {
    return Cars.find()
        .then((cars) => cars.map((car) => car.view()))
        .then(success(res))
        .catch(next)
}

export const show = (req, res, next) => {
    const id = req.params.id
    return Cars.findById(id).exec()
        .then((car) => car ? car.view('full') : null)
        .then(success(res))
        .catch(notFound(res))
}

export const create = (req, res, next) => {
    const body = req.body
    Cars.create(body)
        .then((car) => car.view('full'))
        .then(success(res))
        .catch(next)
}

export const update = (req, res, next) => {
    const id = req.params.id
    const body = req.body

    return Cars.findById(id)
        .then(notFound(res))
        .then((car) => car ? Object.assign(car, body).save() : null)
        .then((car) => car ? car.view('full') : null)
        .then(success(res))
        .catch(next)
}

export const destroy = (req, res, next) => {
    const id = req.params.id
    return Cars.findById(id)
        .then(notFound(res))
        .then((car) => car ? car.remove() : null)
        .then(success(res, 204))
        .catch(next)
}


// ---

export const searchByBrand = (req, res, next) => {
    const brand = req.params.brand

    Cars.findOne({ "brand" : { $regex: new RegExp(`${brand}`, 'i') } },
        function (err, car) {
            if (!car)
                return notFound(res)(car);
            success(res)(car.view())
        })
}
export const searchByEngineType = (req, res, next) => {
    const engineType = req.params.type

    Cars.findOne({ "engineType" : { $regex: new RegExp(`${engineType}`, 'i') } },
        function (err, car) {
            if (!car)
                return notFound(res)(car);
            success(res)(car.view())
        })
}


export const searchByAge = (req, res, next) => {
    const min = new Date(req.params.min)
    const max = new Date(req.params.max)

    Cars.find({
            'production' : { $lte :  max, $gte :  min},
        })
        .then((cars) => cars.map((car) => car.view('full')))
        .then(success(res))
        .catch(next)
}

export const count = (req, res, next) => {
    Cars.count({})
        .then((count) => ({count: count}))
        .then(success(res))
        .catch(next)
}

export const listcount = (req, res, next) => {
    Promise.all([
        Cars.find({})
            .then((cars) => cars.map((car) => car.view())),
        Cars.count({})
    ]).then(([list, count]) => success(res)({list: list, count: count})).catch(next)
}

export const paginatedIndex = (req, res, next) => {
    // Call it as: http://localhost:9000/api/actors/index?limit=10&skip=1
    const limit = parseInt(req.query.limit) || 1000
    const skip = parseInt(req.query.skip) || 0

    return Cars.find()
        .limit(limit)
        .skip(skip)
        .sort({production: -1})
        .then((cars) => cars.map((car) => car.view('full')))
        .then(success(res))
        .catch(next)

}

export const dealerByCar = (req, res, next) => {
    const id = req.params.id
    Cars.findById(id).exec(function(err, car){
        Dealers.find()
            .where('cars').in([car.id])
            .then((dealers) => dealers.map((dealer)=>dealer.view('list')))
            .then(success(res))
            .catch(next)
    })
}