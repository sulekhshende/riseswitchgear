import mongoose from 'mongoose';
import { Password } from '../services/password';

//an interface that describes properties that
//are required to create new user
interface UserAttrs {
    email: string;
    password: string;
<<<<<<< HEAD
    username: string;
    isAdmin: boolean;
    city?: string;
    country?: string;
    address?: string;
    contactNumber?: string;
=======
>>>>>>> ede338690b4ab569aed5d400bd341eb94f5f3f83
}

//an interface that decribes properties that
//a User Model has
interface UserModel extends mongoose.Model<UserDoc> {
    build(attrs: UserAttrs) : UserDoc
}

//an interface that decribes properties that
//a User Document has
interface UserDoc extends mongoose.Document {
    email: string;
    password: string;
<<<<<<< HEAD
    username: string;
    isAdmin: boolean;
    city?: string;
    address?: string;
    country?: string;
    contactNumber?: string;
=======
>>>>>>> ede338690b4ab569aed5d400bd341eb94f5f3f83
}

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
<<<<<<< HEAD
    },
    username: {
        type: String,
        required: true
    },
    city: {
        type: String
    },
    address: {
        type: String
    },
    country: {
        type: String
    },
    contactNumber: {
        type: String
    },
    isAdmin: {
        type: Boolean,
        default: false
=======
>>>>>>> ede338690b4ab569aed5d400bd341eb94f5f3f83
    }
},{
    toJSON: {
        transform(doc, ret){
            ret.id = ret._id;
            delete ret._id;
            delete ret.password;
<<<<<<< HEAD
            delete ret.isAdmin;
=======
>>>>>>> ede338690b4ab569aed5d400bd341eb94f5f3f83
            delete ret.__v;
        }
    }
});

userSchema.pre('save', async function(done){
    if(this.isModified('password')) {
        const hashPassword = await Password.toHash(this.get('password'));
        this.set('password', hashPassword);
    }
    done();
})

userSchema.statics.build = (attrs: UserAttrs) => {
    return new User(attrs)
}

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User }