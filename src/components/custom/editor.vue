<template>
  <ckeditor :editor="editor" :config="editorConfig" v-model="body" />
</template>

<script setup>
import { ref, watch } from "vue";
  import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

  let props = defineProps({
    modelValue: String
  })

  let body = ref(props.modelValue);

  let emit = defineEmits(['update:modelValue'])

  watch(body, () => {
    emit('update:modelValue', body.value)
  })

  let editor = ref(ClassicEditor);
  let editorConfig = ref({
    // The configuration of the editor.
  });

</script>