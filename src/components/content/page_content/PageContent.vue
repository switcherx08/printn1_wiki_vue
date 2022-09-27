<script>
import PageVideo from '@/components/content/page_video/PageVideo.vue';
import PageCode from "@/components/content/page_code/PageCode.vue";

export default {
  name: 'PageContent',
  components: {
    // eslint-disable-next-line vue/no-unused-components
    PageCode,
    // eslint-disable-next-line vue/no-unused-components
    PageVideo
  },
  props: {
    itemData: {
      type: String,
      required: true
    }
  }
}
</script>

<template>
  <div class="page-content-view" v-html="itemData">
  </div>
</template>

<style lang="scss" src="./page_content.scss"></style>
