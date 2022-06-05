import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Secret {
  @Prop({ required: true })
  hashedSecretText: string;

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

export type SecretDocument = Secret & Document;
