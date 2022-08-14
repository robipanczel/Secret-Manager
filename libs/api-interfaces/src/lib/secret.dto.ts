import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import mongoose from 'mongoose';

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

export class ReadSecretDto {
  _id: mongoose.Types.ObjectId;

  hashedSecretText: string;

  secretName: string;

  secretText: string;

  remainingViews: number;

  createdAt: Date;

  updatedAt: Date;

  constructor(
    _id: mongoose.Types.ObjectId,
    hashedSecretText: string,
    secretName: string,
    secretText: string,
    remainingViews: number,
    createdAt: Date,
    updatedAt: Date
  ) {
    this._id = _id;
    this.hashedSecretText = hashedSecretText;
    this.secretName = secretName;
    this.secretText = secretText;
    this.remainingViews = remainingViews;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

export type ReadSecretMetaDto = Omit<ReadSecretDto, 'secretText'>;
