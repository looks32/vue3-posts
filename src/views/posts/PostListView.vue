<template>
	<div>
		<h2>게시글 목록</h2>
		<hr class="my-4"/>
		<PostFilter v-model:title="params.title_like" v-model:limit="params._limit"/>
		<hr class="my-4"/>

		<AppLoading v-if="loading"/>
		<AppError v-else-if="error" :message="error.message"/>

		<template v-else>
			<AppGrid :items="posts">
				<template v-slot="{item}">
					<PostItem :title="item.title" :content="item.content" :created-at="item.createdAt" @click="goPage(item.id)" @modal="openModal(item)"></PostItem>
				</template>
			</AppGrid>

			<AppPagination :current-page="params._page" :page-count="pageCount" @page="page => params._page = page"/>
		</template>

		<Teleport to="#modal">
			<PostModal v-model="show" :title="modalTitle" :content="modalContent" :created-at="modalCreatedAt"/>
		</Teleport>

		<template v-if="posts && posts.length > 0">
			<hr class="my-5">
			<AppCard>
				<PostDetailView :id="posts[0].id"></PostDetailView>
			</AppCard>
		</template>
	</div>
</template>

<script setup>
import PostItem from '@/components/posts/PostItem.vue';
// import { getPosts } from "@/api/posts";
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import PostDetailView from './PostDetailView.vue';
import PostFilter from '@/components/posts/PostFilter.vue';
import PostModal from '@/components/posts/PostModal.vue';
import AppLoading from '@/components/app/AppLoading.vue';
import AppError from '@/components/app/AppError.vue';
import { useAxios } from '@/hooks/useAxios';

const router = useRouter();
// const posts = ref([]);
// const error = ref(null);
// const loading = ref(false);
const params = ref({
	_sort: 'createdAt',
	_order: 'desc',
	_page : 1,
	_limit :3,
	title_like :''
})

const {data:posts, error, loading} = useAxios('/posts', {method: 'get', params});

const totalCount = ref(0);
const pageCount = computed(() => Math.ceil(totalCount.value / params.value._limit));

// const fetchPosts = async() => {
// 	try{
// 		loading.value = true;
// 		const {data, headers} = await getPosts(params.value);
// 		posts.value = data;
// 		totalCount.value = headers['x-total-count'];
// 		// 일단 강제로 넣음
// 		// totalCount.value = 10;
// 	} catch (err){
// 		// console.error(err)
// 		error.value = err;
// 	} finally {
// 		loading.value = false;
// 	}
// }
// watchEffect(fetchPosts)
// fetchPosts();
const goPage = (id) => {
	// 일반적인 이동방법
	// router.push(`/posts/${id}`);
	// name 을 이용한 이동방법
	router.push({
		name: 'PostDetail',
		params: {
			id,
		}
	})
}

// modal
const show = ref(false);
const modalTitle = ref('');
const modalContent = ref('');
const modalCreatedAt = ref('');

const openModal = ({title, content, createdAt}) => {
	show.value = true;
	modalTitle.value = title;
	modalContent.value = content;
	modalCreatedAt.value = createdAt;
}
</script>

<style lang="scss" scoped>

</style>