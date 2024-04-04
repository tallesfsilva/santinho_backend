
import { Request, Response } from "express";
 
import User from "@modules/User/models/Users";
import { jwtGenerate, refreshToken } from "@shared/utils/generateToken";
import { AppError } from "@shared/errors/AppError";
import { generateHash } from "@shared/utils/hashPassword";

class HomeController {
  
  async show(req: Request, res: Response): Promise<Response | undefined> {
    
    try {
      const { id } = req.user;

      const user = await User.findById(id);

      if (!user) {
        throw new AppError("Usuário não encontrado");
    }

    const data ={
      user :{
        name: user.name,
        email:user.email,
        id: user._id
      },
      msg: "Você está logado na página inicial!"
    }

    return res.json(data);

  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
  } 

  
}

export { HomeController };


