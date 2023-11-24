import http from "k6/http";
import { sleep, check } from "k6";
import { URL } from "./a_constants.js";

export let options = {
  stages: [
    { duration: "1m", target: 10 }, // Ramp up to 10 users over 1 minute
    { duration: "5m", target: 10 }, // Stay at 10 users for 5 minutes
    { duration: "1m", target: 100 }, // Ramp up to 100 users over 1 minute
    { duration: "5m", target: 100 }, // Stay at 100 users for 5 minutes
    { duration: "1m", target: 0 }, // Ramp down to 0 users over 1 minute
  ],
};

export default function () {
  const res = http.get(URL);
  check(res, {
    "is status 200": (r) => r.status === 200,
  });
  sleep(1);
}
