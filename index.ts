import { Observable, Subject } from 'rxjs';
import { map, filter, tap } from 'rxjs/operators';

console.clear();

const o = new Observable<number>(observer => {
  let value = 0;
  const id = setInterval(() => {
    console.log('Observable emitting');
    value > 5 ? observer.error('error') : observer.next(value);
    value = value + 1;
  }, 500);

  return () => clearInterval(id);
}).pipe(
  map(v => v + 2),
  filter(v => v % 2 === 0)
);

const s = new Subject();

o.subscribe(s);

const sub = s.subscribe(
  res => console.log('Observable emitted: ', res),
  err => console.error(err)
);

const sub2 = s.subscribe(
  res => console.log('Observable emitted: ', res),
  err => console.error(err)
);
