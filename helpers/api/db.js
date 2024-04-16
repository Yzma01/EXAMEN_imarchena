import getConfig from 'next/config';
import mongoose from 'mongoose';

const { serverRuntimeConfig } = getConfig();
const Schema = mongoose.Schema;

mongoose.connect(process.env.MONGODB_URI || serverRuntimeConfig.connectionString);
mongoose.Promise = global.Promise;

export const db = {
    User: userModel(),
    ScheduleDate: dateModel()
};
const validRoles = ['admin', 'worker'];
const validStatus = ['pendiente', 'completada', 'cancelada'];

// mongoose models with schema definitionsd

function userModel() {
    const schema = new Schema({
        name: { type: String, require: true },
        userId: { type: String, require: true },
        lastName: { type: String, required: true },
        email: { type: String, require: true },
        username: { type: String, unique: true, required: true },
        password: { type: String, required: true },
        rol: {
            type: String,
            require: true,
            validate: {
                validator: function (value) {
                    return validRoles.includes(value);
                },
                message: props => `${props.value} no es un rol válido. Los roles válidos son: ${validRoles.join(', ')}.`
            }
        },
    }, {
        // add createdAt and updatedAt timestamps
        timestamps: true
    });

    schema.set('toJSON', {
        virtuals: true,
        versionKey: false,
        transform: function (doc, ret) {
            delete ret._id;
            delete ret.password;
        }
    });

    return mongoose.models.User || mongoose.model('User', schema);
}

function dateModel() {
    const schema = new Schema({
        date: { type: Date, require: true },
        hour: {type: Number, require: true, min: 7, max: 20},
        username: { type: String, require: true },
        userId: { type: String, require: true },
        description: { type: String, require: true },
        state: { type: String, require: true, validate:{
            validator: function (value){
                return validStatus.includes(value);
            },
            message: props => `${props.value} no es un estado válido. Los estaods válidos son: ${validStatus.join(', ')}.`
        }}
    }, {
        timestamps: true
    });

    schema.set('toJSON', {
        virtuals: true,
        versionKey: false,
        transform: function (doc, ret) {
            delete ret._id;
        }
    })

    return mongoose.models.ScheduleDate || mongoose.model('ScheduleDate', schema);
}