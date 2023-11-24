import http from "k6/http";
import { sleep, check } from "k6";
import { URL, MAX_RES_TIME } from "./a_constants.js";

export let options = {
  stages: [
    { duration: "1m", target: 50 }, // Ramp up to 50 users over 1 minute
  ],
};

export default function () {
  const res = http.get(URL);
  check(res, {
    // #1 check response status code is 200
    "is status 200": (r) => r.status === 200,
    // #2 check response body contains expected key "result" as non-null
    "response body contains expected key": (r) => {
      try {
        const resBody = JSON.parse(r.body);
        return resBody.result !== null;
      } catch (e) {
        return false;
      }
    },
    // #3 check errorCode is 0
    "errorCode is 0": (r) => {
      try {
        const resBody = JSON.parse(r.body);
        return resBody.errorCode === 0;
      } catch (e) {
        return false;
      }
    },
    // #4 check response time is less than xxx ms
    "response time is less than xxx ms": (r) => r.timings.duration < MAX_RES_TIME,
  });
  sleep(1);
}
