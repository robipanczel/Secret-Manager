import {
  CreateSecretDto,
  ReadSecretMetaDto,
} from '@secret-manager/api-interfaces';
import mongoose from 'mongoose';
import { Secret } from '../../schemas/secret.schema';

export const secretStub = () => {
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
  } as Secret;
};

export const createSecretDto = (): CreateSecretDto => {
  return {
    secretName: secretStub().secretName,
    secretText: secretStub().secretText,
    remainingViews: secretStub().remainingViews,
  };
};

export const readSecretMetaDto = (): ReadSecretMetaDto => {
  return {
    _id: secretStub()._id,
    hashedSecretText: secretStub().hashedSecretText,
    secretName: secretStub().secretName,
    remainingViews: secretStub().remainingViews,
    createdAt: secretStub().createdAt,
    updatedAt: secretStub().updatedAt,
  };
};

export const readSecretMetaDtos = (): ReadSecretMetaDto[] => {
  const readSecretMeta = [];
  for (let index = 0; index < 10; index++) {
    readSecretMeta.push(readSecretMetaDto());
  }
  return readSecretMeta;
};
