import { create } from "zustand";

type Location = {
  id: number;
  name?: string;
  location?: string;
  country: string;
  location_image?: string;
};

type LocationStore = {
  location: Location | null;
  setLocation: (location: Location) => void;
};

export const useLocationStore = create<LocationStore>()((set) => ({
  location: null,
  setLocation: (location) => set(() => ({ location })),
}));
