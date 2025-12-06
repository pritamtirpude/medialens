import { formatFileSize } from '@/lib/utils';
import { useTrackStore } from '@/store/tracksStore';
import type { GeneralInfoData } from '@/types';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import InfoCard from './InfoCard';

type GeneralInfoProps = {
  direction: number;
}

function GeneralInfo({ direction }: GeneralInfoProps) {
  const { inputTracks } = useTrackStore();
  const [generalInfo, setGeneralInfo] = useState<GeneralInfoData | null>(null);

  useEffect(() => {
    const getGeneralInfo = async () => {
      if (!inputTracks) return null;

      const format = await inputTracks.getFormat();
      const mime = await inputTracks.getMimeType();
      const size = await inputTracks.source?.getSize();
      const duration = await inputTracks.computeDuration();
      const tags = await inputTracks.getMetadataTags();
      const tracks = (await inputTracks.getTracks()).length;

      return {
        format: format.name,
        mime,
        size: formatFileSize(size || 0),
        duration: duration.toFixed(2) + ' seconds',
        totalTracks: tracks,
        tags: {
          title: tags.title || 'N/A',
          album: tags.album || 'N/A',
          artist: tags.artist || 'N/A',
          albumArtist: tags.albumArtist || 'N/A',
          trackNumber: tags.trackNumber || 0,
          description: tags.description || 'N/A',
          genre: tags.genre || 'N/A',
          date: tags.date instanceof Date ? tags.date.toISOString() : tags.date || 'N/A',
          comment: tags.comment || 'N/A',
        },
      };
    };

    if (inputTracks) {
      getGeneralInfo().then((info) => {
        setGeneralInfo(info);
      });
    }
  }, [inputTracks]);

  if (generalInfo === null) {
    return (
      <div>
        <h1>No file loaded</h1>
      </div>);
  }

  return (
    <motion.div variants={animationVariants} initial="initial" animate="animate" exit="exit" custom={direction} className='grid grid-cols-2 gap-2'>
      <InfoCard title="Format" stats={generalInfo.format} />
      <InfoCard title="MIME Type" stats={generalInfo.mime} />
      <InfoCard title="Size" stats={generalInfo.size} />
      <InfoCard title="Duration" stats={generalInfo.duration} />
      <InfoCard title="Total Tracks" stats={generalInfo.totalTracks.toString()} />
      {generalInfo && Object.entries(generalInfo.tags).some(([, value]) => value && value !== 'N/A' && value !== 0) && (
        <>
          <InfoCard title="Title" stats={generalInfo.tags.title || 'N/A'} />
          <InfoCard title="Album" stats={generalInfo.tags.album || 'N/A'} />
          <InfoCard title="Artist" stats={generalInfo.tags.artist || 'N/A'} />
          <InfoCard title="Album Artist" stats={generalInfo.tags.albumArtist || 'N/A'} />
          <InfoCard title="Track Number" stats={generalInfo.tags.trackNumber?.toString() || '0'} />
          <InfoCard title="Description" stats={generalInfo.tags.description || 'N/A'} />
          <InfoCard title="Genre" stats={generalInfo.tags.genre || 'N/A'} />
          <InfoCard title="Date" stats={generalInfo.tags.date?.toString() || 'N/A'} />
          <InfoCard title="Comment" stats={generalInfo.tags.comment || 'N/A'} />
        </>
      )}
    </motion.div>
  );
}

export default GeneralInfo;

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