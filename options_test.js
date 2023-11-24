import http from "k6/http";
import { sleep, check } from "k6";
import { URL } from "./a_constants.js";

export let options = {
  stages: [
    { duration: "1m", target: 50 }, // Ramp up to 50 users over 1 minute
  ],
  // simulate a situation where each HTTP request comes from a new connection
  noConnectionReuse: true,
};

export default function () {
  const res = http.get(URL);
  check(res, {
    "is status 200": (r) => r.status === 200,
  });
  sleep(1);
}
