import { Observable, map, take } from 'rxjs';
import { AccountService } from 'src/app/core/services/account.service';
import { Component, OnInit, createNgModule } from '@angular/core';
import { MembersService } from 'src/app/core/services/members.service';
import { Member } from 'src/app/core/models/member';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
  userName$: Observable<string>;
  form: FormGroup;
  member$: Observable<Member>;
  type = 'detail';
  message: string;
  constructor(
    private accountService: AccountService,
    private memberService: MembersService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getUser();
    this.getAccountDetail();
  }

  getAccountDetail() {
    this.member$ = this.memberService.member$(this.userName$).pipe(take(1));
    this.buildMemberForm();
    this.patchMemberForm();
  }

  getUser() {
    this.userName$ = this.accountService.currentUser$.pipe(
      map((userName) => {
        return userName.userName;
      })
    );
  }

  toggle(type: string) {
    this.type = type;
  }

  private buildMemberForm(): void {
    this.form = this.fb.group({
      introduction: [],
      lookingFor: [],
      interests: [],
      city: [],
      country: [],
    });
  }

  private patchMemberForm(): void {
    this.member$
      .pipe(
        take(1),
        map((member: Member) => {
          this.form.patchValue(member);
        })
      )
      .subscribe();
  }

  updateInfo(): void {
    this.memberService
      .update$(this.form.value)
      .pipe(
        take(1),
        map(() => {
          this.message = 'User update successfully';
          setTimeout(() => {
            this.message = null;
          }, 1500);
        })
      )
      .subscribe();
  }

  imageSrc;

  openCamera() {
    const constraints = {
      video: {
        facingMode: 'user',
      },
    };

    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        const video = document.createElement('video');
        video.srcObject = stream;
        video.addEventListener('loadedmetadata', () => {
          video.play();
        });

        (video.style.position = 'absolute'),
          (video.style.top = '0'),
          (video.style.left = '0'),
          (video.style.width = '250px'),
          (video.style.bottom = '0'),
          video.addEventListener('click', () => {
            const canvas = document.createElement('canvas');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;

            canvas.getContext('2d').drawImage(video, 0, 0);

            this.imageSrc = canvas.toDataURL();
            stream.getTracks().forEach((track) => track.stop());
          });

        document.body.appendChild(video);
      })
      .catch((error) => {
        console.error('Error accessing media devices.', error);
      });
  }
}
