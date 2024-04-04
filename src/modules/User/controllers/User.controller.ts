
import { Request, Response } from "express";
 
import User from "@modules/User/models/Users";
import { jwtGenerate, refreshToken } from "@shared/utils/generateToken";
import { AppError } from "@shared/errors/AppError";
import { generateHash } from "@shared/utils/hashPassword";

class UserController {
  async create(req: Request, res: Response): Promise<Response | undefined> {
    try {
      const { name, email, password } = req.body;

      const user_exists = await User.find({ email: email });

      if (user_exists.length) {
        throw new AppError("Email já cadastrado");
      }


      const userInstance = new User({
        name: name,
        email: email,
        password: await generateHash(password)
      });
   
      
      const access_token = jwtGenerate(email,userInstance.id);
      const refresh_token = refreshToken(email,userInstance.id);
  

      const user = await userInstance.save();

       
      
      const data = {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,

        },
        access_token : access_token,
        refresh_token : refresh_token
      }

      return res.status(201).json(data);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async show(req: Request, res: Response): Promise<Response | undefined> {
    
    try {
    const { user_id } = req.params;

    const user = await User.findById(user_id);

    if (!user) {
      throw new AppError("Usuário não encontrado");
    }

    return res.json(user);

  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
  }

  async index(req: Request, res: Response): Promise<Response | undefined> {
    try {
      const users = await User.find();

      if(!users.length){
        throw new AppError("Nenhum usuário encontrado");
      }

      return res.json(users);
    }  catch (error : any) {
      res.status(500).json({ error: error.message });
    }
   
  }

  async update(req: Request, res: Response): Promise<Response | undefined> {
    try {
      const {name, email } = req.body;
      const {user_id} = req.params;
      const updatedUser = await User.findByIdAndUpdate(user_id, { name, email }, { new: true });
      if (!updatedUser) {
        throw new AppError("Nenhum usuário encontrado");
      }
      return res.json(updatedUser);
    }  catch (error : any) { 
      res.status(500).json({ error: error.message });
    }
  }

 
  async delete(req: Request, res: Response): Promise<Response | undefined> {
    try {
      const { user_id } = req.params;
     
      const deletedUser = await User.findByIdAndDelete(user_id);
      
      if (!deletedUser) {
        throw new AppError("Nenhum usuário encontrado");
      }
      return res.status(204).send();
    } catch (error : any) {
      res.status(500).json({ error: error.message });
    }
   
  }

  
}

export { UserController };


