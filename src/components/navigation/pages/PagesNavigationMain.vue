<script>
import IconPlus from "@/components/icons/IconPlus.vue";
import IconSettings from "@/components/icons/IconSettings.vue";
import IconPage from "@/components/icons/IconPage.vue";

export default {
  name: 'PageNavigationMain',

  components: {IconPlus, IconSettings, IconPage},

  props: {
    itemData: {
      type: Object,
      required: true
    }
  },

  methods: {
    addPage() {
      this.$router.push({name: 'page-create'})
    }
  }
}
</script>

<template>
  <div class="pages-nav-item flex flex-col is_main">
    <div class="pages-nav-item__box flex">
      <div class="pages-nav-item__icon mr-3 is_main">
        <IconPage />
      </div>
      <div class="pages-nav-item__name w-full mr-3 ">
        <b>{{itemData.name}}</b>
      </div>
      <div class="pages-nav-item__buttons">
        <button type="button" class="pages-nav-item__button" @click="addPage()">
          <IconPlus />
        </button>
      </div>
    </div>
  </div>
</template>
