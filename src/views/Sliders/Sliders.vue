<template>
  <custom-table :headers="headers" :list="store.sliders" has-actions>
    {{ translate('Sliders') }}

    <template #actions>
      <button
        @click="$router.push('/theme/sliders/create')"
        type="button"
        class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#kt_modal_create_account"
      >
        {{translate('Add Slider')}}
      </button>
    </template>

    <template #image="prop">
      <div class="cursor-pointer symbol symbol-35px">
        <img :src="prop.item.image ?? getAssetPath('public/media/misc/auth-bg.png')" :alt="prop.item.name[locale]">
      </div>
    </template>

    <template #name="prop">
      <a
        href="#"
        class="text-dark fw-bold text-hover-primary d-block mb-1 fs-6"
      >{{ prop.item.name}}</a
      >
    </template>


    <template #page="prop">
      <a
        href="#"
        class="text-dark fw-bold text-hover-primary d-block mb-1 fs-6"
      >{{ prop.item.page}}</a
      >
    </template>

    <template #classes="prop">
      <a
        href="#"
        class="text-dark fw-bold text-hover-primary d-block mb-1 fs-6"
      >{{ prop.item.classes}}</a
      >
    </template>

    <template #status="prop">
      <span
        :class="{
            'badge-light-success': prop.item.status == 'active',
            'badge-light-danger': prop.item.status != 'active',
          }"
        class="badge"
      >{{ prop.item.status }}</span
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
        <Dropdown :store="store" :model="prop.item">
          <template #edit>
            <a
              @click="router.push(`/products/${prop.item.id}/edit`)"
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
import Dropdown from "@/components/custom/model-option-dropdown.vue";
import {MenuComponent} from "@/assets/ts/components";
import { Bootstrap5Pagination } from "laravel-vue-pagination";
import router from "@/router";
import { useSlidersStore } from "@/stores/sliders";
import { translate } from "@/core/services/TranslationService";

let headers = ['id', 'name', 'image', 'page',  'classes', 'status', 'date', 'Actions'];

let locale = 'ar';

const store = useSlidersStore();

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

let data = ref(null)

</script>