<template>
  <div class="tab-pane fade show active" id="kt_tab_panel_1" role="tabpanel">
    <div class="col-md-6 offset-3">
      <ul class="nav nav-tabs nav-line-tabs mb-5 fs-6">
        <li class="nav-item">
          <a class="nav-link active" data-bs-toggle="tab" href="#kt_tab_pane_1">
            <label class="form-label mb-3">{{ translate('arabic') }}</label>
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" data-bs-toggle="tab" href="#kt_tab_pane_2">
            <label class="form-label mb-3">{{ translate('english') }}</label>
          </a>
        </li>
      </ul>

      <div class="tab-content" id="myTabContent">
        <div class="tab-pane fade show active" id="kt_tab_pane_1" role="tabpanel">
          <input type="text" class="form-control form-control-lg form-control-solid mb-4" v-model="product.name.ar"
                 :placeholder="translate('Arabic Name')">
          <editor v-model="product.description.ar"/>
        </div>

        <div class="tab-pane fade show" id="kt_tab_pane_2" role="tabpanel">
          <input type="text" class="form-control form-control-lg form-control-solid mb-4" v-model="product.name.en"
                 :placeholder="translate('English Name')">
          <editor v-model="product.description.en"/>
        </div>
      </div>

      <div class="mt-4">
        <input type="number" min="0" v-model="product.price"
               class="form-control form-control-lg form-control-solid mb-4" :placeholder="translate('price')">
      </div>

      <div class="mt-4">
        <uploader
          server="http://127.0.0.1:8000/api/media/upload"
          v-model="product.images"
          @add="(media) => product.images.push(media.name)"
        >
        </uploader>
      </div>
    </div>
  </div>
</template>

<script setup>
import { translate } from "@/core/services/TranslationService";
import Editor from "@/components/custom/editor.vue";
import Uploader from "vue-media-upload";
import { inject } from "vue";

let locale = inject('locale');

defineProps({
  product: Object
})
</script>