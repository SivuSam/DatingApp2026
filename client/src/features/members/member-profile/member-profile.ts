
import { Component, HostListener, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { EditableMember, Member } from '../../../types/member';
import { DatePipe } from '@angular/common';
import { MemberService } from '../../../core/services/member-service';
import { FormsModule, NgForm } from '@angular/forms';
import { ToastService } from '../../../core/services/toast-service';
import { AccountService } from '../../../core/services/account-service';
import { TimeAgoPipe } from '../../../core/pipes/time-ago-pipe';
import { Router } from '@angular/router';
import { BlockReasonModal } from '../../blocks/block-reason-modal/block-reason-modal';
import { CommonModule, } from '@angular/common';

@Component({
  selector: 'app-member-profile',
  imports: [DatePipe, FormsModule, TimeAgoPipe,BlockReasonModal,CommonModule],
  templateUrl: './member-profile.html',
  styleUrl: './member-profile.css',
})
export class MemberProfile implements OnInit, OnDestroy {

  @ViewChild('editForm') editForm?: NgForm;
  @HostListener('window:beforeunload', ['$event']) notify($event: BeforeUnloadEvent) {
    if (this.editForm?.dirty) {
      $event.preventDefault();
    }
  }
  public accountService = inject(AccountService);
  protected memberService = inject(MemberService);
  private toast = inject(ToastService);
  private router = inject(Router);
  standalone = true;
  showBlockModal = false; 
  selectedMemberId = '';
  protected editableMember: EditableMember = {
    displayName: '',
    description: '',
    city: '',
    country: '',
  }

  ngOnInit(): void {

    this.editableMember = {
      displayName: this.memberService.member()?.displayName || '',
      description: this.memberService.member()?.description || '',
      city: this.memberService.member()?.city || '',
      country: this.memberService.member()?.country || ''
    }
  }
  updateProfile() {
    if (!this.memberService.member()) return;
    const updatedMember = { ...this.memberService.member(), ...this.editableMember };
    this.memberService.updateMember(this.editableMember).subscribe({
      next: () => {
        const currentUser = this.accountService.currentUser();
        if (currentUser && updatedMember.displayName != currentUser?.displayName) {
          currentUser.displayName = updatedMember.displayName;
          this.accountService.setCurrentUser(currentUser);
        }
        this.toast.success('Profile updated successfully');
        this.memberService.editMode.set(false);
        this.memberService.member.set(updatedMember as Member)
        this.editForm?.reset(updatedMember);
      }
    })
    this.toast.success('Profile updated succesfully');
    this.memberService.editMode.set(false);
  }

  openBlockModal(targetId: string) {
    this.selectedMemberId = targetId;
    this.showBlockModal = true;
  }
  confirmBlock(reason: string) {
    this.memberService.blockMember(this.selectedMemberId, reason)
      .subscribe({
        next: () => {
          this.toast.success('Member blocked successfully');
          this.showBlockModal = false;
          this.router.navigate(['/matches']);
        },
        error: () => {
          this.toast.error('Failed to block member');
        }
      });
  }

  ngOnDestroy(): void {
    if (this.memberService.editMode()) {
      this.memberService.editMode.set(false);
    }
  }
}