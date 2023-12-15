import { apiService } from './apiService';
import { API_REQUEST } from '../../utils';

describe('apiService', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue({}),
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('findPossiblePermutations', () => {
    it('should make a GET request with the correct URL and options', async () => {
      const mockOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };

      await apiService.findPossiblePermutations();

      expect(global.fetch).toHaveBeenCalledWith(
        'http://api.sara-dev.co.uk/findPossiblePermutations',
        mockOptions
      );
    });

    it('should return the response from the API', async () => {
      const mockResponse = {
        data: [
          { id: 1, name: 'Permutation 1' },
          { id: 2, name: 'Permutation 2' },
        ],
      };

      jest.spyOn(global, 'fetch').mockResolvedValue({
        json: jest.fn().mockResolvedValue(mockResponse),
      });

      const result = await apiService.findPossiblePermutations();

      expect(result).toEqual(mockResponse);
    });

    it('should throw an error if the API request fails', async () => {
      const mockError = new Error('API request failed');

      jest.spyOn(global, 'fetch').mockRejectedValue(mockError);

      await expect(apiService.findPossiblePermutations()).rejects.toThrow(
        'API request failed'
      );
    });
  });
});
```