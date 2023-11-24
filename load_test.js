import http from "k6/http";
import { sleep, check } from "k6";
import { URL } from "./a_constants.js";

export let options = {
  stages: [
    { duration: "1m", target: 50 }, // Ramp up to 50 users over 1 minute
    { duration: "5m", target: 50 }, // Stay at 50 users for 5 minutes
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
