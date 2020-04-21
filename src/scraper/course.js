module.exports = async (driver) => {
  const url = process.argv[2];
  await driver.get(url);
};
