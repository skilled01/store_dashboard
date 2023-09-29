<template>
  <custom-table :headers="headers" :list="store.subscriptions" has-actions>
    {{ translate('Subscriptions') }}

    <template #email="prop">
      <a
          href="#"
          class="text-dark fw-bold text-hover-primary d-block mb-1 fs-6"
      >{{ prop.item.email}}</a
      >
    </template>

    <template #ip="prop">
      <a
        href="#"
        class="text-dark fw-bold text-hover-primary d-block mb-1 fs-6"
      >{{ prop.item.ip}}</a
      >
    </template>

    <template #location="prop">
      <a
        href="#"
        class="text-dark fw-bold text-hover-primary d-block mb-1 fs-6"
      >{{ prop.item.location}}</a
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
          <Dropdown :store="store" :model="prop.item" :show-edit="false" :show-status="false">
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
import Dropdown from "@/components/custom/model-option-dropdown.vue";
import {MenuComponent} from "@/assets/ts/components";
import { Bootstrap5Pagination } from "laravel-vue-pagination";
import { translate } from "@/core/services/TranslationService";
import { useSubscriptionsStore } from "@/stores/subscriptions";

let headers = ['id', 'email', 'ip', 'location', 'Actions'];

let locale = 'ar';

const store = useSubscriptionsStore();

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