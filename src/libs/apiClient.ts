import ky from 'ky';

export const apiClient = ky.create({
  prefixUrl: 'http://localhost:12345',
});
