import { success, notFound } from '../../services/response/'
import Dealers from './model'

const populateOpt = {
    path: 'cars',
    model: 'Car',
    select: 'id brand model'
}

export const index = (req, res, next) => {
    return Dealers.find()
        .then((dealers) => dealers.map((dealer) => dealer.view()))
        .then(success(res))
        .catch(next)
}

export const show = (req, res, next) => {
    const id = req.params.id
    return Dealers.findById(id)
        .populate(populateOpt)
        .then((dealer) => dealer ? dealer.view('full') : null)
        .then(success(res))
        .catch(notFound(res))
}

export const create = (req, res, next) => {
    const body = req.body
    Dealers.create(body)
        .then((dealer) => Dealers.populate(dealer,populateOpt))
        .then((dealer) => dealer.view('full'))
        .then(success(res))
        .catch(next)
}

export const update = (req, res, next) => {
    const id = req.params.id
    const body = req.body

    return Dealers.findById(id)
        .then(notFound(res))
        .then((dealer) => dealer ? Object.assign(dealer, body).save() : null)
        .then((dealer) => dealer ? dealer.view('full') : null)
        .then(success(res))
        .catch(next)
}

export const destroy = (req, res, next) => {
    const id = req.params.id
    return Dealers.findById(id)
        .then(notFound(res))
        .then((dealer) => dealer ? dealer.remove() : null)
        .then(success(res, 204))
        .catch(next)
}


// ---

export const searchByName = (req, res, next) => {
    const name = req.params.name

    Dealers.findOne({ "name" : { $regex: new RegExp(`${name}`, 'i') } },
        function (err, actor) {
            if (!actor)
                return notFound(res)(actor);
            success(res)(actor.view())
        })
}



export const count = (req, res, next) => {
    Dealers.count({})
        .then((count) => ({count: count}))
        .then(success(res))
        .catch(next)
}

export const listcount = (req, res, next) => {
    Promise.all([
        Dealers.find({})
            .then((dealers) => dealers.map((dealer) => dealer.view())),
        Dealers.count({})
    ]).then(([list, count]) => success(res)({list: list, count: count})).catch(next)
}

export const paginatedIndex = (req, res, next) => {
    // Call it as: http://localhost:9000/api/actors/index?limit=10&skip=1
    const limit = parseInt(req.query.limit) || 1000
    const skip = parseInt(req.query.skip) || 0

    return Dealers.find()
        .limit(limit)
        .skip(skip)
        .sort(name)
        .then((dealers) => dealers.map((dealer) => dealer.view('full')))
        .then(success(res))
        .catch(next)

}

