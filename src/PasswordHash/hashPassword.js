import { hash } from "bcrypt";
export const passwordHash = async (password) => {
  try {
    const hashedPassword = await hash(password, 10);
    return hashedPassword;
  } catch (err) {
    return null;
  }
};
