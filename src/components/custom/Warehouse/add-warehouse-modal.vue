<template>
  <custom-modal2 @save="save">
    <slot></slot>
    <template #basic>
      <div class="mb-10 fv-row">
        <ul class="nav nav-tabs nav-line-tabs mb-5 fs-6">
          <li class="nav-item">
            <a class="nav-link active" data-bs-toggle="tab" href="#kt_tab_pane_1">
              <label class="form-label mb-3">{{ translate('arabic title') }}</label>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" data-bs-toggle="tab" href="#kt_tab_pane_2">
              <label class="form-label mb-3">{{ translate('english title') }}</label>
            </a>
          </li>
        </ul>

        <div class="tab-content" id="myTabContent">
          <div class="tab-pane fade show active" id="kt_tab_pane_1" role="tabpanel">
            <input
              type="text"
              class="form-control form-control-lg form-control-solid"
              v-model="form.name.ar"
            />
            <p
              class="fv-plugins-message-container invalid-feedback"
            >
            </p>
          </div>
          <div class="tab-pane fade" id="kt_tab_pane_2" role="tabpanel">
            <input
              type="text"
              class="form-control form-control-lg form-control-solid"
              v-model="form.name.en"
            />
            <p
              class="fv-plugins-message-container invalid-feedback"
            >
            </p>
          </div>
        </div>
      </div>

      <div class="mb-10 fv-row">
        <label class="form-label mb-3">{{ translate('number') }}</label>
        <input
          type="text"
          class="form-control form-control-lg form-control-solid"
          v-model="form.number"
        />
        <p
          class="fv-plugins-message-container invalid-feedback"
        >
        </p>
      </div>

      <div class="mb-10 fv-row">
        <label class="form-label mb-3">{{ translate('city') }}</label>
        <input
          type="text"
          class="form-control form-control-lg form-control-solid"
          v-model="form.location.city"
        />
        <p
          class="fv-plugins-message-container invalid-feedback"
        >
        </p>
      </div>

      <div class="mb-10 fv-row">
        <label class="form-label mb-3">{{ translate('address') }}</label>
        <textarea
          type="text"
          class="form-control form-control-lg form-control-solid"
          v-model="form.location.address"
        >
      </textarea>
        <p
          class="fv-plugins-message-container invalid-feedback"
        >
        </p>
      </div>
    </template>
  </custom-modal2>
</template>

<script setup lang="ts">

import CustomModal2 from "@/components/custom/custom-modal2.vue";
import {useI18n} from "vue-i18n";
import { ref, watch } from "vue";
import AlertService from "@/core/services/AlertService";
import { useWarehousesStore } from "@/stores/warehouses";

const { t, te } = useI18n();

const translate = (text: string) => {
  if (te(text)) {
    return t(text);
  } else {
    return text;
  }
}

let form = ref({
  name: {
    ar: null,
    en: null
  },
  number: 'inclusive',
  location: {
    city: null,
    address: null
  }
})

let props = defineProps({
  data: {
    type: Object,
    default: {
      name: {
        ar: null,
        en: null
      },
      number: 'inclusive',
      location: {
        city: null,
        address: null
      }
    }
  }
})

watch(props, () => {
  form.value.name.ar = props.data?.name.ar
  form.value.name.en = props.data?.name.en
  form.value.number = props.data?.number
  form.value.location = props.data?.location
  form.value.id = props.data?.id
})

const save = async () => {
  if (props.data) {
    console.log(form.value)
    delete form.value.type;
    await useWarehousesStore().update(form.value)
    AlertService(useWarehousesStore())
  }
  else {
    await useWarehousesStore().create(form.value)
    AlertService(useWarehousesStore())
  }
}
</script>