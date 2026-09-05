export type Interest = 'operations' | 'finance' | 'technical' | 'executive';

export const demoInterest: Interest = 'operations';

export type FocusArea =
  | 'downtime'
  | 'throughput'
  | 'roi'
  | 'integrations'
  | 'team';

export const demoFocusArea: FocusArea = 'downtime';
export type ShiftPattern = 'one' | 'two' | 'continuous';

export type JourneyState = {
  stage:
    | 'welcome'
    | 'interests'
    | 'focus'
    | 'deployment'
    | 'rollout'
    | 'timeline'
    | 'peer-insight'
    | 'summary'
    | 'complete';
  interest: Interest | null;
  focusArea: FocusArea | null;
  shiftPattern: ShiftPattern | null;
};

export type JourneyEvent =
  | { type: 'NEXT' }
  | { type: 'BACK' }
  | { type: 'SELECT_INTEREST'; interest: Interest }
  | { type: 'SELECT_FOCUS'; focusArea: FocusArea }
  | { type: 'SELECT_SHIFTS'; shiftPattern: ShiftPattern };

export const initialJourneyState: JourneyState = {
  stage: 'welcome',
  interest: null,
  focusArea: null,
  shiftPattern: null,
};

export function journeyReducer(
  state: JourneyState,
  event: JourneyEvent,
): JourneyState {
  switch (state.stage) {
    case 'welcome':
      if (event.type === 'NEXT') return { ...state, stage: 'interests' };
      return state;
    case 'interests':
      if (event.type === 'NEXT' && state.interest === demoInterest) {
        return { ...state, stage: 'focus' };
      }
      if (event.type === 'BACK') return { ...state, stage: 'welcome' };
      if (event.type === 'SELECT_INTEREST' && event.interest === demoInterest) {
        return {
          ...state,
          interest: event.interest,
          focusArea: null,
        };
      }
      return state;
    case 'focus':
      if (event.type === 'BACK') {
        return {
          ...state,
          stage: 'interests',
          interest: null,
          focusArea: null,
        };
      }
      if (event.type === 'SELECT_FOCUS' && event.focusArea === demoFocusArea) {
        return { ...state, stage: 'deployment', focusArea: event.focusArea };
      }
      return state;
    case 'deployment':
      if (event.type === 'BACK') {
        return {
          ...state,
          stage: 'focus',
          focusArea: null,
          shiftPattern: null,
        };
      }
      if (event.type === 'NEXT') return { ...state, stage: 'rollout' };
      return state;
    case 'rollout':
      if (event.type === 'NEXT' && state.shiftPattern !== null) {
        return { ...state, stage: 'timeline' };
      }
      if (event.type === 'BACK') return { ...state, stage: 'deployment' };
      if (event.type === 'SELECT_SHIFTS') {
        return { ...state, shiftPattern: event.shiftPattern };
      }
      return state;
    case 'timeline':
      if (event.type === 'NEXT') return { ...state, stage: 'peer-insight' };
      if (event.type === 'BACK') return { ...state, stage: 'rollout' };
      return state;
    case 'peer-insight':
      if (event.type === 'NEXT') return { ...state, stage: 'summary' };
      if (event.type === 'BACK') return { ...state, stage: 'timeline' };
      return state;
    case 'summary':
      if (event.type === 'NEXT') return { ...state, stage: 'complete' };
      if (event.type === 'BACK') return { ...state, stage: 'peer-insight' };
      return state;
    case 'complete':
      if (event.type === 'BACK') return { ...state, stage: 'summary' };
      return state;
  }
}
