<template>
  <div  class="card">
    <!--begin::Header-->
    <div class="card-header border-0 pt-5">
      <h3 class="card-title align-items-start flex-column">
        <span class="card-label fw-bold fs-3 mb-1">
          {{translate('Create Category')}}
        </span>

      </h3>
    </div>
    <!--end::Header-->

    <!--begin::Body-->
    <div class="card-body py-3 row">
      <div class="col-md-6">
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
              <input type="text"  class="form-control form-control-lg form-control-solid mb-4" v-model="title.ar" :placeholder="translate('Arabic Title')">
            </div>

            <div class="tab-pane fade show" id="kt_tab_pane_2" role="tabpanel">
              <input type="text"  class="form-control form-control-lg form-control-solid mb-4" v-model="title.en" :placeholder="translate('English Title')">
            </div>
          </div>

          <div class="mt-4">
            <uploader server="http://127.0.0.1:8000/api/media/upload">
            </uploader>
          </div>

          <div class="mt-4 d-flex justify-content-end">
            <button @click.prevent="save" class="btn btn-primary"> {{translate('save')}} </button>
          </div>
        </form>
      </div>

      <div class="col-md-6">
        <label class="form-label mb-3">{{ translate('Select Parent') }}</label>

        <div >
<!--          <tree :data="categories"/>-->
          <vue3-tree-vue.esm items=""></vue3-tree-vue.esm>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";
import { onMounted, ref } from "vue";
import Uploader from "vue-media-upload";
import { useCategoriesStore } from "@/stores/categories";
import Tree from "@/components/custom/tree.vue";

const { t, te } = useI18n();
const translate = (text) => {
  if (te(text)) {
    return t(text);
  } else {
    return text;
  }
};

let locale = 'ar';

let title = ref({
  ar: '',
  en: ''
})

let store = useCategoriesStore();

let categories = ref(store.categories.filter(category => category.parent === null))
onMounted(async () => {
if (!store.categories[0]) {
  await store.get()

  categories.value = store.categories.filter(category => category.parent === null)
}
})

const save = async () => {

}
</script>