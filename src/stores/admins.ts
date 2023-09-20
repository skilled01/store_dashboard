import { ref } from "vue";
import { defineStore } from "pinia";
import ApiService from "@/core/services/ApiService";

export interface Admin {
  id: number
  name: object;
  image: string;
  status: string
}

export const useAdminsStore = defineStore("admins", () => {
  const errors = ref({});
  const admins = ref<Array<Admin>>([]);
  let links = ref({});

  function store(admin: Admin) {
    admins.value.push(admin);
    errors.value = {};
  }

  function updateLinks(link: any) {
    delete link.data
    links.value = link
  }

  function updateAdmin(item: Admin) {
    let index = admins.value.findIndex(admin =>  admin.id === item.id);
    admins.value[index] = item;
  }

  function updateAdminStatus(id: Number, status: string) {
    let index = admins.value.findIndex(admin =>  admin.id === id);
    admins.value[index].status = status
  }

  function deleteAdmin(id: Number) {
    admins.value = admins.value.filter(admin =>  admin.id !== id)
  }

  function setError(error: any) {
    errors.value = { ...error };
  }

  async function create(payload: Admin) {
    try {
      let result0 = await ApiService.post("admins", payload);
      const {data} = result0;
      store(data.data);
      return true;
    } catch (e) {
      const {response} = e;
      setError(response.data.errors);
      return errors.value;
    }
  }

  async function update(payload: Admin) {
    try {
      let result0 = await ApiService.put(`admins/${payload.id}`, payload);
      const {data} = result0;
      updateAdmin(data.data);
      return true;
    } catch (e) {
      const {response} = e;
      setError(response.data.errors);
      return errors.value;
    }
  }

  async function updateStatus(payload: Admin) {
    try {
      let status = payload.status === 'active' ? 'disabled': 'active';
      let result0 = await ApiService.put(`/status/update/admin/${payload.id}/${status}`, {});
      const {data} = result0;
      updateAdminStatus(payload.id, status);
      return true;
    } catch (e) {
      const {response} = e;
      setError(response.data.errors);
      return errors.value;
    }
  }

  async function destroy(payload: Admin) {
    try {
      await ApiService.delete(`admins/${payload.id}`);
      deleteAdmin(payload.id);
      return true;
    } catch (e) {
      const {response} = e;
      setError(response.data.errors);
      return errors.value;
    }
  }

  async function get(query: object|null = null) {
    try {
      let result0 = await ApiService.get("admins?" + new URLSearchParams(query));
      const {data} = result0;
      admins.value = data?.data?.data;
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
    admins,
    links,
    create,
    get,
    update,
    updateStatus,
    destroy
  };
});
