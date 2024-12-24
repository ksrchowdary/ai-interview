import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { AuthSlice, createAuthSlice } from './slices/authSlice';
import { InterviewSlice, createInterviewSlice } from './slices/interviewSlice';
import { UISlice, createUISlice } from './slices/uiSlice';

export type StoreState = AuthSlice & InterviewSlice & UISlice;

export const useStore = create<StoreState>()(
  devtools(
    immer((...a) => ({
      ...createAuthSlice(...a),
      ...createInterviewSlice(...a),
      ...createUISlice(...a),
    }))
  )
);