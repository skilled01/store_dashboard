<template>
  <!--begin::Menu-->
  <div
    class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg-light-primary fw-semobold py-4 w-250px fs-6"
    data-kt-menu="true"
  >
    <!--begin::Menu item-->
    <div class="menu-item px-5">
      <div class="menu-content text-muted pb-2 px-5 fs-7 text-uppercase">
        {{translate('Options')}}
      </div>
    </div>
    <!--end::Menu item-->

    <!--begin::Menu item-->
    <div class="menu-item px-5">
      <a href="#" class="menu-link px-5"> {{translate('Active')}} </a>
    </div>

    <div class="menu-item px-5">
      <a href="#" class="menu-link px-5"> {{translate('Edit')}} </a>
    </div>

    <div class="menu-item px-5">
      <a href="#" class="menu-link px-5"> {{translate('Delete')}} </a>
    </div>


    <!--end::Menu item-->
  </div>
  <!--end::Menu-->
</template>

<script lang="ts" setup>

import {useI18n} from "vue-i18n";

const { t, te } = useI18n();

const translate = (text: string) => {
  if (te(text)) {
    return t(text);
  } else {
    return text;
  }
};

</script>
