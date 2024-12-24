import { useStore } from '@/store';
import { Interview } from '@/store/slices/interviewSlice';

export const useInterview = () => {
  const {
    interviews,
    currentInterview,
    setInterviews,
    setCurrentInterview,
    addInterview,
    updateInterview,
  } = useStore((state) => ({
    interviews: state.interviews,
    currentInterview: state.currentInterview,
    setInterviews: state.setInterviews,
    setCurrentInterview: state.setCurrentInterview,
    addInterview: state.addInterview,
    updateInterview: state.updateInterview,
  }));

  return {
    interviews,
    currentInterview,
    setInterviews,
    setCurrentInterview,
    addInterview,
    updateInterview,
  };
};