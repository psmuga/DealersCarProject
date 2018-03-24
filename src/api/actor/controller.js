import { success, notFound } from '../../services/response/'
import Actors from './model'

export const index = (req, res, next) => {
    return Actors.find()
        .then((actors) => actors.map((actor) => actor.view()))
        .then(success(res))
        .catch(next)
}

export const show = (req, res, next) => {
    const id = req.params.id
    return Actors.findById(id).exec()
        .then((actor) => actor ? actor.view('full') : null)
        .then(success(res))
        .catch(notFound(res))
}

export const create = (req, res, next) => {
    const body = req.body
    Actors.create(body)
        .then((actor) => actor.view('full'))
        .then(success(res))
        .catch(next)
}

export const update = (req, res, next) => {
    const id = req.params.id
    const body = req.body

    return Actors.findById(id)
        .then(notFound(res))
        .then((actor) => actor ? Object.assign(actor, body).save() : null)
        .then((actor) => actor ? actor.view('full') : null)
        .then(success(res))
        .catch(next)
}

export const destroy = (req, res, next) => {
    const id = req.params.id
    return Actors.findById(id)
        .then(notFound(res))
        .then((actor) => actor ? actor.remove() : null)
        .then(success(res, 204))
        .catch(next)
}


// ---

export const searchByName = (req, res, next) => {
    const name = req.params.name

    Actors.findOne({ "name" : { $regex: new RegExp(`${name}`, 'i') } },
        function (err, actor) {
            if (!actor)
                return notFound(res)(actor);
            success(res)(actor.view())
        })
}

export const searchByHeight = (req, res, next) => {
    const min = req.params.min
    const max = req.params.max

    Actors.find({
            'height' : { $lte :  max, $gte :  min},
            },
        function (err, actor) {
            if (!actor)
                return notFound(res)(actor);
            success(res)(actor)
        })
}


export const searchByBirthday = (req, res, next) => {
    const min = new Date(req.params.min)
    const max = new Date(req.params.max)

    Actors.find({
            'birthday' : { $lte :  max, $gte :  min},
        })
        .then((actors) => actors.map((actor) => actor.view('full')))
        .then(success(res))
        .catch(next)
}

export const count = (req, res, next) => {
    Actors.count({})
        .then((count) => ({count: count}))
        .then(success(res))
        .catch(next)
}

export const listcount = (req, res, next) => {
    Promise.all([
        Actors.find({})
            .then((actors) => actors.map((actor) => actor.view())),
        Actors.count({})
    ]).then(([list, count]) => success(res)({list: list, count: count})).catch(next)
}

export const paginatedIndex = (req, res, next) => {
    // Call it as: http://localhost:9000/api/actors/index?limit=10&skip=1
    const limit = parseInt(req.query.limit) || 1000
    const skip = parseInt(req.query.skip) || 0

    return Actors.find()
        .limit(limit)
        .skip(skip)
        .sort({birthday: -1})
        .then((actors) => actors.map((actor) => actor.view('full')))
        .then(success(res))
        .catch(next)

}