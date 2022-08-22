import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Secret extends Document {
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

export const SecretSchema = SchemaFactory.createForClass(Secret);
