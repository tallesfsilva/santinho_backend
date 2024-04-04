
import { Request, Response } from "express";
 
import User from "@modules/User/models/Users";
import { jwtGenerate, refreshToken } from "@shared/utils/generateToken";
import { AppError } from "@shared/errors/AppError";
import { compareHash } from "@shared/utils/hashPassword";
 

class SessionController {
  async create(req: Request, res: Response): Promise<Response | undefined> {
    try {
      const { email, password} = req.body;

      const user_exists = await User.find({ email: email });

      if (!user_exists.length) {
        throw new AppError("Usuário não encontrado");
      }

      const checkPassword = await compareHash(password, user_exists[0].password);

      if(!checkPassword){
         return res.status(400).json({success: false, msg: "Senha inválida!"});
      }
    
  
      const access_token = jwtGenerate(email,user_exists[0]._id);
      const refresh_token = refreshToken(email,user_exists[0]._id);

      user_exists[0].lastLogged = new Date();
     
      
      const data = {
        user: {
          id: user_exists[0]._id,
          name: user_exists[0].name,
          email: user_exists[0].email,

        },
        access_token : access_token,
        refresh_token : refresh_token
      }

      return res.status(201).json(data);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }  

  async destroy(req: Request, res: Response): Promise<Response | undefined> {
    try {
      const { user_id } = req.params;

      const user_exists = await User.findById(user_id);

      if (!user_exists) {
        throw new AppError("Usuário não encontrado");
      }

      user_exists.lastLoggout = new Date();
  

     
       
      return res.status(201);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  } 
}

export { SessionController };


