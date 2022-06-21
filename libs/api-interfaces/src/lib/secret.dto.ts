import { IsString } from 'class-validator';

export class CreateSecretDto {
  @IsString()
  secretText: string;

  @IsString()
  remainingViews: number;

  constructor(secretText: string, remainingViews: number) {
    this.secretText = secretText;
    this.remainingViews = remainingViews;
  }
}
