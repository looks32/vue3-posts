import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import AboutView from "@/views/AboutView.vue";
import PostCreateView from "@/views/posts/PostCreateView.vue";
import PostDetailView from "@/views/posts/PostDetailView.vue";
import PostListView from "@/views/posts/PostListView.vue";
import PostEditView from "@/views/posts/PostEditView.vue";
import NotFoundView from "@/views/NotFoundView.vue";
import NestedView from "@/views/nested/NestedView.vue";
import NestedOneView from "@/views/nested/NestedOneView.vue";
import NestedTwoView from "@/views/nested/NestedTwoView.vue";
import NestedHomeView from "@/views/nested/NestedHomeView.vue";
import MyPage from "@/views/MyPage.vue";

const routes = [
	{
	  path: '/',
	  // 이름 지정 가능
	  name: 'home',
	  component: HomeView,
	},
	{
	  path: '/about',
	  name: 'about',
	  component: AboutView,
	},
	{
	  path: '/posts',
	  name : 'PostList',
	  component: PostListView ,
	},
	{
	  path: '/posts/create',
	  name : 'PostCreate',
	  component: PostCreateView ,
	},
	{
	  path: '/posts/:id',
	  name : 'PostDetail',
	  component: PostDetailView ,
	  props : true
	//   props : route => ({id : parseInt(route.params.id)})
	},
	{
	  path: '/posts/:id/edit',
	  name : 'PostEdit',
	  component: PostEditView ,
	},
	{ 
	  path: '/:pathMatch(.*)*', 
	  name: 'NotFound', 
	  component: NotFoundView,
	},
	{ 
	  path: '/nested', 
	  name: 'Nested', 
	  component: NestedView,
	  children : [
		{
			path:'',
			name : 'NestedHomeView',
			component : NestedHomeView,
		},
		{
			path:'one',
			name : 'NestedOneView',
			component : NestedOneView,
		},
		{
			path:'two',
			name : 'NestedTwoView',
			component : NestedTwoView,
		},
	  ]
	},
	{
		path: '/my',
		name : 'MyPage', 
		component : MyPage,
		// beforeEnter: (to, from) => {
		// 	// my 페이지에서 들어가거나 나올때만 발동
		// 	console.log('to', to);
		// 	console.log('from', from);

		// 	//전역가드와 같은 사용 가능
		// 	return false;
		// 	return { name:'home' }
		// 	return '/'

			
		// 	//만약 query string을 제거해야하는 니즈가 있다면
		// 	//http://localhost:5173/my?search=text  를 작성하고 enter하면
		// 	//{search:'text'} 가 나옴
		// 	console.log(to.query);

		// 	if(Object.keys(to.query).length > 0) {
		// 		// to.path == 원래가 려고 했던 페페이지
		// 		// query 는 빈값으로 보냄.
		// 		return {path: to.path, query: {}}
		// 	}
		// }

		// 외부의 함수 실행 방법
		beforeEnter : [removeQueryString],
	}
  ];

  function removeQueryString(to) {
	if(Object.keys(to.query).length > 0) {
		return {path: to.path, query: {}}
	}
  }

const router = createRouter({
	history : createWebHistory('/'),
	routes,
});

// router.beforeEach((to, from) => {
// 	// 이동 할 페이지
// 	console.log('to', to);
// 	// 이동하기 전 페이지
// 	console.log('from', from);
	
// 	if(to.name === 'MyPage'){
// 		// return 을 하지 않으면 정상적으로 이동하고 fasle를 반환하면 라우팅을 취소한다.
// 		// 이동이 되지 않음
// 		// return false

// 		// home으로 강제 이동시킨다.
// 		// name 활용
// 		// return { name:'home' }
// 		// path 활용
// 		return '/'
// 	}
// })

export default router;