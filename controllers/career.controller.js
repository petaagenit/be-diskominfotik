const { getCareerFromTable } = require("../utils/register.util");

const getAllCareer = async (req, res) => {
  try {
    const data = await getCareerFromTable();
    res.status(200).json({
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { getAllCareer };
