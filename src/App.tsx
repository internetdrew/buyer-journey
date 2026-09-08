import { useReducer, useRef } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import AppNav from './components/AppNav';
import Interests from './components/Interests';
import FocusAreas from './components/FocusAreas';
import Deployment from './components/Deployment';
import Rollout from './components/Rollout';
import RolloutTimeline from './components/RolloutTimeline';
import ImplementationInsight from './components/ImplementationInsight';
import JourneySummary from './components/JourneySummary';
import JourneyComplete from './components/JourneyComplete';
import Welcome from './components/Welcome';
import { initialJourneyState, journeyReducer } from './journey';

function App() {
  const [state, send] = useReducer(journeyReducer, initialJourneyState);
  const reduceMotion = useReducedMotion();
  const viewRef = useRef<HTMLDivElement>(null);

  function renderStage() {
    switch (state.stage) {
      case 'summary':
        return (
          <JourneySummary
            shiftPattern={state.shiftPattern}
            onBack={() => send({ type: 'BACK' })}
            onContinue={() => send({ type: 'NEXT' })}
          />
        );
      case 'complete':
        return <JourneyComplete onBack={() => send({ type: 'BACK' })} />;
      case 'implementation-insight':
        return (
          <ImplementationInsight
            onBack={() => send({ type: 'BACK' })}
            onContinue={() => send({ type: 'NEXT' })}
          />
        );
      case 'timeline':
        return (
          <RolloutTimeline
            key={state.shiftPattern}
            shiftPattern={state.shiftPattern}
            onBack={() => send({ type: 'BACK' })}
            onContinue={() => send({ type: 'NEXT' })}
          />
        );
      case 'deployment':
        return (
          <Deployment
            onContinue={() => send({ type: 'NEXT' })}
            onBack={() => send({ type: 'BACK' })}
          />
        );
      case 'rollout':
        return (
          <Rollout
            shiftPattern={state.shiftPattern}
            onContinue={() => send({ type: 'NEXT' })}
            onSelect={shiftPattern =>
              send({ type: 'SELECT_SHIFTS', shiftPattern })
            }
            onBack={() => send({ type: 'BACK' })}
          />
        );
      case 'focus':
        return (
          <FocusAreas
            focusArea={state.focusArea}
            onSelect={focusArea => send({ type: 'SELECT_FOCUS', focusArea })}
            onContinue={() => send({ type: 'NEXT' })}
            onBack={() => send({ type: 'BACK' })}
          />
        );
      case 'welcome':
        return <Welcome onStart={() => send({ type: 'NEXT' })} />;
      case 'interests':
        return (
          <Interests
            interest={state.interest}
            onSelect={interest => send({ type: 'SELECT_INTEREST', interest })}
            onContinue={() => send({ type: 'NEXT' })}
            onBack={() => send({ type: 'BACK' })}
          />
        );
    }
  }

  return (
    <div className='px-4 pt-16'>
      <AppNav />
      <main>
        <AnimatePresence
          initial={false}
          mode='wait'
          onExitComplete={() =>
            window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
          }
        >
          <motion.div
            key={state.stage}
            ref={viewRef}
            tabIndex={-1}
            className='outline-none'
            initial={{ opacity: reduceMotion ? 1 : 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: reduceMotion ? 1 : 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.14, ease: 'easeOut' }}
            onAnimationComplete={() =>
              viewRef.current?.focus({ preventScroll: true })
            }
          >
            {renderStage()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;
