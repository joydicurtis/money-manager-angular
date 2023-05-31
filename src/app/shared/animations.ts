import { animate, state, style, transition, trigger } from "@angular/animations";

export const fadeInOutTrigger = trigger('fadeInOut', [
  state('in', style({ opacity: '*' })),
  transition(':leave', [
    style({ opacity: '*' }),
    animate('300ms cubic-bezier(0.4, 0.0, 1, 1)', style({ opacity: 0 })),
  ]),
  transition(':enter', [
    style({ opacity: 0 }),
    animate('300ms cubic-bezier(0.4, 0.0, 1, 1)', style({ opacity: '*' }))
  ])
]);
