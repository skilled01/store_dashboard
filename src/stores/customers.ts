import { ref } from "vue";
import { defineStore } from "pinia";
import ApiService from "@/core/services/ApiService";

export interface Customer {
  id: number
  name: object;
  image: string;
  status: string
}

export const useCustomersStore = defineStore("customers", () => {
  const errors = ref({});
  const customers = ref<Array<Customer>>([]);
  let links = ref({});

  function updateLinks(link: any) {
    delete link.data
    links.value = link
  }

  function updateCustomer(item: Customer) {
    let index = customers.value.findIndex(customer =>  customer.id === item.id);
    customers.value[index] = item;
  }

  function updateCustomerStatus(id: Number, status: string) {
    let index = customers.value.findIndex(customer =>  customer.id === id);
    customers.value[index].status = status
  }

  function setError(error: any) {
    errors.value = { ...error };
  }

  async function update(payload: Customer) {
    try {
      let result0 = await ApiService.put(`customers/${payload.id}`, payload);
      const {data} = result0;
      updateCustomer(data.data);
      return true;
    } catch (e) {
      const {response} = e;
      setError(response.data.errors);
      return errors.value;
    }
  }

  async function updateStatus(payload: Customer) {
    try {
      let status = payload.status === 'active' ? 'disabled': 'active';
      let result0 = await ApiService.put(`/status/update/customer/${payload.id}/${status}`, {});
      const {data} = result0;
      updateCustomerStatus(payload.id, status);
      return true;
    } catch (e) {
      const {response} = e;
      setError(response.data.errors);
      return errors.value;
    }
  }

  async function get(query: object|null = null) {
    try {
      let result0 = await ApiService.get("customers?" + new URLSearchParams(query));
      const {data} = result0;
      customers.value = data?.data?.data;
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
    customers,
    links,
    get,
    update,
    updateStatus,
  };
});
