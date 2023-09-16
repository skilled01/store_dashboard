import { ref } from "vue";
import { defineStore } from "pinia";
import ApiService from "@/core/services/ApiService";

export interface Tax {
  id: number
  name: object;
  status: string
}

export const useTaxesStore = defineStore("taxes", () => {
  const errors = ref({});
  const taxes = ref<Array<Tax>>([]);
  let links = ref({});

  function store(tax: Tax) {
    taxes.value.push(tax);
    errors.value = {};
  }

  function updateLinks(link: any) {
    delete link.data
    links.value = link
  }

  function updateTax(item: Tax) {
    let index = taxes.value.findIndex(tax =>  tax.id === item.id);
    taxes.value[index] = item;
  }

  function updateTaxStatus(id: Number, status: string) {
    let index = taxes.value.findIndex(tax =>  tax.id === id);
    taxes.value[index].status = status
  }

  function deleteTax(id: Number) {
    taxes.value = taxes.value.filter(tax =>  tax.id !== id)
  }

  function setError(error: any) {
    errors.value = { ...error };
  }

  async function create(payload: Tax) {
    try {
      let result0 = await ApiService.post("taxes", payload);
      const {data} = result0;
      store(data.data);
      return true;
    } catch (e) {
      const {response} = e;
      setError(response.data.errors);
      return errors.value;
    }
  }

  async function update(payload: Tax) {
    try {
      let result0 = await ApiService.put(`taxes/${payload.id}`, payload);
      const {data} = result0;
      updateTax(data.data);
      return true;
    } catch (e) {
      const {response} = e;
      setError(response.data.errors);
      return errors.value;
    }
  }

  async function updateStatus(payload: Tax) {
    try {
      let status = payload.status === 'active' ? 'disabled': 'active';
      let result0 = await ApiService.put(`/status/update/tax/${payload.id}/${status}`, {});
      const {data} = result0;
      updateTaxStatus(payload.id, status);
      return true;
    } catch (e) {
      const {response} = e;
      setError(response.data.errors);
      return errors.value;
    }
  }

  async function destroy(payload: Tax) {
    try {
      await ApiService.delete(`taxes/${payload.id}`);
      deleteTax(payload.id);
      return true;
    } catch (e) {
      const {response} = e;
      setError(response.data.errors);
      return errors.value;
    }
  }

  async function get(query: object|null = null) {
    try {
      let result0 = await ApiService.get("taxes?" + new URLSearchParams(query));
      const {data} = result0;
      taxes.value = data?.data?.data;
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
    taxes,
    links,
    create,
    get,
    update,
    updateStatus,
    destroy
  };
});
