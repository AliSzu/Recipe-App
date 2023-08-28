export const rollbarConfig = {
  accessToken: import.meta.env.VITE_ROLLBAR_ACCESS_TOKEN,
  captureUncaught: true,
  captureUnhandledRejections: true,

  payload: {
    environment: "testenv",
    client: {
      javascript: {
        source_map_enabled: true, // false by default
        guess_uncaught_frames: true,
      },
    },
  },
};
