<template>
  <!--begin::Modal - Create account-->
  <div
      class="modal fade"
      id="kt_modal_create_account"
      ref="createAccountModalRef"
      tabindex="-1"
      aria-hidden="true"
  >
    <!--begin::Modal dialog-->
    <div class="modal-dialog mw-1000px">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Modal header-->
        <div class="modal-header">
          <!--begin::Title-->
          <h2><slot></slot></h2>
          <!--end::Title-->

          <!--begin::Close-->
          <div
              class="btn btn-sm btn-icon btn-active-color-primary"
              data-bs-dismiss="modal"
          >
            <KTIcon icon-name="cross" icon-class="fs-1" />
          </div>
          <!--end::Close-->
        </div>
        <!--end::Modal header-->

        <!--begin::Modal body-->
        <div class="modal-body scroll-y m-5">
          <!--begin::Stepper-->
          <div
              ref="createAccountRef"
              class="stepper stepper-links d-flex flex-column"
              id="kt_create_account_stepper"
          >
            <!--begin::Nav-->
            <div class="stepper-nav py-5">
              <!--begin::Step 1-->
              <div class="stepper-item current" data-kt-stepper-element="nav">
                <h3 class="stepper-title">Basic Info</h3>
              </div>
              <!--end::Step 1-->

              <!--begin::Step 2-->
              <div class="stepper-item" data-kt-stepper-element="nav">
                <h3 class="stepper-title">SEO</h3>
              </div>
              <!--end::Step 5-->
            </div>
            <!--end::Nav-->

            <!--begin::Form-->
            <form
                class="mx-auto mw-600px w-100 py-10"
                novalidate
                id="kt_create_account_form"
                @submit="handleStep"
            >
              <!--begin::Step 1-->
              <div class="current" data-kt-stepper-element="content">
                <!--begin::Wrapper-->
                <div class="w-100">
                  <slot name="basic"></slot>
                </div>
                <!--end::Wrapper-->
              </div>
              <!--end::Step 1-->

              <!--begin::Step 2-->
              <div data-kt-stepper-element="content">
                <!--begin::Wrapper-->
                <div class="w-100">
                  <slot name="seo"></slot>
                </div>
                <!--end::Wrapper-->
              </div>
              <!--end::Step 2-->

              <!--begin::Actions-->
              <div class="d-flex flex-stack pt-15">
                <!--begin::Wrapper-->
                <div class="me-2">
                  <button
                      type="button"
                      class="btn btn-lg btn-light-primary me-3"
                      data-kt-stepper-action="previous"
                      @click="previousStep()"
                  >
                    <KTIcon icon-name="arrow-left" icon-class="fs-3 me-1" />
                    Back
                  </button>
                </div>
                <!--end::Wrapper-->

                <!--begin::Wrapper-->
                <div>
                  <button
                      type="submit"
                      class="btn btn-lg btn-primary"
                      v-if="currentStepIndex === totalSteps - 1"
                      @click="formSubmit()"
                  >
                    <span class="indicator-label">
                      Submit
                      <KTIcon
                          icon-name="arrow-right"
                          icon-class="fs-3 ms-2 me-0"
                      />
                    </span>
                    <span class="indicator-progress">
                      Please wait...
                      <span
                          class="spinner-border spinner-border-sm align-middle ms-2"
                      ></span>
                    </span>
                  </button>

                  <button type="submit" class="btn btn-lg btn-primary" v-else>
                    Continue
                    <KTIcon
                        icon-name="arrow-right"
                        icon-class="fs-3 ms-1 me-0"
                    />
                  </button>
                </div>
                <!--end::Wrapper-->
              </div>
              <!--end::Actions-->
            </form>
            <!--end::Form-->
          </div>
          <!--end::Stepper-->
        </div>
        <!--end::Modal body-->
      </div>
      <!--end::Modal content-->
    </div>
    <!--end::Modal dialog-->
  </div>
  <!--end::Modal - Create project-->
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, defineProps, defineEmits } from "vue";
import { hideModal } from "@/core/helpers/dom";
import { StepperComponent } from "@/assets/ts/components/_StepperComponent";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { useForm } from "vee-validate";


    const _stepperObj = ref<StepperComponent | null>(null);
    const createAccountRef = ref<HTMLElement | null>(null);
    const createAccountModalRef = ref<HTMLElement | null>(null);
    const currentStepIndex = ref(0);

    let props = defineProps({form: Object, schema: Array});
    const emit = defineEmits()

    const formData = ref(props.form);

    onMounted(() => {
      _stepperObj.value = StepperComponent.createInsance(
          createAccountRef.value as HTMLElement
      );
    });

    const createAppSchema = [
        ...props?.schema
    ];

    // extracts the individual step schema
    const currentSchema = computed(() => {
      return createAppSchema[currentStepIndex.value];
    });

    const totalSteps = computed(() => {
      if (_stepperObj.value) {
        return _stepperObj.value.totalStepsNumber;
      } else {
        return 1;
      }
    });

    const { resetForm, handleSubmit } = useForm({
      validationSchema: currentSchema,
    });

    const previousStep = () => {
      if (!_stepperObj.value) {
        return;
      }

      currentStepIndex.value--;

      _stepperObj.value.goPrev();
    };

    const handleStep = handleSubmit((values) => {
      resetForm({
        values: {
          ...formData.value,
        },
      });

      formData.value = {
        ...values,
      };

      currentStepIndex.value++;

      if (!_stepperObj.value) {
        return;
      }

      _stepperObj.value.goNext();
    });

    const formSubmit = () => {
      emit('save', formData.value)

      resetForm({
        values: {
          ...formData.value,
        },
      });

      hideModal(createAccountModalRef.value);
    };

</script>
