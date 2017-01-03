export const state = {
  name: undefined
};

export function random(state) {
  return {
    ...state,
    number: Math.round(Math.random() * 1000)
  };
}
