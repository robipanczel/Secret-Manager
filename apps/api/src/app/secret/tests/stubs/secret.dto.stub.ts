import { Secret } from '../../schemas/secret.schema';

export const secretDtoStub = (): Secret => {
  return {
    hashedSecretText: 'hashedSecretText',
    secretText: 'secretText',
    remainingViews: 10,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
};
