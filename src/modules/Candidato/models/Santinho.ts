import mongoose, { DateExpression, Document, Schema } from 'mongoose';
import { StringLiteral } from 'typescript';
import { ICandidato } from '@modules/Candidato/models/Candidato';
 

export interface ISantinho extends Document {
  _id?:string;
  fundo_topo: string;
  fundo_barra_meio: string;
  text_barra_meio: string;
  fundo_rodape: string;
  logo_superior: string;
  foto_candidato: string;
  fundo_principal: string;
  active: boolean;
  candidato?: ICandidato;
  createdAt?: Date;
  updatedAt?: Date;

}

const colorValidator = (v:string) => (/^#([0-9a-f]{3}){1,2}$/i).test(v)

const santinhoSchema = new Schema({
  fundo_topo: { type: String,  validator: [colorValidator, 'Invalid color'], required: true },
  candidato: {type: Schema.Types.ObjectId, ref: 'Candidato', required: true},
  fundo_barra_meio: {type: String,  validator: [colorValidator, 'Invalid color'], required:true},
  text_barra_meio: {type: String,  validator: [colorValidator, 'Invalid color'], required:true},
  fundo_rodape: {type: String,  validator: [colorValidator, 'Invalid color'], required:true},
  logo_superior: {type: String, required:true},
  foto_candidato: {type: String, required:true},
  fundo_principal: {type: String, required:true},
  

 

},{ timestamps: true });

santinhoSchema
.virtual('url')
.get(function () {
  return '/santinho/' + this._id;
});

export default mongoose.model<ISantinho>('Santinho', santinhoSchema);