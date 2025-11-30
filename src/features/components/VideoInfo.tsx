import { useTrackStore } from "@/store/tracksStore";
import type { VideoTrackData } from "@/types";
import { useEffect, useState } from "react";
import InfoCard from "./InfoCard";

function VideoInfo() {
  const { inputTracks } = useTrackStore();
  const [videoInfo, setVideoInfo] = useState<VideoTrackData | null>(null);

  useEffect(() => {
    const getVideoTrackInfo = async () => {
      if (!inputTracks) return null;

      const videoTracks = await inputTracks.getPrimaryVideoTrack().then(track => track);

      const type = videoTracks?.type;
      const codec = videoTracks?.codec;
      const resolution = `${videoTracks?.displayWidth}x${videoTracks?.displayHeight}`;
      const fullCodecString = await videoTracks?.getCodecParameterString();
      const languageCode = videoTracks?.languageCode;
      const codedWidth = videoTracks?.codedWidth;
      const codedHeight = videoTracks?.codedHeight;
      const rotation = videoTracks?.rotation;
      const transparency = await videoTracks?.canBeTransparent();
      const hdr = await videoTracks?.hasHighDynamicRange();
      const packetCount = await videoTracks?.computePacketStats().then(stats => stats.packetCount);
      const frameRate = await videoTracks?.computePacketStats().then(stats => stats.averagePacketRate);
      const averageBitrate = await videoTracks?.computePacketStats().then(stats => stats.averageBitrate);
      const colorPrimaries = await videoTracks?.getColorSpace().then(space => space?.primaries ?? "Unknown");
      const transferCharacteristics = await videoTracks?.getColorSpace().then(space => space?.transfer ?? "Unknown");
      const matrixCoefficients = await videoTracks?.getColorSpace().then(space => space?.matrix ?? "Unknown");
      const fullRange = await videoTracks?.getColorSpace().then(space => space?.fullRange ?? "Unknown");

      return {
        type: type || 'N/A',
        codec: codec || 'N/A',
        resolution: resolution || 'N/A',
        fullCodecString: fullCodecString || 'N/A',
        languageCode: languageCode || 'N/A',
        codedWidth: codedWidth || 0,
        codedHeight: codedHeight || 0,
        rotation: rotation || 0,
        transparency: transparency || false,
        hdr: hdr || false,
        packetCount: packetCount || 0,
        frameRate: frameRate || 0,
        averageBitrate: averageBitrate || 0,
        colorPrimaries: colorPrimaries || 'N/A',
        transferCharacteristics: transferCharacteristics || 'N/A',
        matrixCoefficients: matrixCoefficients || 'N/A',
        fullRange: fullRange || 'N/A',
      };
    }
    if (inputTracks) {
      getVideoTrackInfo().then((info) => {
        setVideoInfo(info);
      });
    }
  }, [inputTracks]);

  if (videoInfo === null) {
    return (
      <div>
        <h1>No file loaded</h1>
      </div>);
  }

  return (
    <div className='grid grid-cols-2 gap-2'>
      <InfoCard title="Type" stats={videoInfo.type} />
      <InfoCard title="Codec" stats={videoInfo.codec} />
      <InfoCard title="Resolution" stats={videoInfo.resolution} />
      <InfoCard title="Full Codec String" stats={videoInfo.fullCodecString} />
      <InfoCard title="Language Code" stats={videoInfo.languageCode} />
      <InfoCard title="Coded Width" stats={videoInfo.codedWidth.toString()} />
      <InfoCard title="Coded Height" stats={videoInfo.codedHeight.toString()} />
      <InfoCard title="Rotation" stats={videoInfo.rotation.toString()} />
      <InfoCard title="Transparency" stats={videoInfo.transparency ? "Yes" : "No"} />
      <InfoCard title="HDR" stats={videoInfo.hdr ? "Yes" : "No"} />
      <InfoCard title="Packet Count" stats={videoInfo.packetCount.toString()} />
      <InfoCard title="Frame Rate" stats={videoInfo.frameRate.toString()} />
      <InfoCard title="Average Bitrate" stats={videoInfo.averageBitrate.toString()} />
      <InfoCard title="Color Primaries" stats={videoInfo.colorPrimaries} />
      <InfoCard title="Transfer Characteristics" stats={videoInfo.transferCharacteristics} />
      <InfoCard title="Matrix Coefficients" stats={videoInfo.matrixCoefficients} />
      <InfoCard title="Full Range" stats={videoInfo.fullRange.toString()} />
    </div>
  )
}

export default VideoInfo