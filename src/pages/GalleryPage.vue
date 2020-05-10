<template>
  <section class="gallery-page">
    <the-gallery v-if="!isLoading" :data="images" />
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { IImage } from '../interfaces/image.interface';
import TheGallery from '@/components/TheGallery.vue';
import { galleryModule } from '@/store/modules/gallery.module';
import { globalsModule } from '@/store/modules/globals.module';

@Component({
  components: { TheGallery },
})
export default class GalleryPage extends Vue {
  get isLoading(): boolean {
    return globalsModule.loading;
  }

  get images(): IImage[] {
    return galleryModule.gallery;
  }

  async created() {
    await galleryModule.fetchImages();
  }
}
</script>

<style lang="scss" scoped></style>
