import http from "k6/http";
import { sleep, check } from "k6";
import { URL } from "./a_constants.js";

export let options = {
  stages: [
    { duration: "30m", target: 10 }, // Maintain 10 users for 30 minutes
  ],
};

export default function () {
  const res = http.get(URL);
  check(res, {
    "is status 200": (r) => r.status === 200,
  });
  sleep(1);
}
