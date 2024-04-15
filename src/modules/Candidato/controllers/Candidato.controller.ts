
import { Request, Response } from "express";
 
import User from "@modules/User/models/Users";
import Candidato from "@modules/Candidato/models/Candidato";
var QRCode = require('qrcode')
import { AppError } from "@shared/errors/AppError";
import Santinho from "../models/Santinho";
 

class CandidatoController {
  async create(req: Request, res: Response): Promise<Response | undefined> {
    try {
      const {   
        nome_campanha,
        numero,
        nomeclatura,
        partido,
        slug_candidato,
        numero_celular,
        nome_coligacao,
        coligacao_partido,
        apresentacao_candidato,
        link_perfil_facebook,
        link_perfil_instagram,
        link_perfil_youtube } = req.body;

       
        const {id} = req.user;
   

      const user_exists = await User.findById(id);

      if (!user_exists) {
        throw new AppError("Usuário não existe");
      }


      const candidatoInstance = new Candidato({
        nome_campanha: nome_campanha,
        numero: numero,
        user: user_exists,
        slug_candidato: slug_candidato,
        nomeclatura: nomeclatura,
        partido: partido,
        numero_celular: numero_celular,
        nome_coligacao: nome_coligacao,
        coligacao_partido: coligacao_partido,
        apresentacao_candidato: apresentacao_candidato,
        link_perfil_facebook: link_perfil_facebook,
        link_perfil_instagram: link_perfil_instagram,
        link_perfil_youtube: link_perfil_youtube
      });
   

      

      const candidato = await candidatoInstance.save();

     

      return res.status(201).json(candidato);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async show(req: Request, res: Response): Promise<Response | undefined> {
    
    try {
    const { id_candidato } = req.params;

    const candidato = await Candidato.findById(id_candidato);

    if (!candidato) {
      throw new AppError("Usuário não encontrado");
    }

    return res.json(candidato);

  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
  }

  async index(req: Request, res: Response): Promise<Response | undefined> {
    try {

      const {id} = req.user;

      const candidatos = await Candidato.find({user : id});

      if(!candidatos.length){
        throw new AppError("Nenhum usuário encontrado");
      }

      return res.json(candidatos);
    }  catch (error : any) {
      res.status(500).json({ error: error.message });
    }
   
  }



  async candidatoProfile(req: Request, res: Response): Promise<Response | undefined> {


    try {

      const {slug_candidato} = req.params;

      const candidato = await Candidato.find({slug_candidato : slug_candidato});

      if(!candidato.length){
        throw new AppError("Nenhum candidato encontrado");
      }

      const santinhosCandidatos = await Santinho.find({candidato : candidato[0]._id});

      QRCode.toDataURL('I am a pony!', function (err:any, url:String) {
        console.log(url)
      })

      const data = {
        profile :{
          candidato: candidato,
          santinhos: santinhosCandidatos
        }
     
      }

      return res.json(data);
    }  catch (error : any) {
      res.status(500).json({ error: error.message });
    }




  }

  async update(req: Request, res: Response): Promise<Response | undefined> {
    
      try {
        const {   
          nome_campanha,
       
          numero,
          nomeclatura,
          slug_candidato,
          partido,
          numero_celular,
          nome_coligacao,
          coligacao_partido,
          apresentacao_candidato,
          link_perfil_facebook,
          link_perfil_instagram,
          link_perfil_youtube } = req.body;
          
          const {id_candidato} = req.params;
         
          const {id} = req.user;
     
  
          const user_exists = await User.findById(id);

    
  
        if (!user_exists) {
          throw new AppError("Usuário não existe");
        };


 
  
        const candidatoInstance = new Candidato({
          _id: id_candidato,
          nome_campanha: nome_campanha,
          numero: numero,
          user: user_exists,
          nomeclatura: nomeclatura,
          slug_candidato: slug_candidato,
          partido: partido,
          numero_celular: numero_celular,
          nome_coligacao: nome_coligacao,
          coligacao_partido: coligacao_partido,
          apresentacao_candidato: apresentacao_candidato,
          link_perfil_facebook: link_perfil_facebook,
          link_perfil_instagram: link_perfil_instagram,
          link_perfil_youtube: link_perfil_youtube
        });
     
        
        
      
        const updateCandidato = await Candidato.findByIdAndUpdate(id_candidato, candidatoInstance, {new : true});
  
        if(!updateCandidato){
          throw new AppError("Ocorreu um erro ao atualizar o candidato");
        }
  
        return res.status(201).json(updateCandidato);
      } catch (error: any) {
        res.status(500).json({ error: error.message });
      }
 

}
async delete(req: Request, res: Response): Promise<Response | undefined> {
  try {
    const { id_candidato } = req.params;
   
    const deletedCandidato= await Candidato.findByIdAndDelete(id_candidato);
    
    if (!deletedCandidato) {
      throw new AppError("Nenhum usuário encontrado");
    }
    return res.status(204).send();
  } catch (error : any) {
    res.status(500).json({ error: error.message });
  }
 
}


  
}

export { CandidatoController };


