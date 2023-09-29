<template>
  <div class="tab-pane fade show active" id="kt_tab_panel_1" role="tabpanel">
    <div class="col-md-6 offset-3">


      <div class="mt-4">
        <label class="form-label mb-3">
          {{translate("Name")}}
        </label>
        <input type="text" min="0" v-model="slider.name"
               class="form-control form-control-lg form-control-solid mb-4" :placeholder="translate('Name')">
      </div>

      <div class="mt-4">
        <label class="form-label mb-3">
          {{translate("Page")}}
        </label>
        <input type="text" min="0" v-model="slider.page"
               class="form-control form-control-lg form-control-solid mb-4" :placeholder="translate('Page')">
      </div>

      <div class="mt-4">
        <label class="form-label mb-3">
          {{translate("Classes")}}
        </label>
        <input type="text" min="0" v-model="slider.classes"
               class="form-control form-control-lg form-control-solid mb-4" :placeholder="translate('Classes')">
      </div>

      <div class="mt-4">
        <uploader
          server="http://127.0.0.1:8000/api/media/upload"
          v-model="slider.images"
          @add="(media) => slider.images.push(media.name)"
        >
        </uploader>
      </div>
    </div>
  </div>
</template>

<script setup>
import { translate } from "@/core/services/TranslationService";
import Uploader from "vue-media-upload";
import { inject } from "vue";

let locale = inject('locale');

defineProps({
  slider: Object
})
</script>