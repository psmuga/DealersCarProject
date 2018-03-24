import mongoose, {Schema} from 'mongoose'

// http://mongoosejs.com/docs/schematypes.html
const dealerSchema = new Schema({
    name: {
        type: String,
        trim: true
    },
    owner: {
        type: String,
        trim: true
    },
    cars: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Car'
    }
}, {
    timestamps: true,
    // toJSON: {
    //     virtuals: true,
    //     transform: (obj, ret) => { delete ret._id }
    // }
})


dealerSchema.methods = {
    view (type = 'list') {
        const full = {
            id: this.id,
            name: this.name,
            owner: this.owner,
            cars: this.cars
        }
        const list = {
            id: this.id,
            name: this.name
        }
        switch (type) {
            case 'list':
                return list;
            case 'full':
                return full;
            
        }
    }
}


const model = mongoose.model('Dealer', dealerSchema)
export const schema = model.schema
export default model


