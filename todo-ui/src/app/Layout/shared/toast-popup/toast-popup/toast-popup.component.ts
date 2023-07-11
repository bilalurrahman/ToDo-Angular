import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-toast-popup',
  templateUrl: './toast-popup.component.html',
  styleUrls: ['./toast-popup.component.css']
})
export class ToastPopupComponent {
 
  @Input() error: string = '';
  @Input() showAlert: boolean = false;
  @Output() closeToast: EventEmitter<void> = new EventEmitter<void>();

  hideBootstrapAlert(): void {
    this.closeToast.emit();
  }

}
