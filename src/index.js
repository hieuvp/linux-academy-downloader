const login = require('./scraper/login');
const course = require('./scraper/course');

const main = async () => {
  await login();
  await course();
};

main();
