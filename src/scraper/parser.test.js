const { readFileSync } = require('fs');

const { parseCourse, parseDownloadLink, filterLogsByTimeRange } = require('./parser');

const logs = require('./test-data/network-logs.json');

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

describe('parseDownloadLink', () => {
  it('should return a downloadable link to use for youtube-dl cli', () => {
    expect(parseDownloadLink(logs)).toEqual(
      'https://video-cdn.linuxacademy.com/vods3/_definst_/smil:box/cdnstore/modules/aws-essentials-new-1530821786284/03_interactivediagrams_take2_final_1540969987.smil/playlist.m3u8?1556293582',
    );
  });
});

describe('filterLogsByTimeRange', () => {
  it('should return', () => {
    expect(filterLogsByTimeRange(logs, 0, 0)).toEqual(logs);
  });
});
