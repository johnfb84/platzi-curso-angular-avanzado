import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CounterComponent } from '@shared/components/counter/counter.component';
import { HighlightDirective } from '@shared/directives/highlight.directive';

import { WaveAudioComponent } from '@info/components/wave-audio/wave-audio.component';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject, delay, Subject } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-about',
  imports: [
    CommonModule,
    CounterComponent,
    WaveAudioComponent,
    HighlightDirective,
    FormsModule
  ],
  templateUrl: './about.component.html',
})
export default class AboutComponent {
  duration = signal(1000);
  message = signal('Hola');

  obsWithInit$ = new BehaviorSubject<string>('Valor inicial');
  $withInit = toSignal(this.obsWithInit$, {
    requireSync: true,
  });
  obsWithountInit$ = new Subject<string>();
  $withoutInit = toSignal(this.obsWithountInit$.pipe(delay(3000)), {
    initialValue: '-----', 
  });

  changeDuration(event: Event) {
    const input = event.target as HTMLInputElement;
    this.duration.set(input.valueAsNumber);
  }

  changeMessage(event: string) {
    console.log('changeMessage', event);
  }

  emitWithInit() {
    this.obsWithInit$.next('Valor emitido with init');
  }
  
  emitWithoutInit() {
    this.obsWithountInit$.next('Valor emitido without init');
  } 
}
