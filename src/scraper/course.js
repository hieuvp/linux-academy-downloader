module.exports = async (driver) => {
  const url = process.argv[2];
  await driver.get(url);

  const source = await driver.getPageSource();
  console.log(source);
};
