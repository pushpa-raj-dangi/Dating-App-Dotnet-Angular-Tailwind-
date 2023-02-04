import { Component, Input } from '@angular/core';
import { bounceInDownAnimation } from 'angular-animations';
import { take, Observable, map } from 'rxjs';
import { User } from 'src/app/components/account/models/user.interface';
import { Member } from 'src/app/core/models/member';
import { Photo } from 'src/app/core/models/photo';
import { AccountService } from 'src/app/core/services/account.service';
import { MembersService } from 'src/app/core/services/members.service';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.scss'],
  animations: [bounceInDownAnimation()],
})
export class PhotoEditorComponent {
  @Input() member: Member;
  image: string;
  user: User;
  currentPhoto: Photo;
  animationState: boolean;
  deleteConfirm: boolean;

  constructor(
    private memberService: MembersService,
    private accountService: AccountService
  ) {
    this.accountService.currentUser$
      .pipe(take(1))
      .subscribe((user) => (this.user = user));
  }

  handleConfirm(event: Observable<boolean>) {
    event
      .pipe(
        take(1),
        map((canDelete: boolean) => {
          if (canDelete) this.deletePhoto(this.currentPhoto.id);
        })
      )
      .subscribe();
  }

  openDialog(photo: Photo) {
    this.image = photo.url;
    this.currentPhoto = photo;
    console.log('animating!');
    this.animationState = false;
    setTimeout(() => {
      this.animationState = true;
    }, 1);
  }

  setMainPhoto(photo: Photo) {
    this.memberService.updateMainPhoto(photo.id).subscribe(() => {
      this.member.photoUrl = photo.url;
      this.user.photoUrl = photo.url;
      this.member.photos.forEach((p) => {
        if (p.isMain) p.isMain = false;
        if (p.id === photo.id) p.isMain = true;
      });
      this.accountService.setCurrentUser(this.user);
      this.closeDialog();
    });
  }

  deletePhoto(photoId: number) {
    this.memberService.deletePhoto(photoId).subscribe(() => {
      this.member.photos = this.member.photos.filter((x) => x.id != photoId);
      this.closeDialog();
    });
  }

  closeDialog() {
    this.image = undefined;
  }
}
