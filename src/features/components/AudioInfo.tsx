import { Skeleton } from "@/components/ui/skeleton";
import { useTrackStore } from "@/store/tracksStore";
import type { AudioTrackData } from "@/types";
import { ImageUp } from "lucide-react";
import { motion } from 'motion/react';
import { useEffect, useState } from "react";
import InfoCard from "./InfoCard";


type AudioInfoProps = {
    direction: number;
}

function AudioInfo({ direction }: AudioInfoProps) {
    const { inputTracks, isTrackLoading } = useTrackStore();
    const [audioInfo, setAudioInfo] = useState<AudioTrackData | null>(null);

    const MotionImageUp = motion.create(ImageUp);

    useEffect(() => {
        const getAudioTrackInfo = async () => {
            if (!inputTracks) return null;

            const audioTracks = await inputTracks.getPrimaryAudioTrack().then(track => track);

            const type = audioTracks?.type;
            const codec = audioTracks?.codec;
            const fullCodecString = await audioTracks?.getCodecParameterString();
            const languageCode = audioTracks?.languageCode;
            const channels = audioTracks?.numberOfChannels;
            const sampleRate = audioTracks?.sampleRate;
            const duration = await audioTracks?.computeDuration();
            const packetCount = await audioTracks?.computePacketStats().then(stats => stats.packetCount);
            const averagePacketRate = await audioTracks?.computePacketStats().then(stats => stats.averagePacketRate);
            const averageBitrate = await audioTracks?.computePacketStats().then(stats => stats.averageBitrate);

            return {
                type: type || 'N/A',
                codec: codec || 'N/A',
                fullCodecString: fullCodecString || 'N/A',
                languageCode: languageCode || 'N/A',
                channels: channels || 0,
                sampleRate: sampleRate || 0,
                duration: duration || 0,
                packetCount: packetCount || 0,
                averagePacketRate: averagePacketRate || 0,
                averageBitrate: averageBitrate || 0,
            }
        }

        if (inputTracks) {
            getAudioTrackInfo().then((info) => {
                setAudioInfo(info);
            });
        }
        getAudioTrackInfo();
    }, [inputTracks])


    if (isTrackLoading) {
        return (
            <div className='grid grid-cols-2 gap-2'>
                {Array.from({ length: 8 }).map((_, index) => (
                    <Skeleton key={Math.random() + '_' + index + '_' + 'skeleton'} className="w-full rounded-md h-16 bg-secondary dark:bg-primary-foreground" />
                ))}
            </div>
        )
    }

    if (audioInfo === null && inputTracks === null) {
        return (
            <div className='p-3 flex flex-col justify-center items-center'>
                <MotionImageUp size={100} className='text-primary'
                    fill="none"
                    strokeWidth={2}
                    style={{
                        strokeDasharray: 100,
                    }}
                    initial={{ strokeDashoffset: 100 }}
                    animate={{ strokeDashoffset: 0 }}
                    transition={{
                        duration: 1.5,
                        ease: "easeInOut",
                    }}
                />
                <p className="text-muted-foreground mt-2 text-md">Upload a media file to view its metadata</p>
            </div>
        );
    }

    return (
        <>
            {audioInfo &&
                <motion.div variants={animationVariants} initial="initial" animate="animate" exit="exit" custom={direction} className='grid grid-cols-2 gap-2'>
                    <InfoCard title="Type" stats={audioInfo.type} />
                    <InfoCard title="Codec" stats={audioInfo.codec} />
                    <InfoCard title="Full Codec String" stats={audioInfo.fullCodecString} />
                    <InfoCard title="Language Code" stats={audioInfo.languageCode} />
                    <InfoCard title="Channels" stats={audioInfo.channels.toString()} />
                    <InfoCard title="Sample Rate" stats={audioInfo.sampleRate.toString()} />
                    <InfoCard title="Duration (s)" stats={audioInfo.duration.toString()} />
                    <InfoCard title="Packet Count" stats={audioInfo.packetCount.toString()} />
                    <InfoCard title="Average Packet Rate" stats={audioInfo.averagePacketRate.toString()} />
                    <InfoCard title="Average Bitrate" stats={audioInfo.averageBitrate.toString()} />
                </motion.div>
            }
        </>
    )
}

export default AudioInfo

const animationVariants = {
    initial: (direction: number) => ({
        x: direction > 0 ? '100%' : '-100%',
        filter: 'blur(5px)',
        opacity: 0,
    }),
    animate: {
        x: '0%',
        opacity: 1,
        filter: 'blur(0px)',
        transition: { duration: 0.3 },
    },
    transition: { duration: 0.3 },
    exit: (direction: number) => ({
        x: direction > 0 ? '-100%' : '100%',
        opacity: 0,
        filter: 'blur(5px)',
        transition: { duration: 0.3 },
    }),
}