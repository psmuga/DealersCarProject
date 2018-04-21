import mongoose, {Schema} from 'mongoose'

// http://mongoosejs.com/docs/schematypes.html
const carSchema = new Schema({
    model: {
        type: String,
        trim: true
    },
    brand: {
        type: String,
        trim: true
    },
    vim: {
        type: Number,
        trim: true
    },
    production: {
        type: Date,
        trim: true
    },
    engineType: {
        type: String,
        trim: true
    },
    engineCapacity: {
        type: Number,
        trim: true
    },
    seats: {
        type: Number,
        trim: true
    },
    cost: {
        type: Number,
        trim: true
    }
}, {
    timestamps: true,
    // toJSON: {
    //     virtuals: true,
    //     transform: (obj, ret) => { delete ret._id }
    // }
})


carSchema.methods = {
    view (type = 'list') {

        switch (type) {
            case 'list':
                // simple view
                return {
                    id: this.id,
                    brand: this.brand,
                    model: this.model,
                    cost: this.cost             
                }
            default:
                // full view
                return {
                    id: this.id,
                    brand: this.brand,
                    model: this.model,
                    vim: this.vim,
                    production: this.production,
                    engineType: this.engineType,
                    engineCapacity: this.engineCapacity,
                    seats: this.seats,
                    cost: this.cost
                }
        }
    }
}


const model = mongoose.model('Car', carSchema)
export const schema = model.schema
export default model


