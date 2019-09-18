module.exports = {
  hrPool: {
    user: "admin",
    password: process.env.NODE_ORACLEDB_PASSWORD,
    connectString: "db201909100942_high",
    poolMin: 10,
    poolMax: 10,
    poolIncrement: 0
  }
};
