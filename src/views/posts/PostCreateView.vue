<template>
	<div>
		<h2>게시글 등록</h2>
		<hr class="my-4"/>
		<AppError v-if="error" :message="error.message" />
		<PostForm v-model:title="form.title" v-model:content="form.content" @submit.prevent="save">
			<template #actions>
				<button type="button" class="btn btn-outline-dark" @click="goListPage">목록</button>
				<button class="btn btn-primary" :disabled="loading">
					<template v-if="loading">
						<span class="spinner-grow spinner-grow-sm" aria-hidden="true"></span>
						<span class="visually-hidden" role="status">Loading...</span>
					</template>
					<template v-else>
						저장
					</template>
				</button>

			</template>
		</PostForm>
	</div>
</template>

<script setup>
import { createPost } from '@/api/posts';
import PostForm from '@/components/posts/PostForm.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAlert } from '@/composables/alert';
import { useAxios } from '@/hooks/useAxios';

const { vAlert, vSuccess } = useAlert();


const router = useRouter();
const form = ref({
	title:null,
	content:null
})

const loading = ref(false);
const error = ref(null);


// 비동기 내부함수로 내부적으로 구현되어 있기 때문에
// 여기에서는 구현이 어렵다.
// 그래서 useAxios안에서(컴포저블 안에서) 내용을 수정해준다.
const save = async() => {
	({ error: error.value, loading:loading.value } = useAxios('/posts', {
		method : 'post',
		data : { ...form.value, createdAt : Date.now() }
	},{
		onSuccess : () => {
			router.push({name : 'PostList'})
			vSuccess('등록이 완료되었습니다.');
		},
		onError : (err) => {
			vAlert(err.message);
		}
	}));
}

// const save = async() => {
// 	try{
// 		loading.value = true;
// 		await createPost({
// 			...form.value,
// 			createdAt : Date.now(),
// 		});
// 		router.push({name : 'PostList'})
// 		vSuccess('등록이 완료되었습니다.');
// 	} catch (err) {
// 		// console.error(err);
// 		vAlert(err.message);
// 		error.value = err;
// 	} finally {
// 		loading.value = false;
// 	}
// }

const goListPage = () => {
	router.push({
		name:'PostList'
		
	})
}

</script>

<style lang="scss" scoped>

</style>