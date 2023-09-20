<template>
  <custom-modal2 @save="save">
    <slot></slot>

    <template #basic>
      <div class="mb-10 fv-row">
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
            <div>
              <label class="form-label mb-3">{{ translate('name') }}</label>
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

            <div>
              <label class="form-label mb-3">{{ translate('address') }}</label>
              <textarea
                class="form-control form-control-lg form-control-solid"
                v-model="form.address.ar"></textarea>
            </div>
          </div>
          <div class="tab-pane fade" id="kt_tab_pane_2" role="tabpanel">
            <div>
              <label class="form-label mb-3">{{ translate('name') }}</label>
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

            <div>
              <label class="form-label mb-3">{{ translate('address') }}</label>
              <textarea
                class="form-control form-control-lg form-control-solid"
                v-model="form.address.en"></textarea>
            </div>
          </div>
        </div>
      </div>

      <div class="mb-10 fv-row">
        <label class="form-label mb-3">{{ translate('email') }}</label>
        <input
          type="email"
          class="form-control form-control-lg form-control-solid"
          v-model="form.email"
        />
        <p
          class="fv-plugins-message-container invalid-feedback"
        >
        </p>
      </div>

      <div class="mb-10 fv-row">
        <label class="form-label mb-3">{{ translate('phone') }}</label>
        <input
          type="text"
          class="form-control form-control-lg form-control-solid"
          v-model="form.phone"
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
import { useBranchesStore } from "@/stores/branches";
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
  address: {
    ar: null,
    en: null
  },
  email: null,
  phone: null
})

let props = defineProps({
  data: {
    type: Object,
    default: {
      name: {
        ar: null,
        en: null
      },
      address: {
        ar: null,
        en: null
      },
      email: null,
      phone: null
    }
  }
})

watch(props, () => {
  form.value.name.ar = props.data?.name.ar
  form.value.name.en = props.data?.name.en
  form.value.address.ar = props.data?.address.ar
  form.value.address.en = props.data?.address.en
  form.value.email = props.data?.email
  form.value.phone = props.data?.phone
  form.value.id = props.data?.id
})

const save = async () => {
  if (props.data) {
    await useBranchesStore().update(form.value)
    AlertService(useBranchesStore(), translate('branch created successfully'))
  }
  else {
    await useBranchesStore().create(form.value)
    AlertService(useBranchesStore(), 'branch updated successfully')
  }
}
</script>