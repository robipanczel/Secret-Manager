import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ReadSecretDto } from '@secret-manager/api-interfaces';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Secret implements ReadSecretDto {
  @Prop({ required: true })
  hashedSecretText: string;

  @Prop({ required: true })
  secretName: string;

  @Prop({ required: true })
  secretText: string;

  @Prop({ required: true })
  remainingViews: number;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export type SecretDocument = Secret & Document;
export const SecretSchema = SchemaFactory.createForClass(Secret);
