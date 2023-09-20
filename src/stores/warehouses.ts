import { ref } from "vue";
import { defineStore } from "pinia";
import ApiService from "@/core/services/ApiService";

export interface Warehouse {
  id: number
  name: object;
  status: string
}

export const useWarehousesStore = defineStore("warehouses", () => {
  const errors = ref({});
  const warehouses = ref<Array<Warehouse>>([]);
  let links = ref({});

  function store(warehouse: Warehouse) {
    warehouses.value.push(warehouse);
    errors.value = {};
  }

  function updateLinks(link: any) {
    delete link.data
    links.value = link
  }

  function updateWarehouse(item: Warehouse) {
    let index = warehouses.value.findIndex(warehouse =>  warehouse.id === item.id);
    warehouses.value[index] = item;
  }

  function updateWarehouseStatus(id: Number, status: string) {
    let index = warehouses.value.findIndex(warehouse =>  warehouse.id === id);
    warehouses.value[index].status = status
  }

  function deleteWarehouse(id: Number) {
    warehouses.value = warehouses.value.filter(warehouse =>  warehouse.id !== id)
  }

  function setError(error: any) {
    errors.value = { ...error };
  }

  async function create(payload: Warehouse) {
    try {
      let result0 = await ApiService.post("warehouses", payload);
      const {data} = result0;
      store(data.data);
      return true;
    } catch (e) {
      const {response} = e;
      setError(response.data.errors);
      return errors.value;
    }
  }

  async function update(payload: Warehouse) {
    try {
      let result0 = await ApiService.put(`warehouses/${payload.id}`, payload);
      const {data} = result0;
      updateWarehouse(data.data);
      return true;
    } catch (e) {
      const {response} = e;
      setError(response.data.errors);
      return errors.value;
    }
  }

  async function updateStatus(payload: Warehouse) {
    try {
      let status = payload.status === 'active' ? 'disabled': 'active';
      let result0 = await ApiService.put(`/status/update/warehouse/${payload.id}/${status}`, {});
      const {data} = result0;
      updateWarehouseStatus(payload.id, status);
      return true;
    } catch (e) {
      const {response} = e;
      setError(response.data.errors);
      return errors.value;
    }
  }

  async function destroy(payload: Warehouse) {
    try {
      await ApiService.delete(`warehouses/${payload.id}`);
      deleteWarehouse(payload.id);
      return true;
    } catch (e) {
      const {response} = e;
      setError(response.data.errors);
      return errors.value;
    }
  }

  async function get(query: object|null = null) {
    try {
      let result0 = await ApiService.get("warehouses?" + new URLSearchParams(query));
      const {data} = result0;
      warehouses.value = data?.data?.data;
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
    warehouses,
    links,
    create,
    get,
    update,
    updateStatus,
    destroy
  };
});
