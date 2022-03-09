import http from 'k6/http';
import { check, sleep } from 'k6';
import { Counter } from 'k6/metrics';

export const requests = new Counter('http_reqs');

// export const options = {
//   vus: 100,
//   duration: '30s',
// }

export const options = {
  stages: [
    { duration: '15s', target: 1 },
    { duration: '30s', target: 10 },
    { duration: '30s', target: 100 },
  ],
};

const randomNum = (max, min) => (
  Math.floor(Math.random() * (max - 1 + min) + min)
);
let count = randomNum(1000000, 1);

export default function () {
  const res = http.get(`http://localhost:3000/qa/questions/${count}`);
  sleep(1);
  check(res, {
    'status was 200': (r) => r.status == 200,
    'transaction time < 200ms' : r => r.timings.duration < 200,
    'transaction time < 500ms' : r => r.timings.duration < 500,
    'transaction time < 1000ms' : r => r.timings.duration < 1000,
    'transaction time < 2000ms' : r => r.timings.duration < 2000,
  });
}