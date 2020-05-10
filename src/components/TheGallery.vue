<template>
  <section class="gallery">
    <div class="col-sm-12 col-md-10">
      <div class="row">
        <div v-for="item in data" :key="item.id" class="col-sm-6 col-lg-3 py-4">
          <div class="gallery-container">
            <img :src="require(`@/assets/image.png`)" :alt="item.name" class="image" />

            <div class="overlay">
              <p class="text p-2">
                <span>{{ item.name }}</span
                ><br />
                <span class="small font-weight-light">{{ item.description }}</span>
                <button @click="onSaveClick(item)" class="btn view-btn">
                  <b-icon :icon="isSaved(item) ? 'bookmark-fill' : 'bookmark-plus'"></b-icon>
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { IImage } from '@/interfaces/image.interface';
import { galleryModule } from '@/store/modules/gallery.module';

@Component({})
export default class TheGallery extends Vue {
  @Prop({ type: Array, required: true }) readonly data!: IImage[];

  async onSaveClick(image: IImage): Promise<void> {
    await galleryModule.saveImage(image);
  }

  isSaved(image: IImage): boolean {
    return galleryModule.getSavedGallery.some((savedImage: IImage) => savedImage.id === image.id);
  }
}
</script>

<style lang="scss" scoped>
.gallery {
  display: flex;
  justify-content: center;
}

.gallery-container {
  position: relative;
  width: 100%;
  border: 7px solid #ffffff;
  box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.1);
}

.image {
  display: block;
  width: 100%;
  height: 100%;
}

.overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #035efc;
  overflow: hidden;
  width: 100%;
  height: 0;
  transition: 0.5s ease;
}

.gallery-container:hover .overlay {
  height: 50px;
}

.text {
  color: white;

  .view-btn {
    right: 10px;
    top: 12px;
    position: absolute;
    color: white;
    border: 1px solid white;
    font-size: 13px;

    &:hover {
      background-color: white;
      color: #035efc;
    }
  }
}

.carousel-control-next,
.carousel-control-prev {
  width: auto;
}
</style>
