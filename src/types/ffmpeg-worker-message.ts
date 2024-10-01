import { AVLogLevel, AVMediaType, AVSeekFlag } from "./avutil";

export enum FFMpegWorkerMessageType {
  FFmpegWorkerLoaded = "FFmpegWorkerLoaded",
  WASMRuntimeInitialized = "WASMRuntimeInitialized",
  LoadWASM = "LoadWASM",
  GetAVPacket = "GetAVPacket",
  GetAVPackets = "GetAVPackets",
  GetAVStream = "GetAVStream",
  GetAVStreams = "GetAVStreams",
  GetMediaInfo = "GetMediaInfo",
  ReadAVPacket = "ReadAVPacket",
  AVPacketStream = "AVPacketStream",
  ReadNextAVPacket = "ReadNextAVPacket",
  StopReadAVPacket = "StopReadAVPacket",
  SetAVLogLevel = "SetAVLogLevel",
  FetchFile = "FetchFile",
  FileFetched = "FileFetched",
}

export type FFMpegWorkerMessageData =
  | FetchFileMessageData
  | GetAVPacketMessageData
  | GetAVPacketsMessageData
  | GetAVStreamMessageData
  | GetAVStreamsMessageData
  | ReadAVPacketMessageData
  | LoadWASMMessageData
  | SetAVLogLevelMessageData
  | GetMediaInfoMessageData

export interface GetAVStreamMessageData {
  file: File | string;
  streamType: AVMediaType;
  streamIndex: number;
}

export interface GetAVStreamsMessageData {
  file: File | string;
}

export interface GetAVPacketMessageData {
  file: File | string;
  time: number;
  streamType: AVMediaType;
  streamIndex: number;
  seekFlag: AVSeekFlag;
}

export interface GetAVPacketsMessageData {
  file: File | string;
  time: number;
  seekFlag: AVSeekFlag;
}

export interface ReadAVPacketMessageData {
  file: File | string;
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
  file: File | string;
}

export interface SetAVLogLevelMessageData {
  level: AVLogLevel;
}

export interface FFMpegWorkerMessage {
  type: FFMpegWorkerMessageType;
  data: FFMpegWorkerMessageData;
  msgId: number;
}

export interface FetchFileMessageData {
  url: string;
}