/* eslint-disable */
import decoder from "./ffmpeg/decoder.min";
import ffmpeg from "../libs/ffmpeg/ffmpeg-mp4";

const SPLIT_LINE_LENGTH = 80;
const SPLIT_LINE_CHAR = "=";

const __split_line = (str) => {
  if (str) {
    const length = SPLIT_LINE_LENGTH - str.length;
    const left = Math.ceil(length / 2);
    const ret = `${SPLIT_LINE_CHAR.repeat(left) +
      str +
      SPLIT_LINE_CHAR.repeat(length - left)}\n`;
    return ret;
  }
  return SPLIT_LINE_CHAR.repeat(SPLIT_LINE_LENGTH);
};

const log = (stdout, stderr) => {
  console.log(
    `${__split_line("STDOUT:")}${stdout.join("\n")}${__split_line(null)}`
  );
  console.log(
    `${__split_line("STDERR:")}${stderr.join("\n")}${__split_line(null)}`
  );
};

const _convert = (decoderFunc, input, debug) => {
  const stdout = [];
  const stderr = [];
  const result = decoderFunc(input, stdout, stderr);
  const output = result.MEMFS[0];
  if (debug) {
    log(stdout, stderr);
  }
  // output example:
  return new Buffer(output.data);
};

const __decoder = (args, MEMFS, stdout, stderr) =>
  decoder({
    MEMFS,
    arguments: args,
    abort(what) {
      console.error(`ARM Decoder Aborted ${what}`);
    },
    print(data) {
      stdout.push(data);
    },
    printErr(data) {
      stderr.push(data);
    },
    onExit(code) {
      stdout.push(`Return code ${code}`);
      stdout.push(__split_line("ARM DECODER EXITED."));
    },
  });

const amrToPcmDecoder = (input, stdout, stderr) =>
  __decoder(
    ["test.amr", "test.pcm"],
    [{ name: "test.amr", data: input }],
    stdout,
    stderr
  );

const __ffmpeg = (args, MEMFS, stdout, stderr) =>
  ffmpeg({
    MEMFS,
    arguments: args,
    print(data) {
      stdout.push(data);
    },
    printErr(data) {
      stderr.push(data);
    },
    onExit(code) {
      stdout.push(`Return code ${code}`);
      stdout.push(__split_line("FFMPEG EXITED."));
    },
  });

const pcmToMP3Decoder = (input, stdout, stderr) =>
  __ffmpeg(
    [
      "-y",
      "-f",
      "s16le",
      "-ar",
      "24000",
      "-ac",
      "1",
      "-i",
      "test.pcm",
      "out.mp3",
    ],
    [{ name: "test.pcm", data: input }],
    stdout,
    stderr
  );

let _debug = false;

export default {
  debug: (b) => {
    _debug = b;
  },
  convert: (input) => {
    const start = performance.now();
    const processing = _convert(amrToPcmDecoder, input, _debug);
    const between = performance.now();
    const processed = _convert(pcmToMP3Decoder, processing, _debug);
    const end = performance.now();

    return new Blob([processed], { type: "audio/mp3" });
  },
  test: () => {
    if (!_debug) {
      return;
    }

    const _ffmpeg_stdout = [];
    const _decoder_stdout = [];
    __ffmpeg(["-formats"], null, _ffmpeg_stdout, []);
    __ffmpeg(["-filters"], null, _ffmpeg_stdout, []);
    __decoder([""], null, _decoder_stdout, []);

    log(_ffmpeg_stdout, []);
    log(_decoder_stdout, []);
  },
};
