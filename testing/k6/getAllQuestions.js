import http from 'k6/http';
import { check, sleep } from 'k6';
import { Counter } from 'k6/metrics';

export const requests = new Counter('http_reqs');

// export const options = {
//   vus:100,
//   duration: '15s',
// }

export const options = {
  stages: [
    { duration: '15s', target: 100 },
    { duration: '30s', target: 100 },
    // { duration: '20s', target: 0 },
  ],
};

export default function () {
  const res = http.get('http://localhost:3000/qa/questions/1');
  sleep(1);
  check(res, {
    'status was 200': (r) => r.status == 200,
    'transaction time < 2000ms' : r => r.timings.duration < 2000,
  });
}