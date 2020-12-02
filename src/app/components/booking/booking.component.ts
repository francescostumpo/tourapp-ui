import {
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
  ChangeDetectionStrategy,
  Injectable,
  ViewEncapsulation,
  ChangeDetectorRef
} from '@angular/core';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarEventTitleFormatter,
  CalendarView
} from 'angular-calendar';
import { WeekViewHourSegment } from 'calendar-utils';
import { fromEvent } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';
import { addDays, addMinutes, endOfWeek } from 'date-fns';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Subject} from 'rxjs';
import {
  startOfDay,
  endOfDay,
  subDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
} from 'date-fns';
import {faTrash} from '@fortawesome/free-solid-svg-icons';
import {DateFormatterService} from '../../services/utils/date-formatter.service';


// tslint:disable-next-line:typedef
function floorToNearest(amount: number, precision: number) {
  return Math.floor(amount / precision) * precision;
}

// tslint:disable-next-line:typedef
function ceilToNearest(amount: number, precision: number) {
  return Math.ceil(amount / precision) * precision;
}


@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
  encapsulation: ViewEncapsulation.None,
})
// tslint:disable:typedef
export class BookingComponent implements OnInit {
  @ViewChild('modalContentAddEvent', { static: true }) modalContentAddEvent: TemplateRef<any>;
  events: CalendarEvent[] = [];
  faTrash = faTrash;
  view = CalendarView.Week;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  dragToCreateActive = false;
  weekStartsOn: 0 = 0;
  activeDayIsOpen = false;
  refresh: Subject<any> = new Subject();
  nextEvents: Array<CalendarEvent> = [];
  modalData: {
    action: string;
    event: CalendarEvent;
  };

  constructor(private modal: NgbModal, private cdr: ChangeDetectorRef, public dateFormatter: DateFormatterService) {}
  ngOnInit(): void {
    this.getAllEvents();
  }

  verifyIfNextEvent(event: CalendarEvent) {
    if (event.start >= new Date() || (event.start <= new Date() && event.end >= new Date())){
      this.nextEvents.push(event);
    }
  }

  getAllEvents(): void{
    this.events = [
      {
        start: subDays(startOfDay(new Date()), 1),
        end: addDays(new Date(), 1),
        title: 'A 3 day event',
        allDay: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
        draggable: true,
      },
      {
        start: startOfDay(new Date()),
        title: 'An event with no end date',
      },
      {
        start: subDays(endOfMonth(new Date()), 3),
        end: addDays(endOfMonth(new Date()), 3),
        title: 'A long event that spans 2 months',
        allDay: true,
      }
    ];

    for (const event of this.events){
      this.verifyIfNextEvent(event);
    }
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
                      event,
                      newStart,
                      newEnd,
                    }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEventCustom('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContentAddEvent, { size: 'lg' });
  }

  handleEventCustom(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContentAddEvent, { size: 'lg' });
  }

  addEventCustom(event: CalendarEvent): void {
    console.log('event', event);
    /*this.events = [
      ...this.events,
      {
        title: 'New event',
        start: event.start,
        end: event.end,
        color: colors.red,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];*/
    this.verifyIfNextEvent(event);
    this.modal.dismissAll();
  }


  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
    this.modal.dismissAll();
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  handleHourCustom(date: Date, sourceEvent: MouseEvent) {
    console.log(date, sourceEvent);
  }

  handleDrag($event: DragEvent) {
    console.log($event);
  }
  startDragToCreate(
    segment: WeekViewHourSegment,
    mouseDownEvent: MouseEvent,
    segmentElement: HTMLElement
  ) {
    const dragToSelectEvent: CalendarEvent = {
      id: this.events.length,
      title: 'Nuovo Evento',
      start: segment.date,
      meta: {
        tmpEvent: true,
      },
    };
    this.events = [...this.events, dragToSelectEvent];
    const segmentPosition = segmentElement.getBoundingClientRect();
    this.dragToCreateActive = true;
    const endOfView = endOfWeek(this.viewDate, {
      weekStartsOn: this.weekStartsOn,
    });

    fromEvent(document, 'mousemove')
      .pipe(
        finalize(() => {
          delete dragToSelectEvent.meta.tmpEvent;
          this.dragToCreateActive = false;
          this.refreshT();
        }),
        takeUntil(fromEvent(document, 'mouseup'))
      )
      .subscribe((mouseMoveEvent: MouseEvent) => {
        const minutesDiff = ceilToNearest(
          mouseMoveEvent.clientY - segmentPosition.top,
          30
        );

        const daysDiff =
          floorToNearest(
            mouseMoveEvent.clientX - segmentPosition.left,
            segmentPosition.width
          ) / segmentPosition.width;

        const newEnd = addDays(addMinutes(segment.date, minutesDiff), daysDiff);
        if (newEnd > segment.date && newEnd < endOfView) {
          dragToSelectEvent.end = newEnd;
        }
        this.refreshT();
      });
  }

  private refreshT() {
    this.events = [...this.events];
    this.cdr.detectChanges();
  }
}
