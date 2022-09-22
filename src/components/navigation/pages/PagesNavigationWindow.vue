<template>
  <modal-dialog ref="modal" size="large">
    <template #header>
      <h3 class="mb-4">Меню "{{itemData.name}}"</h3>
    </template>

    <template #body>
      <div class="pages-nav-window grid grid-cols-4 gap-4">
<!--        <template v-if="Object.keys(itemData).length !== 0 && isShow">-->
<!--          <PagesNavigationWindowItem-->
<!--              v-for="(item, itemIndex) in itemData"-->
<!--              :key="itemIndex"-->
<!--              :item-data="item"-->
<!--              :level-data="1"-->
<!--          />-->
<!--        </template>-->
      </div>
    </template>
  </modal-dialog>
</template>

<script>
import ModalDialog from '@/components/modal/ModalDialog.vue';
import PagesNavigationWindowItem from '@/components/navigation/pages/PagesNavigationWindowItem.vue';

export default {
  name: 'PagesNavigationWindow',
  components: {
    ModalDialog,
    PagesNavigationWindowItem
  },
  props: {
    itemData: {
      type: [Object, Array],
      required: true
    }
  },
  data() {
    return {
      isShow: false
    }
  },
  watch: {
    isShow() {
      if(this.isShow) {
        this.$refs.modal.show()
      } else {
        this.$refs.modal.hide()
      }
    }
  },
  methods: {
    show() {
      this.isShow = true
    },

    hide() {
      this.isShow = false
    }
  }
}
</script>
