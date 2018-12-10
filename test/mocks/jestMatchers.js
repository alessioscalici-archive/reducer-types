
const fail = msg => ({ pass: false, message: () => msg });


expect.extend({
  toBeValidTypeObject(received) {
    if (typeof received !== 'object') {
      return fail('Object type must be an object');
    }
    if (!Array.isArray(received.actionIds)) {
      return fail('Object type must define "actionIds" of type Array');
    }
    if (typeof received.actionTypes !== 'object') {
      return fail('Object type must define "actionTypes" of type object');
    }
    if (typeof received.actionCreators !== 'object') {
      return fail('Object type must define "actionCreators" of type object');
    }
    if (typeof received.actionHandlers !== 'object') {
      return fail('Object type must define "actionHandlers" of type object');
    }

    // for each actionId, the actionType should be defined
    for (let i = 0; i < received.actionIds.length; i += 1) {
      const actionId = received.actionIds[i];
      if (typeof received.actionTypes[actionId] !== 'string') {
        return fail(`Action '${actionId}' has no corresponding value in actionTypes`);
      }
    }

    // for each actionId, the actionCreator should be defined
    for (let i = 0; i < received.actionIds.length; i += 1) {
      const actionId = received.actionIds[i];
      if (typeof received.actionCreators[actionId] !== 'function') {
        return fail(`Action '${actionId}' has no corresponding value in actionCreators`);
      }
    }

    // for each action type, the actionHandler should be defined
    for (let i = 0; i < received.actionIds.length; i += 1) {
      const actionId = received.actionIds[i];
      const actionType = received.actionTypes[actionId];
      if (typeof received.actionHandlers[actionType] !== 'function') {
        return fail(`Action type '${actionType}' (action id: '${actionId}') has no corresponding value in actionHandlers`);
      }
    }

    return { pass: true };
  },

  toBeValidActionObject(received) {
    if (typeof received !== 'object') {
      return fail('Action object must be an object');
    }

    if (typeof received.id !== 'string') {
      return fail('Action object must define string "id"');
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
  },
});
