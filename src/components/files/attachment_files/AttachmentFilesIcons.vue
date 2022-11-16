<script>
import IconWord from "@/components/icons/files/IconWord.vue";
import IconExcel from "@/components/icons/files/IconExcel.vue";
import IconPdf from "@/components/icons/files/IconPdf.vue";
import IconImage from "@/components/icons/files/IconImage.vue";
import IconAudio from "@/components/icons/files/IconAudio.vue";
import IconZip from "@/components/icons/files/IconZip.vue";
import IconTxt from "@/components/icons/files/IconTxt.vue";
import IconFile from "@/components/icons/files/IconFile.vue";

export default {
  name: 'AttachmentFilesIcons',

  components: {
    IconFile,
    IconTxt,
    IconZip,
    IconAudio,
    IconImage,
    IconPdf,
    IconExcel,
    IconWord
  },

  props: {
    iconFormat: {
      type: String,
      default: ''
    }
  }
}
</script>

<template>
  <span class="attachment-files-icon">
    <IconWord v-if="iconFormat === 'word'" />
    <IconExcel v-else-if="iconFormat === 'excel'" />
    <IconPdf v-else-if="iconFormat === 'pdf'" />
    <IconImage v-else-if="iconFormat === 'image'" />
    <IconAudio v-else-if="iconFormat === 'audio'" />
    <IconZip v-else-if="iconFormat === 'zip'" />
    <IconTxt v-else-if="iconFormat === 'txt'" />
    <IconFile v-else />
  </span>
</template>
