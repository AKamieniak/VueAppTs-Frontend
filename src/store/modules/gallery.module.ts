import { IImage } from '@/interfaces/image.interface';
import { ISaveImage } from '@/interfaces/save-image.interface';
import { galleryService } from '@/services/gallery.service';
import { Action, getModule, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import store from '..';
import { IGalleryState } from '../states/gallery-state.interface';
import { userModule } from './user.module';

@Module({ dynamic: true, store, name: 'gallery' })
class GalleryModule extends VuexModule implements IGalleryState {
  gallery: IImage[] = [];

  get getSavedGallery(): IImage[] {
    return this.gallery.filter((image: IImage) => image.isSaved);
  }

  @Mutation
  setImages(images: IImage[]): void {
    this.gallery = images;
  }

  @Action
  async fetchImages(): Promise<void> {
    const user = userModule.user;

    if (!!user) {
      // globalsModule.setLoading(true);

      await galleryService.getAll(user.id).then((response: IImage[]) => {
        this.setImages(response);

        // globalsModule.setLoading(false);
      });
    }
  }

  @Action
  async saveImage(image: IImage) {
    const user = userModule.user;

    if (!!user) {
      const command: ISaveImage = {
        userId: user.id,
        imageId: image.id,
      };

      await galleryService.saveImage(command);
      await this.fetchImages();
    }
  }
}

export const galleryModule = getModule(GalleryModule);
