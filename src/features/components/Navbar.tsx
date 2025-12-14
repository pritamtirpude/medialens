import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/theme-provider";
import { Moon, Sun } from 'lucide-react';
import { AnimatePresence, motion } from "motion/react";


function Navbar() {
  const { setTheme, theme } = useTheme();
  const SunMotion = motion.create(Sun);
  const MoonMotion = motion.create(Moon);
  return (
    <header className="">
      <nav className="mx-auto max-w-3xl flex justify-between items-center rounded-md p-2">
        <h1 className="text-2xl font-bold  text-primary">MediaLens</h1>
        <Button className="hover:bg-primary cursor-pointer dark:hover:bg-primary" onClick={() => {
          setTheme(theme === "dark" ? "light" : "dark")
        }} variant="outline" size='icon-lg'>
          <AnimatePresence mode="wait" initial={false}>
            {theme === "dark" ? <SunMotion {...animationVariants} key="sun" /> : <MoonMotion {...animationVariants} key="moon" />}
          </AnimatePresence>
        </Button>
      </nav>
    </header>
  );
}

export default Navbar;


const animationVariants = {
  initial: {
    opacity: 0,
    y: "-100%",
  },
  animate: {
    opacity: 1,
    y: "0%",
  },
  exit: {
    opacity: 0,
    y: "100%",
  },
  transition: {
    type: "spring" as const,
    bounce: 0,
    duration: 0.25,
  }
}