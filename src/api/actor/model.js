import mongoose, {Schema} from 'mongoose'

// http://mongoosejs.com/docs/schematypes.html
const actorSchema = new Schema({
    name: {
        type: String,
        trim: true
    },
    birthday: {
        type: Date,
        trim: true
    },
    height: {
        type: Number,
        trim: true
    },
    movies: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Movie'
    }
}, {
    timestamps: true,
    // toJSON: {
    //     virtuals: true,
    //     transform: (obj, ret) => { delete ret._id }
    // }
})


actorSchema.methods = {
    view (type = 'list') {

        switch (type) {
            case 'list':
                // simple view
                return {
                    id: this.id,
                    name: this.name
                }
            default:
                // full view
                return {
                    id: this.id,
                    name: this.name,
                    birthday: this.birthday,
                    height: this.height
                }
        }
    }
}


const model = mongoose.model('Actor', actorSchema)
export const schema = model.schema
export default model


