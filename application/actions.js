const actionTypes = {
  INCREMENT: "INCREMENT",
};

const actions = {
  increment: () => ({
    type: actionTypes.INCREMENT,
  }),
};

export {
  actions,
  actionTypes,
};
