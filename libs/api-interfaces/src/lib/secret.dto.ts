export interface CreateSecretDto {
  secretText: string;
  remainingViews: number;
}

export const isCreateSecretDto = (obj: unknown): obj is CreateSecretDto => {
  return (
    obj &&
    typeof obj === 'object' &&
    'secretText' in obj &&
    'remainingViews' in obj
  );
};
