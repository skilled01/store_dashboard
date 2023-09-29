<template>
  <div class="tab-pane fade show" id="kt_tab_panel_3" role="tabpanel">
    <div class="col-md-6 offset-3">
      <div class="mb-5 d-flex justify-content-between">
        <h3>
          {{ translate("Texts") }}
        </h3>
        <button
          @click="
            slider.texts.push({
              text: {ar: null, en: null},
              style: null,
              position: null,
            })
          "
          class="btn btn-icon btn-outline"
        >
          +
        </button>
      </div>

      <div v-for="(text, i) in slider.texts" :key="i">
        <div class="mt-4">
          <ul class="nav nav-tabs nav-line-tabs mb-5 fs-6">
            <li class="nav-item">
              <a class="nav-link active" data-bs-toggle="tab" href="#kt_tab_pane_11">
                <label class="form-label mb-3">{{ translate('arabic') }}</label>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" data-bs-toggle="tab" href="#kt_tab_pane_21">
                <label class="form-label mb-3">{{ translate('english') }}</label>
              </a>
            </li>
          </ul>

          <div class="tab-content" id="myTabContent">
            <div class="tab-pane fade show active" id="kt_tab_pane_11" role="tabpanel">
              <input type="text" class="form-control form-control-lg form-control-solid mb-4" v-model="text.text.ar"
                     :placeholder="translate('Arabic Text')">
            </div>

            <div class="tab-pane fade show" id="kt_tab_pane_21" role="tabpanel">
              <input type="text" class="form-control form-control-lg form-control-solid mb-4" v-model="text.text.en"
                     :placeholder="translate('English Text')">
            </div>
          </div>
        </div>

        <div class="mt-4">
          <label class="form-label mb-3">
            {{translate("Style")}}
          </label>
          <input type="text" min="0" v-model="text.style"
                 class="form-control form-control-lg form-control-solid mb-4" :placeholder="translate('Style')">
        </div>

        <div class="mt-4">
          <label class="form-label mb-3">
            {{translate("position")}}
          </label>
          <select
            v-model="text.position"
            class="form-control form-control-lg form-control-solid mb-4"
          >
            <option value="center-center">
              {{translate('Center Center')}}
            </option>

            <option value="top-center">
              {{translate('Top Center')}}
            </option>
            <option value="top-left">
              {{translate('Top Left')}}
            </option>
            <option value="top-right">
              {{translate('Top Right')}}
            </option>

            <option value="bottom-center">
              {{translate('Bottom Center')}}
            </option>
            <option value="bottom-left">
              {{translate('Bottom Left')}}
            </option>
            <option value="bottom-right">
              {{translate('Bottom Right')}}
            </option>

          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { translate } from "@/core/services/TranslationService";
import Uploader from "vue-media-upload";
import { inject } from "vue";
import Editor from "@/components/custom/editor.vue";

let locale = inject('locale');

defineProps({
  slider: Object
})
</script>