<template>
  <div class="card">
    <!--begin::Header-->
    <div class="card-header border-0 pt-5">
      <h3 class="card-title align-items-start flex-column">
        <span class="card-label fw-bold fs-3 mb-1">
          {{ translate("Create Slider") }}
        </span>
      </h3>
    </div>
    <!--end::Header-->

    <!--begin::Body-->
    <div class="card-body py-3 row">
      <div>
        <ul
          class="nav nav-tabs nav-line-tabs mb-5 d-flex fs-6 justify-content-center"
        >
          <li class="nav-item">
            <a
              class="nav-link active"
              data-bs-toggle="tab"
              href="#kt_tab_panel_1"
            >
              <label class="form-label mb-3">
                {{translate("slider") }}
              </label>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" data-bs-toggle="tab" href="#kt_tab_panel_2">
              <label class="form-label mb-3">
                {{translate("Action Buttons") }}
              </label>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" data-bs-toggle="tab" href="#kt_tab_panel_3">
              <label class="form-label mb-3">
                {{translate("Texts") }}
              </label>
            </a>
          </li>
        </ul>
      </div>

      <div class="tab-content" id="myTabContent">
        <basic-slider-form  :slider="slider"/>

        <action-buttons :slider="slider"/>

        <slider-texts  :slider="slider"/>
      </div>

      <div class="mt-4 d-flex justify-content-center">
        <button @click.prevent="save" class="btn btn-primary">
          {{ translate("save") }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { inject, onMounted, ref, watch } from "vue";
import { useSlidersStore } from "@/stores/sliders";
import AlertService from "@/core/services/AlertService";
import { translate } from "@/core/services/TranslationService";
import { useRoute } from "vue-router";
import ApiService from "@/core/services/ApiService";
import BasicSliderForm from "@/views/Sliders/BasicSliderForm.vue";
import ActionButtons from "@/views/Sliders/ActionButtons.vue";
import SliderTexts from "@/views/Sliders/SliderTexts.vue";

let locale = inject('locale');

let schema = {
  name: null,
  page: null,
  classes: null,
  images: [],
  actions: [
    {
      name: {ar: null, en: null},
      link: null,
      style: null,
      position: null,
    },
  ],
  texts: [
    {
      text: {ar: null, en: null},
      style: null,
      position: null,
    },
  ],
};

let slider = ref(schema);

let router = useRoute()

onMounted(() => {
  init();
})

watch(router, () => {
  init()
})

async function init() {
  if (router.name === 'update-product') {
    let result = await ApiService.get(`sliders/${router.params.id}`)
    slider.value = result.data.data
    slider.value.warehouses = slider.value.actions.map(warehouse => warehouse.pivot)
    slider.value.taxes = slider.value.taxes.texts(tax => tax.pivot)
  }
  else {
    slider.value = schema
  }
}

const save = async () => {
  if (router.name === 'update-slider') {
    await useSlidersStore().update(slider.value);
    AlertService(useSlidersStore(), translate("item updated successfully"));
  }else {
    await useSlidersStore().create(slider.value);
    AlertService(useSlidersStore(), translate("item created successfully"));
  }
};
</script>