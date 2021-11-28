import { SendleClient } from 'sendle-node';

export const sendle = new SendleClient({
  sendleId: process.env.SENDLE_ID,
  apiKey: process.env.SENDLE_API_KEY,
  sandbox: true, // default to false
  gotOptions: {}, // See https://github.com/sindresorhus/got#api
});