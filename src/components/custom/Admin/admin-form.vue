<template>
  <custom-modal2 @save="save">
    <slot></slot>

    <template #basic>

      <div class="mb-10 fv-row">
        <label class="form-label mb-3">{{ translate('first name') }}</label>
        <input
          type="text"
          class="form-control form-control-lg form-control-solid"
          v-model="form.first_name"
        />
        <p
          class="fv-plugins-message-container invalid-feedback"
        >
        </p>
      </div>

      <div class="mb-10 fv-row">
        <label class="form-label mb-3">{{ translate('last name') }}</label>
        <input
          type="text"
          class="form-control form-control-lg form-control-solid"
          v-model="form.last_name"
        />
        <p
          class="fv-plugins-message-container invalid-feedback"
        >
        </p>
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

      <div v-if="!data" class="mb-10 fv-row">
        <label class="form-label mb-3">{{ translate('password') }}</label>
        <input
          type="password"
          class="form-control form-control-lg form-control-solid"
          v-model="form.password"
        />
        <p
          class="fv-plugins-message-container invalid-feedback"
        >
        </p>
      </div>

      <div v-if="!data" class="mb-10 fv-row">
        <label class="form-label mb-3">{{ translate('password confirmation') }}</label>
        <input
          type="password"
          class="form-control form-control-lg form-control-solid"
          v-model="form.password_confirmation"
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
import { useAdminsStore } from "@/stores/admins";
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
  first_name: null,
  last_name: null,
  email: null,
  phone: null,
  password: null,
  password_confirmation: null,
})

let props = defineProps({
  data: {
    type: Object,
    default: {
      first_name: null,
      last_name: null,
      email: null,
      phone: null,
      password: null,
      password_confirmation: null,
    }
  }
})

watch(props, () => {
  form.value.first_name = props.data?.user?.first_name
  form.value.last_name = props.data?.user?.last_name
  form.value.email = props.data?.user?.email
  form.value.phone = props.data?.user?.phone
  form.value.id = props.data?.id
})

const save = async () => {
  if (props.data) {
    await useAdminsStore().update(form.value)
    AlertService(useAdminsStore(), translate('admin created successfully'))
  }
  else {
    await useAdminsStore().create(form.value)
    AlertService(useAdminsStore(), translate('admin updated successfully'))
  }
}
</script>