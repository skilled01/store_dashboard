<template>
  <custom-table :headers="headers" :list="store.abouts" has-actions>
    {{ translate('About') }}

    <template #actions>
      <button
          @click="data = null"
          type="button"
          class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#kt_modal_create_account"
      >
        {{translate('Add')}}
      </button>
    </template>

    <template #image="prop">
      <div class="cursor-pointer symbol symbol-35px">
        <img :src="prop.item.image ?? getAssetPath('public/media/misc/auth-bg.png')">
      </div>
    </template>

    <template #title="prop">
      <a
          href="#"
          class="text-dark fw-bold text-hover-primary d-block mb-1 fs-6"
      >{{ prop.item.title[locale]}}</a
      >
    </template>

    <template #description="prop">
      <div
        class="text-dark fw-bold text-hover-primary d-block mb-1 fs-6"
        v-html="prop.item.description[locale]"
      ></div
      >
    </template>

    <template #date="prop">
      <a
          href="#"
          class="text-dark fw-bold text-hover-primary d-block mb-1 fs-6"
      >{{ prop.item.created_at }}</a
      >
    </template>

    <template #Actions="prop">
        <div>
          <button
              type="button"
              class="btn btn-sm btn-icon btn-bg-light btn-active-color-primary"
              data-kt-menu-trigger="{default:'click', lg: 'hover'}"
              data-kt-menu-placement="bottom-end"
              data-kt-menu-flip="top-end"
          >
            <i class="bi bi-three-dots fs-5"></i>
          </button>
          <Dropdown :store="store" :model="prop.item" :show-status="false">
            <template #edit>
              <a href="#"
                 @click="data = prop.item"
                 class="menu-link px-5"
              > {{translate('Edit')}} </a>
            </template>
          </Dropdown>

        </div>

    </template>
  </custom-table>

  <bootstrap5-pagination
    class="mt-5"
   :data="store.links"
    @pagination-change-page="changePage"
  ></bootstrap5-pagination>
</template>

<script lang="ts" setup>
import CustomTable from "@/components/custom/custom-table.vue";
import {onMounted, onUpdated, ref} from "vue";
import {getAssetPath} from "@/core/helpers/assets";
import {useI18n} from "vue-i18n";
import Dropdown from "@/components/custom/model-option-dropdown.vue";
import {MenuComponent} from "@/assets/ts/components";
import { Bootstrap5Pagination } from "laravel-vue-pagination";
import { useAboutsStore } from "@/stores/abouts";

const { t, te } = useI18n();

let headers = ['id', 'title', 'image', 'description',  'date', 'Actions'];

let locale = 'ar';

const store = useAboutsStore();

const changePage = async (e) => {
  await store.get({page: e})
}

onMounted(() => {
  store.get();
  MenuComponent.reinitialization()
})

onUpdated(() => {
  MenuComponent.reinitialization()
})

const translate = (text: string) => {
  if (te(text)) {
    return t(text);
  } else {
    return text;
  }
};

let data = ref(null)

</script>