import client from "../../config/database.js";

export const createAccountModel = async (name, email, passowrd) => {
  const query = {
    text: "INSERT INTO users (name,email,password) VALUES ($1,$2,$3)",
    values: [name, email, passowrd],
  };
  const response = await client.query(query);
  return response.rowCount > 0;
};

export const getUserByEmail = async (email) => {
  const query = {
    text: "SELECT * FROM users WHERE email=$1",
    values: [email],
  };
  const response = await client.query(query);
  if (response.rowCount > 0) {
    return response.rows[0];
  } else {
    return null;
  }
};
