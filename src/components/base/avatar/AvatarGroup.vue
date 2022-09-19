<script>
import AvatarUser from "@/components/base/avatar/AvatarUser.vue"
import AvatarInitials from "@/components/base/avatar/AvatarInitials.vue"

export default {
  name: "AvatarGroup",
  components: {AvatarUser, AvatarInitials},
  props: {
    itemData: {
      type: Object,
      required: true
    },
    sizeClass: {
      type: String,
      default: 'is-42x42'
    },
    countInitials: {
      type: [String, Number, null],
      default: null
    },
    viewLimit: {
      type: Number,
      default: 3
    }
  }
}
</script>

<template>
  <div class="avatar-stack avatar-group -space-x-4">
    <AvatarUser
        v-for="itemLimit in viewLimit"
        :key="itemLimit"
        is-rounded
        :picture="itemData[itemLimit] ? itemData[itemLimit].image : ''"
        :alt="itemData[itemLimit] ? itemData[itemLimit].name: ''"
        class="avatar-stack__item"
        :class="sizeClass"
    />

    <template v-if="countInitials && parseInt(countInitials) !== 0">
      <AvatarInitials
          is-rounded
          :item-initials="countInitials"
          size-number="1"
          :class="sizeClass"
      />
    </template>
  </div>
</template>

<style lang="scss" src="./avatar_group.scss"></style>
