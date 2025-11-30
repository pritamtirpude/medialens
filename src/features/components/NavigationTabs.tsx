import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn, tabsList } from '@/lib/utils';
import { motion } from 'motion/react';
import { useState } from 'react';
import GeneralInfo from './GeneralInfo';
import VideoInfo from './VideoInfo';

function NavigationTabs() {
  const [isActiveHoverTab, setIsActiveHoverTab] = useState('');
  const [isActiveTab, setIsActiveTab] = useState('general');

  return (
    <div className="mt-4">
      <Tabs defaultValue="general" className="relative">
        <TabsList className="bg-accent-foreground h-14 w-full max-w-[500px]">
          {tabsList.map((tab) => (
            <TabsTrigger
              key={tab}
              onMouseEnter={() => setIsActiveHoverTab(tab)}
              onMouseLeave={() => setIsActiveHoverTab('')}
              onClick={() => setIsActiveTab(tab)}
              className={cn(
                'relative z-50 cursor-pointer rounded-full text-gray-400 hover:text-white',
                isActiveTab === tab ? 'text-white' : '',
              )}
              value={tab}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
              {isActiveHoverTab === tab && (
                <motion.div
                  id="underline"
                  layoutId="underline"
                  animate={{
                    backgroundColor: '#51a2ff',
                  }}
                  className={cn('absolute inset-0 -z-10 rounded-md')}
                />
              )}
              {isActiveTab === tab && (
                <motion.div
                  id="activeUnderline"
                  layoutId="activeUnderline"
                  className="absolute right-0 bottom-0 left-0 h-0.5 rounded-full bg-white"
                />
              )}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="general">
          <GeneralInfo />
        </TabsContent>
        <TabsContent value="video">
          <VideoInfo />
        </TabsContent>
        <TabsContent value="audio">
          <h1>Audio</h1>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default NavigationTabs;
