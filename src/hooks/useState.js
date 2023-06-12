let callCount = -1;
let states = [];

function useState(initValue) {
  const id = ++callCount;

  if (states[id]) return states[id];

  const setValue = (newValue) => {
    states[id][0] = newValue;
  };

  let tuple = [initValue, setValue];
  states.push(tuple);
  return tuple;
}

export { useState };
