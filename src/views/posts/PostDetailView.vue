<template>
	<AppLoading v-if="loading" />

	<AppError v-else-if="error" :message="error.message" />

	<div v-else>
		<h2>{{post.title}}</h2>
		<p>id : {{ props.id }} isOdd : {{ isOdd }}</p>
		<p>{{post.content}}</p>
		<p class="text-muted">{{$dayjs((post.createdAt)).format('YYYY.MM.DD HH:mm:ss')}}</p>
		<hr class="my-4"/>
		<AppError v-if="removeError" :message="removeError.message" />
		<div class="row g-2">
			<div class="col-auto">
				<button class="btn btn-outline-dark">이전글</button>
			</div>
			<div class="col-auto">
				<button class="btn btn-outline-dark">다음글</button>
			</div>
			<div class="col-auto me-auto"></div>
			<div class="col-auto">
				<button class="btn btn-outline-dark" @click="goListPage">목록</button>
			</div>
			<div class="col-auto">
				<button class="btn btn-outline-primary" @click="goEditPage">수정</button>
			</div>
			<div class="col-auto">
				<button
					class="btn btn-outline-danger"
					@click="remove"
					:disabled="removeLoading"
				>
					<template v-if="removeLoading">
						<span
							class="spinner-grow spinner-grow-sm"
							role="status"
							aria-hidden="true"
						></span>
						<span class="visually-hidden">Loading...</span>
					</template>
					<template v-else> 삭제 </template>
				</button>
			</div>
		</div>
	</div>
</template>

<script setup>
import { onBeforeRouteLeave, onBeforeRouteUpdate, useRouter } from 'vue-router';
import { deletePost } from '@/api/posts';
import { useAlert } from '@/composables/alert';
import { useAxios } from '@/hooks/useAxios';
import { computed, toRef, toRefs } from 'vue';
import { useNumber } from '@/composables/number';

const { vAlert, vSuccess } = useAlert();

const props = defineProps({
	id: [String, Number]
})

const router = useRouter();
// const id = route.params.id;

// 일반적인 toRef 방법
// const idRef = toRef(props, 'id');

// 구조분해할당을 사용하는 toRefs 방법
const { id : idRef } = toRefs(props)

const { isOdd } = useNumber(idRef);
const url = computed(() => `/posts/${props.id}`);
const { error, loading, data:post } = useAxios(url);

const {
	error: removeError,
	loading: removeLoading,
	execute,
} = useAxios(
	`/posts/${props.id}`,
	{ method: 'delete' },
	{
		immediate: false,
		onSuccess: () => {
			vSuccess('삭제가 완료되었습니다.');
			router.push({ name: 'PostList' });
		},
		onError: err => {
			vAlert(err.message);
		},
	},
);


const remove = async () => {
	if (confirm('삭제 하시겠습니까?') === false) {
		return;
	}
	execute();
};

const goListPage = () => {
	router.push({name:'PostList'});
}

const goEditPage = () => {
	router.push({name:'PostEdit', params: {id : props.id} });
}


// 주소창에 내용이 변경될 때
// <button class="btn btn-outline-dark" @click="$router.push('/posts/1')">다음글</button>
onBeforeRouteUpdate(() => {
	console.log('onBeforeRouteUpdate', onBeforeRouteUpdate)
})

// 원래 주소에서 벗어날때
onBeforeRouteLeave(() => {
	console.log('onBeforeRouteLeave', onBeforeRouteLeave)
})
</script>

<script>
// beforeRouteEnter 해당하는 컴포넌트로 진입할때.
export default {
	beforeRouteEnter(){
		console.log('beforeRouteEnter')
	}
}
</script>

<style lang="scss" scoped>

</style>