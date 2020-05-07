const { readFileSync } = require('fs');

const { parseCourse } = require('./parser');

describe('parseCourse', () => {
  it('should accurately return items about course AWS Essentials', () => {
    // Course: AWS Essentials
    // https://linuxacademy.com/cp/modules/view/id/241
    const html = readFileSync(`${__dirname}/test-data/course-aws-essentials.html`, 'utf8');

    expect(parseCourse(html)).toMatchSnapshot();
  });

  it('should accurately return items about course Mastering Systemd', () => {
    // Course: Mastering Systemd
    // https://linuxacademy.com/cp/modules/view/id/171
    const html = readFileSync(`${__dirname}/test-data/course-mastering-systemd.html`, 'utf8');

    expect(parseCourse(html)).toMatchSnapshot();
  });
});
