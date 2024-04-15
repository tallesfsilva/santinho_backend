import express, { Request, Response } from 'express';
import User, { IUser } from '@modules/User/models/Users';
import { CandidatoController } from '../controllers/Candidato.controller';
import { SantinhoController } from '../controllers/Santinho.controller';
import { createCandidatoMeddlware, updateSantinhoCandidatoMeddlware, updateandidatoMeddlware,createSantinhoCandidatoMeddlware } from './validators/candidato.validation';
import { verifyToken } from '@shared/middleware/verifyToken';


const candidatoRouter = express.Router();




const santinhoController = new SantinhoController();
const candidatoController = new CandidatoController();



candidatoRouter.get('/profile/:slug_candidato', candidatoController.candidatoProfile);
candidatoRouter.use(verifyToken)


// Cria um novo candidato
// POST /candidato
// PARAMS : interface IUCandidato

candidatoRouter.post('/', createCandidatoMeddlware, candidatoController.create);



candidatoRouter.post('/santinho/:id_candidato', createSantinhoCandidatoMeddlware, santinhoController.create);
candidatoRouter.get('/santinho/:id_candidato', santinhoController.show);
candidatoRouter.put('/santinho/:id_santinho',  updateSantinhoCandidatoMeddlware, santinhoController.update);
candidatoRouter.delete('/:id_santinho', santinhoController.delete);

// Update candidato by ID
// PUT /user/:user_id
candidatoRouter.put('/:id_candidato', updateandidatoMeddlware, candidatoController.update);

// Retorna  todos os candidatos cadastrados para o usuário logado - um usuário pode pertencer a vários candidatos
// GET /user
candidatoRouter.get('/', candidatoController.index);




// Get candidato by ID
//GET /candidato/:user_id
candidatoRouter.get('/:id_candidato',  candidatoController.show);


 //Delete candidato 
 //DELETE /user/:id_candidato
 candidatoRouter.delete('/:id_candidato', candidatoController.delete);
 

export {candidatoRouter};
