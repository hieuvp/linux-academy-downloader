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
  it('should return a downloadable link for youtube-dl command', () => {
    expect(parseDownloadLink(logs)).toEqual(
      'https://video-cdn.linuxacademy.com/vods3/_definst_/smil:box/cdnstore/modules/aws-essentials-new-1530821786284/03_interactivediagrams_take2_final_1540969987.smil/playlist.m3u8?1556293582',
    );
  });
});

describe('filterLogsByTimeRange', () => {
  const redact = (output) =>
    output.map((log) => ({
      ...log,
      message: '<redacted />',
      type: '<redacted />',
    }));

<<<<<<< HEAD
  const start = 1588903652429;
  const end = 1588903652447;
  const minimum = 1588754582764;
=======
  const minimum = 1588754582764;
  const start = 1588903652429;
  const end = 1588903652447;
>>>>>>> master

  it('should be empty at zero-point timestamp', () => {
    const output = filterLogsByTimeRange(logs, 0, 0);
    expect(output).toBeArrayOfSize(0);
  });

<<<<<<< HEAD
  it('should return at most one element when the time given equally', () => {
    const output = filterLogsByTimeRange(logs, start, start);

    expect(output).toBeArrayOfSize(1);
=======
  it('should return at most one element when the given times are both equally', () => {
    const output = filterLogsByTimeRange(logs, start, start);
    const size = output.length;

    expect(output).toBeArray();
    expect(size).toBeLessThanOrEqual(1);

>>>>>>> master
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

<<<<<<< HEAD
  it('should include the start and end dates', () => {
=======
  it('should include start and end dates in the result', () => {
>>>>>>> master
    let output;
    let expectedSize;

    output = filterLogsByTimeRange(logs, start, end);
    expectedSize = output.length;

    expect(output).toBeArrayOfSize(expectedSize);
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

    output = filterLogsByTimeRange(logs, start + 1, end - 1);
    expectedSize -= 2;

    expect(output).toBeArrayOfSize(expectedSize);
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

  it('should be empty when there is no match', () => {
    const output = filterLogsByTimeRange(logs, 0, minimum - 1);
    expect(output).toBeArrayOfSize(0);
  });
});
