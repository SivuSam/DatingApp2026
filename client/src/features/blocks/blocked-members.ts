import { Component, OnInit, inject } from '@angular/core';
import { MemberService } from '../../core/services/member-service';
import { AccountService } from '../../core/services/account-service';
import { ToastService } from '../../core/services/toast-service';

@Component({
  selector: 'app-blocked-members',
  templateUrl: './blocked-members.html',
  styleUrl: './blocked-members.css',
})
export class BlockedMembersComponent implements OnInit {
  blockedMembers: any[] = [];
  private memberService = inject(MemberService);
  private accountService = inject(AccountService);
  private toast = inject(ToastService);

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
}
