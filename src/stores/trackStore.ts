import { create } from "zustand";

type Track = {
  id: number;
  name: string | null;
  address: string | null;
  location_image: string | null;
  location_id: number | null;
  location: string | null;
  country: string | null;
};

type TrackStore = {
  track: Track | null;
  setTrack: (track: Track) => void;
};

export const useTrackStore = create<TrackStore>()((set) => ({
  track: null,
  setTrack: (track) => set(() => ({ track })),
}));
