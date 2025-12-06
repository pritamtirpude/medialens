import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn, tabsList } from '@/lib/utils';
import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import useMeasure from 'react-use-measure';
import AudioInfo from './AudioInfo';
import GeneralInfo from './GeneralInfo';
import VideoInfo from './VideoInfo';


function NavigationTabs() {
  const [isActiveTab, setIsActiveTab] = useState('general');
  const [ref, bounds] = useMeasure()

  const [direction, setDirection] = useState(0);

  return (
    <div className="mt-4 overflow-hidden">
      <Tabs defaultValue="general" className="relative">
        <TabsList className="bg-accent-foreground h-14 w-full max-w-[500px]">
          {tabsList.map((tab) => (
            <TabsTrigger
              key={tab}
              onClick={() => {
                setIsActiveTab(tab);
                setDirection(tabsList.indexOf(tab) > tabsList.indexOf(isActiveTab) ? 1 : -1);
              }}
              className={cn(
                'relative z-50 transition duration-150 cursor-pointer rounded-full text-gray-400 hover:text-white',
                isActiveTab === tab ? 'text-white' : '',
              )}
              value={tab}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
              {isActiveTab === tab && (
                <motion.div
                  id="underline"
                  layoutId="underline"
                  animate={{
                    backgroundColor: '#51a2ff',
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 600,
                    damping: 40,
                    bounce: 0
                  }}
                  className={cn('absolute inset-0 -z-10 rounded-md')}
                />
              )}
            </TabsTrigger>
          ))}
        </TabsList>
        <motion.div animate={{ height: bounds.height }}>
          <div ref={ref}>
            <AnimatePresence mode='popLayout' initial={false} custom={direction}>
              <TabsContent key={isActiveTab} value="general">
                <GeneralInfo direction={direction} />
              </TabsContent>
            </AnimatePresence>


            <AnimatePresence mode='popLayout' initial={false} custom={direction}>
              <TabsContent key={isActiveTab} value="video">
                <VideoInfo direction={direction} />
              </TabsContent>
            </AnimatePresence>

            <AnimatePresence mode='popLayout' initial={false} custom={direction}>
              <TabsContent key={isActiveTab} value="audio">
                <AudioInfo direction={direction} />
              </TabsContent>
            </AnimatePresence>
          </div>
        </motion.div>
      </Tabs>
    </div>
  );
}

export default NavigationTabs;
