import { ref } from "vue";
import { defineStore } from "pinia";
import ApiService from "@/core/services/ApiService";

export interface OrderStep {
  id: number
  name: object;
  image: string;
  status: string
}

export const useOrderStepsStore = defineStore("orderSteps", () => {
  const errors = ref({});
  const orderSteps = ref<Array<OrderStep>>([]);
  let links = ref({});

  function store(customer: OrderStep) {
    orderSteps.value.push(customer);
    errors.value = {};
  }

  function updateLinks(link: any) {
    delete link.data
    links.value = link
  }

  function updateOrderStep(item: OrderStep) {
    let index = orderSteps.value.findIndex(customer =>  customer.id === item.id);
    orderSteps.value[index] = item;
  }

  function updateOrderStepStatus(id: Number, status: string) {
    let index = orderSteps.value.findIndex(customer =>  customer.id === id);
    orderSteps.value[index].status = status
  }

  function deleteOrderStep(id: Number) {
    orderSteps.value = orderSteps.value.filter(customer =>  customer.id !== id)
  }

  function setError(error: any) {
    errors.value = { ...error };
  }

  async function create(payload: OrderStep) {
    try {
      let result0 = await ApiService.post("orderSteps", payload);
      const {data} = result0;
      store(data.data);
      return true;
    } catch (e) {
      const {response} = e;
      setError(response.data.errors);
      return errors.value;
    }
  }

  async function update(payload: OrderStep) {
    try {
      let result0 = await ApiService.put(`orderSteps/${payload.id}`, payload);
      const {data} = result0;
      updateOrderStep(data.data);
      return true;
    } catch (e) {
      const {response} = e;
      setError(response.data.errors);
      return errors.value;
    }
  }

  async function updateStatus(payload: OrderStep) {
    try {
      let status = payload.status === 'active' ? 'disabled': 'active';
      let result0 = await ApiService.put(`/status/update/order-step/${payload.id}/${status}`, {});
      const {data} = result0;
      updateOrderStepStatus(payload.id, status);
      return true;
    } catch (e) {
      const {response} = e;
      setError(response.data.errors);
      return errors.value;
    }
  }

  async function destroy(payload: OrderStep) {
    try {
      await ApiService.delete(`orderSteps/${payload.id}`);
      deleteOrderStep(payload.id);
      return true;
    } catch (e) {
      const {response} = e;
      setError(response.data.errors);
      return errors.value;
    }
  }

  async function get(query: object|null = null) {
    try {
      let result0 = await ApiService.get("orderSteps?" + new URLSearchParams(query));
      const {data} = result0;
      orderSteps.value = data?.data?.data;
      updateLinks(data?.data);
      return true;
    } catch (e) {
      const {response} = e;
      setError(response.data.errors);
      return errors.value;
    }
  }

  return {
    errors,
    orderSteps,
    links,
    create,
    get,
    update,
    updateStatus,
    destroy
  };
});
