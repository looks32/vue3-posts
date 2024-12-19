import axios from "axios";
import { isRef, ref, unref, watchEffect } from "vue";

axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL;

const defaultConfig = {
	method : 'get'
}

export const useAxios = (url, config = {}) => {
	const response = ref(null);
	const data = ref(null);
	const error = ref(null);
	const loading = ref(false);

	const { params } = config;
	const execute = () => {
		data.value = null;
		error.value = null;
		loading.value = true;
		axios(url, {
			...defaultConfig,
			...config,
			params : unref(params),
		}).then(res => {
			response.value = res;
			data.value = res.data;
		}).catch(err => {
			error.value = err;
		}).finally(() => {
			loading.value = false;
		});
	};

	// useAxios는 공통이기 때문에 많은 사람들이 사용한다.
	// params를 반응형으로 보내는 사람도 있을 것이고
	// 일반 object로 넘기는 사람이 있기 때문에 아래와 같이 사용해준다.
	if (isRef(params)){
		watchEffect(execute);
	}else {
		execute();
	}

	
	return {
		response,
		data,
		error,
		loading
	}
}