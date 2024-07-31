const { createClient } = require("@supabase/supabase-js");
const jsonwebtoken = require("jsonwebtoken");
const argon = require("argon2");
const { TABLE_USER } = require("../data/db-info");

require("dotenv").config();

const supabase = createClient(
  process.env.SUPABASE_CLIENT,
  process.env.SUPABASE_KEY
);

const getJWTToken = ({ email }) => {
  const jwtToken = jsonwebtoken.sign(
    {
      email,
    },
    process.env.KEY_AUTH_JWT
  );

  return jwtToken;
};

const checkUserIsRegistered = async ({ email }) => {
  const { data, error } = await supabase
    .from(TABLE_USER)
    .select("*")
    .eq(`email`, email);

  if (error) throw new Error(`Error when check user is exist or not`);
  if (data.length === 0) throw new Error(`user with email: ${email} not found`);
  return data[0];
};

const checkPassword = async ({ password, passwordFromDb }) => {
  const authStatus = await argon.verify(passwordFromDb, password);

  return authStatus;
};

module.exports = {
  getJWTToken,
  checkUserIsRegistered,
  checkPassword,
};
