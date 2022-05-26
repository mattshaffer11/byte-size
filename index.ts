import './style.css';

import { fromEvent, map, merge } from 'rxjs';
import { scan } from 'rxjs/operators';

function createInputObservable(input, base) {
  return fromEvent(input, 'keyup').pipe(
    map((event) => {
      const value = event.target.value.trim();
      return value.length > 0 ? parseInt(value, base) : 0;
    }),
  );
}

const decimal = document.querySelector('input[name="decimal"]');
const hex = document.querySelector('input[name="hex"]');
const binary = document.querySelector('input[name="binary"]');

merge(
  createInputObservable(decimal, 10),
  createInputObservable(hex, 16),
  createInputObservable(binary, 2),
)
  .pipe(
    scan((current, value) => {
      return Number.isNaN(value) ? current : value;
    }, 0)
  )
  .subscribe((value: number) => {
    decimal.value = value.toString(10);
    hex.value = value.toString(16).toUpperCase();
    binary.value = value.toString(2);
  });
