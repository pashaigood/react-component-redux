export const state = {
  number: undefined
};

export function random(state) {
  return {
    ...state,
    number: Math.round(Math.random() * 1000)
  };
}
