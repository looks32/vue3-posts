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


//  error: error.value, loading:loading.value 로 작성했을때 생기는 에러를 수정하기 위해 작업
// error 과 loading 은 ref로 만들어진 값을 반환한다.
// error, loading으로 바꾸면 되지만 그러면 반응형을 잃기때문에 아래와 같이 작업한다.(useAxios.js도 수정)
const  { error, loading, execute } = useAxios('/posts', {
	method : 'post',
},{
	// save 전에 axios 가 실행되면 안되기 때문에
	// immediate를 활용해 준다. 
	immediate:false,
	onSuccess : () => {
		router.push({name : 'PostList'})
		vSuccess('등록이 완료되었습니다.');
	},
	onError : (err) => {
		vAlert(err.message);
	}
});

const save = async() => {
	execute ({ ...form.value, createdAt : Date.now() })
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