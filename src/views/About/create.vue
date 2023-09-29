<template>
  <div  class="card">
    <!--begin::Header-->
    <div class="card-header border-0 pt-5">
      <h3 class="card-title align-items-start flex-column">
        <span class="card-label fw-bold fs-3 mb-1">
          {{translate('Create Section')}}
        </span>

      </h3>
    </div>
    <!--end::Header-->

    <!--begin::Body-->
    <div class="card-body py-3">
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

      <form>
        <div class="tab-content" id="myTabContent">
          <div class="tab-pane fade show active" id="kt_tab_pane_1" role="tabpanel">
            <input type="text"  class="form-control form-control-lg form-control-solid mb-4" v-model="form.title.ar" :placeholder="translate('Arabic Title')">
            <editor v-model="form.description.ar" />
          </div>

          <div class="tab-pane fade show" id="kt_tab_pane_2" role="tabpanel">
            <input type="text"  class="form-control form-control-lg form-control-solid mb-4" v-model="form.title.en" :placeholder="translate('English Title')">
            <editor  v-model="form.description.en" />
          </div>
        </div>

        <div class="mt-4">
          <uploader
            server="http://127.0.0.1:8000/api/media/upload"
            v-model="form.images"
            @add="(media) => slider.images.push(media.name)"
          >
          </uploader>
        </div>

        <div class="mt-4 d-flex justify-content-end">
          <button @click.prevent="save" class="btn btn-primary"> {{translate('save')}} </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import ApiService from "@/core/services/ApiService";
import Uploader from "vue-media-upload";
import { translate } from "@/core/services/TranslationService";
import Editor from "@/components/custom/editor.vue";
import { useRoute } from "vue-router";
import { useAboutsStore } from "@/stores/abouts";
import AlertService from "@/core/services/AlertService";


let schema = {
  images: [],
  title: {
    ar: '',
    en: ''
  },
  description: {
    ar: '',
    en: ''
  }
}

let form = ref(schema)


onMounted(async () => {

})

let router = useRoute()

watch(router, () => {
  init()
})

async function init() {
  if (router.name === 'update-about') {
    let result = await ApiService.get(`abouts/${router.params.id}`)
    form.value = result.data.data
  }
  else {
    product.value = schema
  }
}

let store = useAboutsStore();

const save = async () => {
  if (router.name === 'update-about') {
    await store.update(form.value)
    AlertService(store, translate("item updated successfully"));
  } else {
    await store.create(form.value)
    AlertService(store, translate("item updated successfully"));
  }
}
</script>