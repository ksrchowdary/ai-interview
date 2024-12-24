import { StateCreator } from 'zustand';

export interface Interview {
  id: string;
  title: string;
  status: 'pending' | 'in-progress' | 'completed';
  createdAt: string;
  updatedAt: string;
}

export interface InterviewSlice {
  interviews: Interview[];
  currentInterview: Interview | null;
  setInterviews: (interviews: Interview[]) => void;
  setCurrentInterview: (interview: Interview | null) => void;
  addInterview: (interview: Interview) => void;
  updateInterview: (id: string, updates: Partial<Interview>) => void;
}

export const createInterviewSlice: StateCreator<InterviewSlice> = (set) => ({
  interviews: [],
  currentInterview: null,
  setInterviews: (interviews) => set({ interviews }),
  setCurrentInterview: (interview) => set({ currentInterview: interview }),
  addInterview: (interview) => 
    set((state) => ({ interviews: [...state.interviews, interview] })),
  updateInterview: (id, updates) =>
    set((state) => ({
      interviews: state.interviews.map((interview) =>
        interview.id === id ? { ...interview, ...updates } : interview
      ),
    })),
});