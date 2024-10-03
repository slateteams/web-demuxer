import { AVLogLevel, AVMediaType, AVSeekFlag } from "./avutil";

export enum FFMpegWorkerMessageType {
  FFmpegWorkerLoaded = "FFmpegWorkerLoaded",
  WASMRuntimeInitialized = "WASMRuntimeInitialized",
  LoadWASM = "LoadWASM",
  GetAVPacket = "GetAVPacket",
  GetAVPackets = "GetAVPackets",
  GetAVStream = "GetAVStream",
  GetAVStreams = "GetAVStreams",
  ExtractStream = "ExtractStream",
  GetMediaInfo = "GetMediaInfo",
  ReadAVPacket = "ReadAVPacket",
  AVPacketStream = "AVPacketStream",
  ReadNextAVPacket = "ReadNextAVPacket",
  StopReadAVPacket = "StopReadAVPacket",
  SetAVLogLevel = "SetAVLogLevel",
}

export type FFMpegWorkerMessageData =
  | ExtractStreamMessageData
  | GetAVPacketMessageData
  | GetAVPacketsMessageData
  | GetAVStreamMessageData
  | GetAVStreamsMessageData
  | ReadAVPacketMessageData
  | LoadWASMMessageData
  | SetAVLogLevelMessageData
  | GetMediaInfoMessageData;

export interface ExtractStreamMessageData {
  file: File;
  type: AVMediaType;
  streamIndex: number;
}

export interface GetAVStreamMessageData {
  file: File;
  streamType: AVMediaType;
  streamIndex: number;
}

export interface GetAVStreamsMessageData {
  file: File;
}

export interface GetAVPacketMessageData {
  file: File;
  time: number;
  streamType: AVMediaType;
  streamIndex: number;
  seekFlag: AVSeekFlag;
}

export interface GetAVPacketsMessageData {
  file: File;
  time: number;
  seekFlag: AVSeekFlag;
}

export interface ReadAVPacketMessageData {
  file: File;
  start: number;
  end: number;
  streamType: AVMediaType;
  streamIndex: number;
  seekFlag: AVSeekFlag;
}

export interface LoadWASMMessageData {
  wasmLoaderPath: string;
}

export interface GetMediaInfoMessageData {
  file: File;
}

export interface SetAVLogLevelMessageData {
  level: AVLogLevel;
}

export interface FFMpegWorkerMessage {
  type: FFMpegWorkerMessageType;
  data: FFMpegWorkerMessageData;
  msgId: number;
}
