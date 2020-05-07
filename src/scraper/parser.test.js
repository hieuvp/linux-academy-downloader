const { readFileSync } = require('fs');

const { parseCourse } = require('./parser');

describe('parseCourse', () => {
  it('should accurately return items about course AWS Essentials', () => {
<<<<<<< HEAD
    // Course: Mastering Systemd
    // https://linuxacademy.com/cp/modules/view/id/171
=======
    // Course: AWS Essentials
    // https://linuxacademy.com/cp/modules/view/id/241
>>>>>>> master
    const html = readFileSync(`${__dirname}/test-data/course-aws-essentials.html`, 'utf8');

    expect(parseCourse(html)).toMatchSnapshot();
  });

  it('should accurately return items about course Mastering Systemd', () => {
<<<<<<< HEAD
    // Course: AWS Essentials
    // https://linuxacademy.com/cp/modules/view/id/241
=======
    // Course: Mastering Systemd
    // https://linuxacademy.com/cp/modules/view/id/171
>>>>>>> master
    const html = readFileSync(`${__dirname}/test-data/course-mastering-systemd.html`, 'utf8');

    expect(parseCourse(html)).toMatchSnapshot();
  });
});
