import mongoose, {Schema} from 'mongoose'
import {schema as Actor} from '../actor/model'

// http://mongoosejs.com/docs/schematypes.html
const movieSchema = new Schema({
    title: {
        type: String,
        trim: true
    },
    actors: {
        movies: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: 'Actor'
        }
    },
    production: {
        type: Number
    }
    // height: {
    //     type: Double,
    //     trim: true
    // },
    // movies: {
    //     type: String,
    //     default: 'NONE'
    // }
}, {
    timestamps: true,
    // toJSON: {
    //     virtuals: true,
    //     transform: (obj, ret) => { delete ret._id }
    // }
})


movieSchema.methods = {
    view (type = 'full') {
        const full = {
            id: this.id,
            title: this.title,
            actors: this.actors,
        }

        const list = {
            id: this.id,
            title: this.name
        }

        switch (type) {
            case 'full':
                return full
            case 'list':
                return list
        }

        return full
    }
}


const model = mongoose.model('Movie', movieSchema)

export default model.schema

