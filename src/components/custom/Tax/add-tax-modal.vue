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
        <label class="form-label mb-3">{{ translate('type') }}</label>
        <select
          class="form-control form-control-lg form-control-solid"
          v-model="form.type"
        >
          <option value="inclusive">{{translate('inclusive')}}</option>
          <option value="exclusive">{{translate('exclusive')}}</option>
        </select>
        <p
          class="fv-plugins-message-container invalid-feedback"
        >
        </p>
      </div>

      <div class="mb-10 fv-row">
        <label class="form-label mb-3">{{ translate('value') }}</label>
        <input
          type="number"
          class="form-control form-control-lg form-control-solid"
          v-model="form.value"
        />
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
import { useTaxesStore } from "@/stores/taxes";
import AlertService from "@/core/services/AlertService";

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
  type: 'inclusive',
  value: null
})

let props = defineProps({
  data: {
    type: Object,
    default: {
      name: {
        ar: null,
        en: null
      },
      type: 'inclusive',
      value: null
    }
  }
})

watch(props, () => {
  form.value.name = props.data?.name
  form.value.type = props.data?.type
  form.value.value = props.data?.value
  form.value.id = props.data?.id
})

const save = async () => {
  if (props.data) {
    useTaxesStore().update(form.value)
    AlertService(useTaxesStore())
  }
  else {
    await useTaxesStore().create(form.value)
    AlertService(useTaxesStore())
  }
}
</script>