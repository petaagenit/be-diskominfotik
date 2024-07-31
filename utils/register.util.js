const { createClient } = require("@supabase/supabase-js");
const argon = require("argon2");
const { TABLE_USER } = require("../data/db-info");

require("dotenv").config();
const supabase = createClient(
  process.env.SUPABASE_CLIENT,
  process.env.SUPABASE_KEY
);

const hashingWithArgon = async ({ password }) => {
  try {
    return await argon.hash(password);
  } catch (error) {
    throw new Error("Cannot hash the password");
  }
};

const getCareerFromTable = async () => {
  const { data, error } = await supabase
    .from("career")
    .select("*,job-details(*)");

  if (error) throw new Error(`Cannot get data career`);

  return data;
};

const checkUserIsExist = async ({ email }) => {
  const { data, error } = await supabase
    .from(TABLE_USER)
    .select("*")
    .eq(`email`, email);

  if (error) throw new Error(`Error when check user is exist or not`);
  if (data.length > 0)
    throw new Error(`user with email: ${email} is registered`);
};

const postRegisterData = async ({ username, email, password }) => {
  const { error } = await supabase
    .from(TABLE_USER)
    .insert({ username, email, password });
  if (error) throw new Error(`Cannot post data register`);
};

module.exports = {
  getCareerFromTable,
  hashingWithArgon,
  checkUserIsExist,
  postRegisterData,
};
