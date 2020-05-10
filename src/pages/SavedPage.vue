<template>
  <section class="saved-page">
    <the-gallery v-if="!isLoading" :data="savedImages" />
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import TheGallery from '@/components/TheGallery.vue';
import { IImage } from '@/interfaces/image.interface';
import { galleryModule } from '@/store/modules/gallery.module';
import { globalsModule } from '@/store/modules/globals.module';

@Component({
  components: { TheGallery },
})
export default class SavedPage extends Vue {
  get isLoading(): boolean {
    return globalsModule.loading;
  }

  get savedImages(): IImage[] {
    return galleryModule.getSavedGallery;
  }

  async created() {
    await galleryModule.fetchImages();
  }
}
</script>

<style lang="scss" scoped></style>
