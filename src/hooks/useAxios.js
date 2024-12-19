import axios from "axios";
import { ref, unref } from "vue";

axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL;

export const useAxios = (url, config = {}) => {
	const data = ref([]);
	const error = ref(null);
	const loading = ref(false);

	// params는 반응형 객체이다.
	// console.log(config.params)
	const { params } = config;

	loading.value = true;
	axios(url, {
		...config,
		params : unref(params),
	}).then(res => {
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