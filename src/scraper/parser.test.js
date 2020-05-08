const { readFileSync } = require('fs');

const { parseCourse, parseDownloadLink, filterLogsByTimeRange } = require('./parser');

const logs = require('./test-data/performance-logs.json');

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
  // eslint-disable-next-line unicorn/consistent-function-scoping
  const redact = (output) =>
    output.map((log) => ({
      ...log,
      message: '<redacted />',
      type: '<redacted />',
    }));

  it('should return 0', () => {
    const output = filterLogsByTimeRange(logs, 0, 0);

    expect(redact(output)).toMatchInlineSnapshot('Array []');
  });

  it('should return 1', () => {
    const output = filterLogsByTimeRange(logs, 1588903652429, 1588903652429);

    expect(redact(output)).toMatchInlineSnapshot(`
      Array [
        Object {
          "level": "INFO",
          "message": "<redacted />",
          "timestamp": 1588903652429,
          "type": "<redacted />",
        },
      ]
    `);
  });

  it('should include the start and end dates', () => {
    const output = filterLogsByTimeRange(logs, 1588903652429, 1588903652447);

    expect(redact(output)).toMatchInlineSnapshot(`
      Array [
        Object {
          "level": "INFO",
          "message": "<redacted />",
          "timestamp": 1588903652429,
          "type": "<redacted />",
        },
        Object {
          "level": "INFO",
          "message": "<redacted />",
          "timestamp": 1588903652441,
          "type": "<redacted />",
        },
        Object {
          "level": "INFO",
          "message": "<redacted />",
          "timestamp": 1588903652445,
          "type": "<redacted />",
        },
        Object {
          "level": "INFO",
          "message": "<redacted />",
          "timestamp": 1588903652447,
          "type": "<redacted />",
        },
      ]
    `);
  });

  it('should return 3', () => {
    const output = filterLogsByTimeRange(logs, 1588903652429 + 1, 1588903652447 - 1);

    expect(redact(output)).toMatchInlineSnapshot(`
      Array [
        Object {
          "level": "INFO",
          "message": "<redacted />",
          "timestamp": 1588903652441,
          "type": "<redacted />",
        },
        Object {
          "level": "INFO",
          "message": "<redacted />",
          "timestamp": 1588903652445,
          "type": "<redacted />",
        },
      ]
    `);
  });

  it('should return 4', () => {
    const output = filterLogsByTimeRange(logs, 0, 1588754582764 - 1);

    expect(redact(output)).toMatchInlineSnapshot('Array []');
  });
});
