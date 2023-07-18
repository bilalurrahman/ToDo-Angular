import { Component, Input, Output, EventEmitter, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import Draggabilly from 'draggabilly';

@Component({
  selector: 'app-timer-popup',
  templateUrl: './timer-popup.component.html',
  styleUrls: ['./timer-popup.component.css']
})
export class TimerPopupComponent implements AfterViewInit{
  constructor(private elementRef: ElementRef) {}

  
  @Input() isTimerRunning: boolean = false;
  timer: number = 0; // Input property to receive the task object
  @Output() close: EventEmitter<void> = new EventEmitter<void>();
  @Output() start: EventEmitter<void> = new EventEmitter<void>();
  @Output() stop: EventEmitter<void> = new EventEmitter<void>();
  private interval: any;
  private originalPosition: number = 0; // Original rotation position
  private currentRotation: number = 0; // Current rotation value
  @ViewChild('timerContainer') timerContainer!: ElementRef;

  ngAfterViewInit() {
    const draggableElement = this.elementRef.nativeElement.querySelector('.timer-popup');
    const draggie = new Draggabilly(draggableElement, {
      handle: '.drag-handle'
    });
    

  }
  onClose() {
    this.close.emit();
  }

  onStart() {
       let interval:number =1000
       this.timer= 0;
       this.interval = setInterval(() => {
      if (this.isTimerRunning) { 
        this.currentRotation += 6; // Increment rotation by 6 degrees per second
        this.timerContainer.nativeElement.style.transform = `rotate(${this.currentRotation}deg)`; 
        this.timer++;
      }
    }, interval);
    this.start.emit();
  }

  ngOnDestroy() {
    this.clearInterval();
  }

  private clearInterval() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  onStop() {
    
    this.isTimerRunning = false;
    this.timer= 0;
    if (this.interval) {
      clearInterval(this.interval);
    }
    this.currentRotation = this.originalPosition;
    this.timerContainer.nativeElement.style.transform = `rotate(${this.currentRotation}deg)`;
    this.stop.emit();
    
  }
}