import assert from 'node:assert/strict';
import { test } from 'node:test';
import { initialJourneyState, journeyReducer } from '../src/journey.ts';
import { shifts, timelines } from '../src/rollout-data.ts';

function advance(state, type = 'NEXT') {
  return journeyReducer(state, { type });
}

for (const [shiftPattern, count] of [['one', 3], ['two', 4], ['continuous', 6]]) {
  test(`${shiftPattern}: selected schedule survives the full forward/back path`, () => {
    let state = { ...initialJourneyState, stage: 'rollout' };
    state = journeyReducer(state, { type: 'SELECT_SHIFTS', shiftPattern });
    for (const stage of ['implementation-insight', 'timeline', 'summary', 'complete']) {
      state = advance(state);
      assert.equal(state.stage, stage);
      assert.equal(state.shiftPattern, shiftPattern);
    }
    for (const stage of ['summary', 'timeline', 'implementation-insight', 'rollout']) {
      state = advance(state, 'BACK');
      assert.equal(state.stage, stage);
      assert.equal(state.shiftPattern, shiftPattern);
    }
    assert.equal(timelines[state.shiftPattern].length, count);
    assert.equal(count, shifts.find(shift => shift.value === shiftPattern).estimate[1]);
  });
}

test('changing the shift after returning replaces the schedule', () => {
  let state = { ...initialJourneyState, stage: 'timeline', shiftPattern: 'continuous' };
  state = advance(advance(state, 'BACK'), 'BACK');
  state = journeyReducer(state, { type: 'SELECT_SHIFTS', shiftPattern: 'one' });
  state = advance(advance(state));
  assert.equal(state.stage, 'timeline');
  assert.equal(timelines[state.shiftPattern].length, 3);
});

test('missing selection cannot continue and returns to the shift selector', () => {
  const state = { ...initialJourneyState, stage: 'timeline' };
  assert.equal(advance(state), state);
  assert.equal(advance(state, 'BACK').stage, 'rollout');
  assert.equal(advance({ ...state, stage: 'rollout' }).stage, 'rollout');
});

test('every illustrative week has details and a valid, progressive zone footprint', () => {
  for (const weeks of Object.values(timelines)) {
    assert.deepEqual(weeks[0].activeZones, []);
    assert.deepEqual(weeks[1].activeZones, ['B']);
    weeks.forEach((week, index) => {
      for (const field of ['title', 'goal', 'trainingWindow', 'support', 'rollout']) {
        assert.ok(week[field].trim());
      }
      assert.ok(week.actions.length >= 3);
      assert.equal(new Set(week.activeZones).size, week.activeZones.length);
      assert.ok(week.activeZones.every(zone => ['A', 'B', 'C', 'D', 'E'].includes(zone)));
      assert.ok((weeks[index - 1]?.activeZones ?? []).every(zone => week.activeZones.includes(zone)));
    });
    assert.equal(weeks.at(-1).activeZones.length, 5);
  }
});
