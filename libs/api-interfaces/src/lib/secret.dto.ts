import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateSecretDto {
  @IsString()
  @IsNotEmpty()
  secretName: string;
  
  @IsString()
  @IsNotEmpty()
  secretText: string;

  @IsNumber()
  @IsNotEmpty()
  remainingViews: number;

  constructor(secretText: string, remainingViews: number) {
    this.secretText = secretText;
    this.remainingViews = remainingViews;
  }
}
