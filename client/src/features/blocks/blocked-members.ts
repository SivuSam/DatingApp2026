import { Component, OnInit, inject } from '@angular/core';
import { MemberService } from '../../core/services/member-service';
import { AccountService } from '../../core/services/account-service';
import { ToastService } from '../../core/services/toast-service';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-blocked-members',
  templateUrl: './blocked-members.html',
  styleUrl: './blocked-members.css',
  standalone: true,
  imports: [CommonModule, DatePipe]
})
export class BlockedMembersComponent implements OnInit {
  blockedMembers: any[] = [];
  private memberService = inject(MemberService);
  private accountService = inject(AccountService);
  private toast = inject(ToastService);

  showEditModal = false;
  selectedMemberId = '';
  selectedReason = '';

  ngOnInit(): void {
    this.loadBlockedMembers();
  }

  loadBlockedMembers() {
    this.memberService.getBlockedMembers().subscribe({
      next: (members) => (this.blockedMembers = members),
      error: () => this.toast.error('Failed to load blocked members'),
    });
  }

  unblockMember(id: string) {
    this.memberService.unblockMember(id).subscribe({
      next: () => {
        this.toast.success('Member unblocked');
        this.loadBlockedMembers();
      },
      error: () => this.toast.error('Failed to unblock member'),
    });
  }
   openEditModal(member: any) {
    this.selectedMemberId = member.id;
    this.selectedReason = member.reason || '';
    this.showEditModal = true;
  }

  confirmEdit(reason: string) {
    this.memberService
      .updateBlockReason(this.selectedMemberId, reason)
      .subscribe({
        next: () => {
          this.toast.success('Block reason updated');
          this.showEditModal = false;
          this.loadBlockedMembers();
        },
        error: () => {
          this.toast.error('Failed to update reason');
        },
      });
  }
}
