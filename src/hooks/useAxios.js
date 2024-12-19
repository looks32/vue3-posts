import axios from "axios";
import { ref } from "vue";

axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL;

export const useAxios = (url, config = {}) => {
	const data = ref([]);
	const error = ref(null);
	const loading = ref(false);

	loading.value = true;
	axios(url, config).then(res => {
		data.value = res.data;
	}).catch(err => {
		error.value = err;
	}).finally(() => {
		loading.value = false;
	});

	return {
		data,
		error,
		loading
	}
}