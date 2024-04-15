import mongoose, { DateExpression, Document, Schema } from 'mongoose';
import { StringLiteral } from 'typescript';
import { IUser } from '@modules/User/models/Users';
 

export interface ICandidato extends Document {
  nome_campanha: string;
  user: IUser;
  _id?: string;
  numero: string;
  slug_candidato: string;
  nomeclatura: string;
  partido: string;
  numero_celular: string;
  nome_coligacao: string;
  coligacao_partido: string;
  apresentacao_candidato: string;
  link_perfil_facebook?: string;
  link_perfil_instagram?: string;
  link_perfil_youtube?: string; 
  createdAt?: Date;
  updatedAt?: Date;
}

const candidatoSchema = new Schema({
  nome_campanha: { type: String, required: true },
  user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
  slug_candidato: { type: String, required: true },
  numero: {type: String, required:true},
  nomeclatura: {type: String, required:true},
  partido: {type: String, required:true},
  numero_celular: {type: String, required:true},
  nome_coligacao: {type: String, required:true},
  apresentacao_candidato: {type: String, required:true},
  link_perfil_facebook: {type: String, required:false},
  link_perfil_instagram: {type: String, required:false},
  link_perfil_youtube: {type: String, required:false},

 

},{ timestamps: true });

candidatoSchema
.virtual('url')
.get(function () {
  return '/candidato/' + this._id;
});

export default mongoose.model<ICandidato>('Candidato', candidatoSchema);