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
      <slot name="status">
        <a @click.prevent="change" href="#" class="menu-link px-5"> {{translate(model.status === 'active' ? 'disable': 'active')}} </a>
      </slot>
    </div>

    <div class="menu-item px-5">
      <slot name="edit">
        <a @click.prevent="edit" href="#" class="menu-link px-5"> {{translate('Edit')}} </a>
      </slot>
    </div>

    <div class="menu-item px-5">
      <slot name="delete">
        <a @click.prevent="destroy" href="#" class="menu-link text-danger px-5"> {{translate('Delete')}} </a>
      </slot>
    </div>


    <!--end::Menu item-->
  </div>
  <!--end::Menu-->
</template>

<script lang="ts" setup>
import {useI18n} from "vue-i18n";
import Swal from "sweetalert2/dist/sweetalert2.js";
import AlertService from "@/core/services/AlertService";

const props = defineProps({
  model: Object,
  editMethod: {
    type: Object,
    default: null
  },
  destroyMethod: {
    type: Object,
    default: null
  },
  statusMethod: {
    type: Object,
    default: null
  },
  store: {
    type: Object,
    default: null
  }
})

const { t, te } = useI18n();

const translate = (text: string) => {
  if (te(text)) {
    return t(text);
  } else {
    return text;
  }
};

const change = async () => {
  if (props.statusMethod) {
    props.statusMethod()
    return;
  }

  await props.store.updateStatus(props?.model);
  AlertService(props.store, translate('status updated successfully'))
}

const edit = async () => {
  if (props.editMethod) {
    props.editMethod()
    return;
  }

  await props.store.update(props?.model);
  AlertService(props.store, translate('item updated successfully'))
}

const destroy = async () => {
  if (props.destroyMethod) {
    props.destroyMethod()
    return;
  }

  let toast = await Swal.fire({
    text: translate('are you sure'),
    icon: "info",
    buttonsStyling: false,
    confirmButtonText: translate('Delete'),
    cancelButtonText: translate('cancel'),
    heightAuto: true,
    customClass: {
      confirmButton: "btn fw-semobold btn-light-danger",
      cancelButton: "btn fw-semobold ",
    },
  })

  if (toast.isConfirmed) {
    if(await props.store.destroy(props?.model)) {
      AlertService(props.store, translate('item has been deleted'))
    }
  }

}

</script>
