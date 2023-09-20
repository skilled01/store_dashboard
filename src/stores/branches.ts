import { ref } from "vue";
import { defineStore } from "pinia";
import ApiService from "@/core/services/ApiService";

export interface Branch {
  id: number
  name: object;
  image: string;
  status: string
}

export const useBranchesStore = defineStore("branches", () => {
  const errors = ref({});
  const branches = ref<Array<Branch>>([]);
  let links = ref({});

  function store(branch: Branch) {
    branches.value.push(branch);
    errors.value = {};
  }

  function updateLinks(link: any) {
    delete link.data
    links.value = link
  }

  function updateBranch(item: Branch) {
    let index = branches.value.findIndex(branch =>  branch.id === item.id);
    branches.value[index] = item;
  }

  function updateBranchStatus(id: Number, status: string) {
    let index = branches.value.findIndex(branch =>  branch.id === id);
    branches.value[index].status = status
  }

  function deleteBranch(id: Number) {
    branches.value = branches.value.filter(branch =>  branch.id !== id)
  }

  function setError(error: any) {
    errors.value = { ...error };
  }

  async function create(payload: Branch) {
    try {
      let result0 = await ApiService.post("branches", payload);
      const {data} = result0;
      store(data.data);
      return true;
    } catch (e) {
      const {response} = e;
      setError(response.data.errors);
      return errors.value;
    }
  }

  async function update(payload: Branch) {
    try {
      let result0 = await ApiService.put(`branches/${payload.id}`, payload);
      const {data} = result0;
      updateBranch(data.data);
      return true;
    } catch (e) {
      const {response} = e;
      setError(response.data.errors);
      return errors.value;
    }
  }

  async function updateStatus(payload: Branch) {
    try {
      let status = payload.status === 'active' ? 'disabled': 'active';
      let result0 = await ApiService.put(`/status/update/branch/${payload.id}/${status}`, {});
      const {data} = result0;
      updateBranchStatus(payload.id, status);
      return true;
    } catch (e) {
      const {response} = e;
      setError(response.data.errors);
      return errors.value;
    }
  }

  async function destroy(payload: Branch) {
    try {
      await ApiService.delete(`branches/${payload.id}`);
      deleteBranch(payload.id);
      return true;
    } catch (e) {
      const {response} = e;
      setError(response.data.errors);
      return errors.value;
    }
  }

  async function get(query: object|null = null) {
    try {
      let result0 = await ApiService.get("branches?" + new URLSearchParams(query));
      const {data} = result0;
      branches.value = data?.data?.data;
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
    branches,
    links,
    create,
    get,
    update,
    updateStatus,
    destroy
  };
});
