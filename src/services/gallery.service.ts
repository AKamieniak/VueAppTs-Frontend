import { IImage } from '@/interfaces/image.interface';
import { ISaveImage } from '@/interfaces/save-image.interface';
import { ApiService } from './api.service';

class GalleryService extends ApiService {
  async saveImage(command: ISaveImage): Promise<void> {
    try {
      const response = await this.http.put<any>('/image', command);
    } catch (error) {
      this.handleError(error);

      throw error;
    }
  }

  async getAll(userId: number): Promise<IImage[]> {
    try {
      const response = await this.http.get<IImage[]>(`/image/${userId}`);

      return response.data;
    } catch (error) {
      this.handleError(error);

      throw error;
    }
  }
}

export const galleryService = new GalleryService();
