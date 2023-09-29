<template>
  <div class="tab-pane fade show" id="kt_tab_panel_2" role="tabpanel">
    <div class="col-md-6 offset-3">
      <div class="mb-5 d-flex justify-content-between">
        <h3>
          {{ translate("Buttons") }}
        </h3>
        <button
          @click="
            slider.actions.push({
              name: {ar: null, en: null},
              link: null,
              style: null,
              position: null,
            })
          "
          class="btn btn-icon btn-outline"
        >
          +
        </button>
      </div>

      <div
        v-for="(action, i) in slider.actions" :key="i"
        class="border rounded p-4 mt-2 position-relative"
      >
        <span
          @click="slider.actions.filter((item) => item.name !== action.name)"
          class="position-absolute btn btn-outline-warning btn-sm end-0 mx-4 top-0 my-2">
          <i class="fa fa-close"></i>
        </span>
        <div class="mt-4">
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
              <input type="text" class="form-control form-control-lg form-control-solid mb-4" v-model="action.name.ar"
                     :placeholder="translate('Arabic Name')">
            </div>

            <div class="tab-pane fade show" id="kt_tab_pane_2" role="tabpanel">
              <input type="text" class="form-control form-control-lg form-control-solid mb-4" v-model="action.name.en"
                     :placeholder="translate('English Name')">
            </div>
          </div>
        </div>

        <div class="mt-4">
          <label class="form-label mb-3">
            {{translate("link")}}
          </label>
          <input type="text" min="0" v-model="action.link"
                 class="form-control form-control-lg form-control-solid mb-4" :placeholder="translate('link')">
        </div>

        <div class="mt-4">
          <label class="form-label mb-3">
            {{translate("style")}}
          </label>
          <input type="text" min="0" v-model="action.style"
                 class="form-control form-control-lg form-control-solid mb-4" :placeholder="translate('style')">
        </div>

        <div class="mt-4">
          <label class="form-label mb-3">
            {{translate("position")}}
          </label>
          <select
            v-model="action.position"
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