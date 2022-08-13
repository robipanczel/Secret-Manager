import { CreateSecretDto } from '@secret-manager/api-interfaces';
import mongoose from 'mongoose';
import { Secret } from '../../schemas/secret.schema';

export const secretDtoStub = (): Secret => {
  return {
    _id: new mongoose.Types.ObjectId('5cabe64dcf0d4447fa60f5e2'),
    hashedSecretText: 'hashedSecretText',
    secretName: 'secretName',
    secretText: 'secretText',
    remainingViews: 10,
    createdAt: new Date(
      'Sat Aug 13 2022 12:00:00 GMT+0200 (Central European Summer Time)'
    ),
    updatedAt: new Date(
      'Sat Aug 14 2022 12:00:00 GMT+0200 (Central European Summer Time)'
    ),
  };
};

export const createSecretDto = (): CreateSecretDto => {
  return {
    secretName: secretDtoStub().secretName,
    secretText: secretDtoStub().secretText,
    remainingViews: secretDtoStub().remainingViews,
  };
};
