<template>
  <div  class="card">
    <!--begin::Header-->
    <div class="card-header border-0 pt-5">
      <h3 class="card-title align-items-start flex-column">
        <span class="card-label fw-bold fs-3 mb-1">
          {{translate('Terms')}}
        </span>

      </h3>
      <div class="card-toolbar">
        <!--begin::Menu-->
        <slot name="actions"/>
        <!--end::Menu-->
      </div>
    </div>
    <!--end::Header-->

    <!--begin::Body-->
    <div class="card-body py-3">
      <ul class="nav nav-tabs nav-line-tabs mb-5 fs-6">
        <li class="nav-item">
          <a class="nav-link active" data-bs-toggle="tab" href="#kt_tab_pane_1">
            <label class="form-label mb-3">{{ translate('terms in arabic') }}</label>
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" data-bs-toggle="tab" href="#kt_tab_pane_2">
            <label class="form-label mb-3">{{ translate('terms in english') }}</label>
          </a>
        </li>
      </ul>

      <form>
        <div class="tab-content" id="myTabContent">
          <div class="tab-pane fade show active" id="kt_tab_pane_1" role="tabpanel">
            <ckeditor :editor="editor" v-model="description.ar" :config="editorConfig"></ckeditor>
          </div>

          <div class="tab-pane fade show" id="kt_tab_pane_2" role="tabpanel">
            <ckeditor :editor="editor" v-model="description.en" :config="editorConfig"></ckeditor>
          </div>
        </div>
        <div class="mt-4 d-flex justify-content-end">
          <button @click.prevent="save" class="btn btn-primary"> {{translate('save')}} </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { onMounted, ref } from "vue";
import ApiService from "@/core/services/ApiService";
import Swal from "sweetalert2/dist/sweetalert2.js";

const { t, te } = useI18n();
const translate = (text) => {
  if (te(text)) {
    return t(text);
  } else {
    return text;
  }
};

let description = ref({
  ar: '',
  en: ''
})

let editor =  ref(ClassicEditor);
let editorConfig =  ref({
// The configuration of the editor.
})

onMounted(async () => {
  try {
    let result = await ApiService.get('terms')
    let {data} = result
    if (data?.data) {
      description.value = data?.data?.description
    }
  }
  catch (e) {
    console.log(e)
  }
})

const save = async () => {
  try {
    await ApiService.post('terms', {description: description.value})
    Swal.fire({
      text: translate('privacy policy updated successfully'),
      icon: "success",
      buttonsStyling: false,
      confirmButtonText: "Done",
      heightAuto: true,
      customClass: {
        confirmButton: "btn fw-semobold btn-light-primary",
      },
    })
  }
  catch (e) {
    console.log(e)
  }
}
</script>