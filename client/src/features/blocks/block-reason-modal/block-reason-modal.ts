import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-block-reason-modal',
  imports: [CommonModule, FormsModule],
  templateUrl: './block-reason-modal.html',
  styleUrl: './block-reason-modal.css',
})
export class BlockReasonModal {
  @Input() visible = false;
  @Input() title = 'Block Member';
  @Input() initialReason = '';

  @Output() confirm = new EventEmitter<string>();
  @Output() cancel = new EventEmitter<void>();

  reason = '';

  ngOnChanges() {
    this.reason = this.initialReason;
  }

  onConfirm() {
    if (!this.reason.trim()) return;

    this.confirm.emit(this.reason.trim());
  }
}
