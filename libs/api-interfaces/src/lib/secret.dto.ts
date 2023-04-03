import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateSecretDto {
  @IsString()
  @IsNotEmpty()
  secretName: string;

  @IsString()
  @IsNotEmpty()
  secretText: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  remainingViews: number;

  constructor(secretName: string, secretText: string, remainingViews: number) {
    this.secretName = secretName;
    this.secretText = secretText;
    this.remainingViews = remainingViews;
  }
}

export class ReadSecretMetaDto {
  hashedSecretText: string;
  secretName: string;
  remainingViews: number;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    hashedSecretText: string,
    secretName: string,
    remainingViews: number,
    createdAt: Date,
    updatedAt: Date
  ) {
    this.hashedSecretText = hashedSecretText;
    this.secretName = secretName;
    this.remainingViews = remainingViews;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

export class ReadSecretDto extends ReadSecretMetaDto {
  secretText: string;

  constructor(
    hashedSecretText: string,
    secretName: string,
    secretText: string,
    remainingViews: number,
    createdAt: Date,
    updatedAt: Date
  ) {
    super(hashedSecretText, secretName, remainingViews, createdAt, updatedAt);
    this.secretText = secretText;
  }
}

export type UpdateSecretMetaDto = Pick<ReadSecretDto, 'remainingViews'>;
