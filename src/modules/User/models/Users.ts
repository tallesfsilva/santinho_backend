import mongoose, { DateExpression, Document, Schema } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
  lastLogged?:Date,
  lastLoggout: Date
}

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: {type: String, required:true},
  lastLogged:{type: Date},
  lastLoggout:{type: Date}
 

},{ timestamps: true });

userSchema
.virtual('url')
.get(function () {
  return '/user/' + this._id;
});

export default mongoose.model<IUser>('User', userSchema);