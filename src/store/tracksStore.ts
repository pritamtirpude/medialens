import type { Input } from "mediabunny";
import { create } from "zustand";

type TrackState = {
  inputTracks: Input | null;
  setInputTracks: (tracks: Input) => void;
};

export const useTrackStore = create<TrackState>((set) => ({
  inputTracks: null,
  setInputTracks: (tracks: Input) => set({ inputTracks: tracks }),
}));
