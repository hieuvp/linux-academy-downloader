const fs = require('fs');

const { parseCourse } = require('./parser');

describe('parseCourse', () => {
  it('should return', () => {
    const html = fs.readFileSync(
      `${__dirname}/test-data/course-mastering-systemd.html`,
      'utf8',
    );
    expect(parseCourse(html)).toMatchSnapshot();
  });

  it('should accurately return items about course AWS Essentials', () => {});

  it('should accurately return items about course Mastering Systemd', () => {});
});
