import { take } from 'rxjs';
import { AccountService } from 'src/app/core/services/account.service';
import { MembersService } from 'src/app/core/services/members.service';
import { Component, Input } from '@angular/core';
import { Member } from 'src/app/core/models/member';
import { Photo } from 'src/app/core/models/photo';
import { User } from 'src/app/components/account/models/user.interface';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.scss'],
})
export class PhotoEditorComponent {
  @Input() member: Member;
  image: string;
  user: User;
  currentPhoto: Photo;

  constructor(
    private memberService: MembersService,
    private accountService: AccountService
  ) {
    this.accountService.currentUser$
      .pipe(take(1))
      .subscribe((user) => (this.user = user));
  }

  openDialog(photo: Photo) {
    this.image = photo.url;
    this.currentPhoto = photo;
  }

  setMainPhoto(photo: Photo) {
    this.memberService.updateMainPhoto(photo.id).subscribe(() => {
      this.member.photoUrl = photo.url;
      this.accountService.setCurrentUser(this.user);
      this.user.photoUrl = photo.url;
      this.member.photos.forEach((p) => {
        if (p.isMain) p.isMain = false;
        if (p.id === photo.id) p.isMain = true;
      });
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
