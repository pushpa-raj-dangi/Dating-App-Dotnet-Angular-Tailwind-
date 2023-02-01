import { Photo } from './photo';

export interface Member {
  UserName: string;
  Gender: string;
  dateOfBirth: Date;
  KnownAs: string;
  Created: Date;
  LastActive: Date;
  Introduction: string;
  LookingFor: string;
  age: string;
  Interests: string;
  photoUrl: string;
  City: string;
  Country: string;
  Photos: Photo[];
}
