import bcrypt from 'bcrypt';
 

 
  const generateHash = (payload: string): Promise<string> => {
    return bcrypt.hash(payload, 8);
  }

  const compareHash = (payload: string, hashed: string): Promise<boolean> => {
    return bcrypt.compare(payload, hashed);
  }
 

export { generateHash, compareHash};