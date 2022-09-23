<script>
import ModalDialog from '@/components/modal/ModalDialog.vue'
import VuePlayerVideo from 'vue3-player-video'
import { YoutubeVue3 } from 'youtube-vue3'

export default {
  name: 'PageVideo',
  components: {ModalDialog, VuePlayerVideo, YoutubeVue3},
  data() {
    return {
      mode: 'youtube',
      isShow: false,
      youtubeId: 's6VslPcxhs4'
    }
  },
  methods: {
    show() {
      this.isShow = true
      this.$refs.ModalDialog.show()

    },

    hide() {
      this.isShow = false
      this.$refs.ModalDialog.hide()
    }
  }
}
</script>

<template>
  <div class="page-video flex w-full">
    <div class="page-video__toast toast mr-auto" @click="show()">
      <div class="alert">
        <div class="page-video__content">
          <div class="page-video__play"><i></i></div>
          <div class="page-video__text">Посмотрите бесплатный видео-курс на Vue Mastery</div>
        </div>
      </div>
    </div>

    <ModalDialog ref="ModalDialog" @close="hide()">
      <template #body>
        <template v-if="isShow">
          <div class="-m-3">
            <!-- YouTube player -->
            <template v-if="mode === 'youtube'">
              <!-- https://www.npmjs.com/package/youtube-vue3 -->
              <YoutubeVue3 ref="youtube" :videoid="youtubeId" :loop="1" width="100%" />
            </template>
            <!-- HTML player -->
            <template v-else>
              <!-- https://github.com/enzostvs/vue3-player-video -->
              <VuePlayerVideo src="https://www.youtube.com/embed/s6VslPcxhs4" />
            </template>
          </div>
        </template>
      </template>
    </ModalDialog>
  </div>
</template>

<style lang="scss">
.page-video {
  &__toast {
    cursor: pointer;
  }

  &__content {
    display: flex;
  }

  &__play {
    content: '';
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: #73abfe;
    cursor: pointer;
  }

  &__play i {
    content: '';
    position: relative;
    display: flex;
    width: 0;
    height: 0;
    left: 1px;
    border-top: 5px solid transparent;
    border-bottom: 5px solid transparent;
    border-left: 8px solid #fff;
  }
}
</style>
