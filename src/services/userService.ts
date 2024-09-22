import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/userModel.js';

const JWT_SECRET = process.env.JWT_SECRET || 'jwt_secret';

export const registerUser = async (username: string, email: string, password: string): Promise<IUser | null> => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('Usuário já existe');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  return newUser.save();
};

export const loginUser = async (email: string, password: string): Promise<string | null> => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Usuário não encontrado');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Senha inválida');
  }

  const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
  return token;
};

export const findUserByToken = async (token: string): Promise<IUser | null> => {
  try {
    const clearedToken = token.replace('Bearer ', '');
    const { id } = jwt.verify(clearedToken, JWT_SECRET) as any;
    return User.findById(id);
  } catch (error) {
    throw new Error('Usuário não encontrado');
  }
}

export const findUserById = async (id: string): Promise<IUser | null> => {
  try {
    return User.findById(id);
  } catch (error) {
    throw new Error('Usuário não encontrado');
  }
}

export const verifyToken = (token: string): any => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw new Error('Token inválido');
  }
};
