<template>
	<div>
		<h2>게시글 목록</h2>
		<hr class="my-4"/>
		<PostFilter v-model:title="params.title_like" v-model:limit="params._limit"/>
		<hr class="my-4"/>
		<AppGrid :items="posts">
			<template v-slot="{item}">
				<PostItem :title="item.title" :content="item.content" :created-at="item.createdAt" @click="goPage(item.id)"></PostItem>
			</template>
		</AppGrid>
		<AppPagination :current-page="params._page" :page-count="pageCount" @page="page => params._page = page"/>
		
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
import { getPosts } from "@/api/posts";
import { computed, ref, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import PostDetailView from './PostDetailView.vue';
import AppCard from '@/components/AppCard.vue';
import AppPagination from '@/components/AppPagination.vue';
import AppGrid from '@/components/AppGrid.vue';
import PostFilter from '@/components/posts/PostFilter.vue';

const router = useRouter();
const posts = ref([]);
const params = ref({
	_sort: 'createdAt',
	_order: 'desc',
	_page : 1,
	_limit :3,
	title_like :''
})
const totalCount = ref(0);
const pageCount = computed(() => Math.ceil(totalCount.value / params.value._limit));

const fetchPosts = async() => {
	try{
		const {data, headers} = await getPosts(params.value);
		posts.value = data;
		totalCount.value = headers['x-total-count'];
		// 일단 강제로 넣음
		// totalCount.value = 10;
	} catch (error){
		console.error(error)
	}
}
watchEffect(fetchPosts)
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


</script>

<style lang="scss" scoped>

</style>