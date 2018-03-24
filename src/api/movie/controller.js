import { success, notFound } from '../../services/response/'

export const index = (req, res, next) => {
    success(res, 201)({ok: 1})
}