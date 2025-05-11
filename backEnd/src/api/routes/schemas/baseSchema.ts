export const baseSchema = {
  id: { type: 'string' },
  createdAt: { type: 'string', format: 'date-time' },
  updatedAt: { type: 'string', format: 'date-time' },
};

export const baseJsonSchema = {
  type: 'object',
  properties: baseSchema,
  additionalProperties: false,
};

export const idRequest = {
  type: 'object',
  properties: {
    id: { type: 'string' },
  },
  required: ['id'],
  additionalProperties: false,
};
