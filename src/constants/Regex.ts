export const REGEX = {
  EMAIL:
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,10}[a-zA-Z0-9])?)*$/g,
  ONLY_WHITESPACE: /^(?!\s*$).+/,
  NUMBER: /^(?!0$)([1-9]\d{0,3}|1000)$/,
  TIME: /^\d+h(?:\s+\d+m)?$/,
  TIME_NUMBER: /^(?:[1-9]\d{0,2}|100|0)$/
};
