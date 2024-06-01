import { WebAVPacket, WebAVStream } from "./types";

let Module: any; // TODO: rm any

self.postMessage({
  type: "FFmpegWorkerLoaded",
});

self.addEventListener("message", async function (e) {
  const { type, data = {}, msgId } = e.data;

  try {
    if (type === "LoadWASM") {
      const { wasmLoaderPath } = data || {}

      const ModuleLoader = await import(/* @vite-ignore */wasmLoaderPath);
      Module = await ModuleLoader.default();
    } else if (type === "GetAVStream") {
      const {
        file,
        streamType,
        streamIndex,
      } = data;
      const result = Module.getAVStream(file, streamType, streamIndex);

      self.postMessage(
        {
          type,
          msgId,
          result,
        },
        [result.codecpar.extradata.buffer],
      );
    } else if (type === 'GetAVStreams') {
     const {
        file,
      } = data;
      const result = Module.getAVStreams(file);

      self.postMessage(
        {
          type,
          msgId,
          result,
        },
        result.map((stream: WebAVStream) => stream.codecpar.extradata.buffer)
      );

    } else if (type === "GetAVPacket") {
      const {
        file,
        timestamp,
        streamType,
        streamIndex,
      } = data;
      const result = Module.getAVPacket(
        file,
        timestamp,
        streamType,
        streamIndex,
      );

      self.postMessage(
        {
          type,
          msgId,
          result,
        },
        [result.data.buffer],
      );
    } else if (type === 'GetAVPackets') {
      const {
        file,
        timestamp,
      } = data;
      const result = Module.getAVPackets(file, timestamp);

      self.postMessage(
        {
          type,
          msgId,
          result,
        },
        result.map((packet: WebAVPacket) => packet.data.buffer),
      );
    } else if (type === "ReadAVPacket") {
      const {
        file,
        start,
        end,
        streamType,
        streamIndex,
      } = data;
      const result = Module.readAVPacket(
        msgId,
        file,
        start,
        end,
        streamType,
        streamIndex,
      );

      self.postMessage({
        type,
        msgId,
        result,
      });
    }
  } catch (e) {
    self.postMessage({
      type,
      msgId,
      errMsg: e instanceof Error ? e.message : "Unknown Error",
    });
  }
});
