import type { Input } from "mediabunny";
import { create } from "zustand";

type TrackState = {
  inputTracks: Input | null;
  setInputTracks: (tracks: Input) => void;
  isTrackLoading?: boolean;
  setIsTrackLoading?: (isLoading: boolean) => void;
};

export const useTrackStore = create<TrackState>((set) => ({
  inputTracks: null,
  setInputTracks: (tracks: Input) => set({ inputTracks: tracks }),
  isTrackLoading: false,
  setIsTrackLoading: (isLoading: boolean) => set({ isTrackLoading: isLoading }),
}));
