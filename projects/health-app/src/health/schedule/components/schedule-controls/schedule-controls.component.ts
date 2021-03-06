import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'schedule-controls',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['schedule-controls.component.scss'],
  template: `
    <div class="controls">
      <button
        type="button"
        (click)="moveDate(offset - 1)">
        <img src="../../../../assets/chevron-left.svg" alt="left">
      </button>
      <p>{{ selected | date: 'longDate' }}</p>
      <button
        type="button"
        (click)="moveDate(offset + 1)">
        <img src="../../../../assets/chevron-right.svg" alt="right">
      </button>
    </div>
  `
})
export class ScheduleControlsComponent {
  offset = 0;

  @Input()
  selected: Date;

  @Output()
  move = new EventEmitter<number>();

  moveDate(offset: number) {
    this.offset = offset;
    this.move.emit(offset);
  }
}
