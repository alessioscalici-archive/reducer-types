
const fail = msg => ({ pass: false, message: () => msg });

const toBeValidActionObject = (received) => {
  if (typeof received !== 'object') {
    return fail('Action object must be an object');
  }

  if (typeof received.type !== 'string') {
    return fail('Action object must define string "type"');
  }

  if (typeof received.creator !== 'function') {
    return fail('Action object must define function "creator"');
  }

  if (typeof received.handler !== 'function') {
    return fail('Action object must define string "handler"');
  }

  return { pass: true };
};

const toBeValidTypeObject = (received) => {
  if (typeof received !== 'object') {
    return fail('Object type must be an object');
  }

  return Object.keys(received).reduce((res, actionName) => {
    if (!res.pass) return res;
    const actionRes = toBeValidActionObject(received[actionName]);
    if (!actionRes.pass) {
      return fail('Type object should only contain valid action objects');
    }
    return res;
  }, { pass: true });
};


expect.extend({
  toBeValidTypeObject,
  toBeValidActionObject,
});
