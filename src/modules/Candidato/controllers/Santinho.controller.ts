
import { Request, Response } from "express";
 
import User from "@modules/User/models/Users";
import Candidato from "@modules/Candidato/models/Candidato";
import Santinho from "@modules/Candidato/models/Santinho";
 
import { AppError } from "@shared/errors/AppError";
 

class SantinhoController {
  async create(req: Request, res: Response): Promise<Response | undefined> {
    try {
      const {   
        fundo_topo,
        fundo_barra_meio,
        text_barra_meio,
        fundo_rodape,
        logo_superior,
        foto_candidato,
        fundo_principal,
    
             } = req.body;
     
        const {id_candidato} = req.params;

      const candidato_exits = await Candidato.findById(id_candidato);

      if (!candidato_exits) {
        throw new AppError("Candidato não existe");
      }


      const santinhoInstance = new Santinho({
        fundo_topo:fundo_topo,
        fundo_barra_meio:fundo_barra_meio,
        text_barra_meio:text_barra_meio,
        fundo_rodape:fundo_rodape,
        logo_superior:logo_superior,
        foto_candidato:foto_candidato,
        fundo_principal:fundo_principal,
        candidato: candidato_exits
      });
   

      

        const santinho = await santinhoInstance.save();

     

      return res.status(201).json(santinho);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async show(req: Request, res: Response): Promise<Response | undefined> {
    try {

      const {id_candidato} = req.params;

     
      
      const candidato = await Candidato.findById(id_candidato);
       
      if(!candidato){
        throw new AppError("Nenhum candidato encontrado!");
      }

      const santinhosCandidatos = await Santinho.find({candidato : candidato._id});

      if(!santinhosCandidatos.length){
        throw new AppError("Nenhum santinho encontrado para o candidato informado");
      }

      return res.json(santinhosCandidatos);
    }  catch (error : any) {
      res.status(500).json({ error: error.message });
    }
   
  }

  async update(req: Request, res: Response): Promise<Response | undefined> {
    try {
        const {   
          fundo_topo,
          fundo_barra_meio,
          text_barra_meio,
          fundo_rodape,
          logo_superior,
          foto_candidato,
          fundo_principal,
         } = req.body;

        const id_santinho = req.params

  
        const santinhoInstance = new Santinho({
          fundo_topo:fundo_topo,
          fundo_barra_meio:fundo_barra_meio,
          text_barra_meio:text_barra_meio,
          fundo_rodape:fundo_rodape,
          logo_superior:logo_superior,
          foto_candidato:foto_candidato,
          fundo_principal:fundo_principal,
          id_: id_santinho
        });
     
  
        
  
        const santinhoObjUpdate = await Santinho.findByIdAndUpdate(id_santinho, santinhoInstance,{new : true});
  
       if(!santinhoObjUpdate){
        throw new AppError("Ocorreu um erro ao atualizar o santinho!");
       }
  
        return res.status(201).json(santinhoObjUpdate);
      } catch (error: any) {
        res.status(500).json({ error: error.message });
      }
 

}
async delete(req: Request, res: Response): Promise<Response | undefined> {
  try {
    const { id_santinho } = req.params;
   
    const deletedSantinho= await Santinho.findByIdAndDelete(id_santinho);
    
    if (!deletedSantinho) {
      throw new AppError("Ocorreu um erro ao excluir o santinho");
    }
    return res.status(204).send();
  } catch (error : any) {
    res.status(500).json({ error: error.message });
  }
 
}


  
}

export { SantinhoController };


