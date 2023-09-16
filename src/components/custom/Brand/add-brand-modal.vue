<template>
  <custom-modal :form="formData" :schema="schema" @save="save">
    {{translate('add Brand')}}
    <template #basic>
      <div class="mb-10 fv-row">
        <label class="form-label mb-3">{{ translate('arabic title') }}</label>
        <Field
            type="text"
            class="form-control form-control-lg form-control-solid"
            name="ar_name"
            placeholder=""
            value=""
        />
        <ErrorMessage
            class="fv-plugins-message-container invalid-feedback"
            name="ar_name"
        />
      </div>

      <div class="mb-10 fv-row">
        <label class="form-label mb-3">{{ translate('english title') }}</label>
        <Field
            type="text"
            class="form-control form-control-lg form-control-solid"
            name="en_name"
            placeholder=""
            value=""
        />
        <ErrorMessage
            class="fv-plugins-message-container invalid-feedback"
            name="en_name"
        />
      </div>

      <div class="mb-10 fv-row">
        <label class="form-label mb-3">{{ translate('image') }}</label>
        <Field
            type="file"
            class="form-control form-control-lg form-control-solid"
            name="image"
            accept="image/*"
            placeholder=""
            value=""
        />
        <ErrorMessage
            class="fv-plugins-message-container invalid-feedback"
            name="image"
        />
      </div>
    </template>
  </custom-modal>
</template>

<script setup lang="ts">
import CustomModal from "@/components/custom/custom-modal1.vue";
import {useI18n} from "vue-i18n";
import * as Yup from "yup";
import {onMounted, onUpdated, ref, watch} from "vue";
import {mixed} from "yup";
import {useBrandsStore} from "@/stores/brands";
import AlertService from "@/core/services/AlertService";
import {ErrorMessage, Field, useForm} from "vee-validate";

const { t, te } = useI18n();
const translate = (text: string) => {
  if (te(text)) {
    return t(text);
  } else {
    return text;
  }
}

let props = defineProps({
  data: Object
});


const formData = ref({
  ar_name: '',
  en_name: '',
  image: ''
});

const schema = [
  Yup.object({}),
  Yup.object({
    ar_name: Yup.string().required().label(translate('arabic title')),
    en_name: Yup.string().required().label(translate('english title')),
    image: Yup.object().shape({
      image: mixed().test("fileSize", translate("The file is too large"), (value) => {
        if (!value?.length) return true // attachment is optional
        return value[0].size <= 2000000
      }),
    })
  }),
  Yup.object({}),
];

const { resetForm } = useForm({
  validationSchema: schema,
});

watch(props, () => {
  formData.value.ar_name = props?.data?.name.ar ?? ''
  formData.value.en_name = props?.data?.name.en ?? ''

  resetForm({
    values: {
      ...formData.value,
    },
  });
});

const save = async (data) => {
  let brand = {
    name: {
      ar: data.ar_name,
      en: data.en_name,
    },
    image: data.image
  };

  await useBrandsStore().create(brand)

  AlertService(useBrandsStore())
}

</script>