<template>
	<!-- 일반 사용 -->
	<!-- <Transition>
		<div v-if="show" class="app-alert alert" role="alert" :class="typeStyle">{{ message }}</div>
	</Transition> -->

	<!-- 이름 넣기 -->
	<!-- <Transition name="slide">
		<div v-if="show" class="app-alert alert" role="alert" :class="typeStyle">{{ message }}</div>
	</Transition> -->

	<!-- Transition Group -->
	<div class="app-alert">
		<TransitionGroup name="slide">
			<div v-for="({message , type}, i) in items" :key="i" class="app alert" role="alert" :class="typeStyle(type)">{{ message }}</div>
		</TransitionGroup>
	</div>
</template>

<script setup>

// Transition Group
defineProps({
	items: Array
})

// 매개 변수로 받기 때문에
// computed를 사용할 수 없다. 
// 그래서 매서드로 구현 (뭔말 인지 모르겠지만 일단 ㄱ)
const typeStyle = (type) => type === 'error' ? 'alert-danger' : 'alert-primary';


// Transtion
// import { computed } from 'vue';

// const props = defineProps({
// 	show:{
// 		type:Boolean,
// 		default : false,
// 	},
// 	message: {
// 		type: String,
// 		required : true, 
// 	},
// 	type : {
// 		type: String,
// 		default:'error',
// 		validator : value => ['success', 'error'].includes(value),
// 	}
// })
// const typeStyle = computed(() => props.type === 'error' ? 'alert-danger' : 'alert-primary');
</script>

<style scoped>
	.app-alert {
		position: fixed;
		top: 10px;
		right: 10px;
	}

	/* 기본 사용 방법 */
	/* .v-enter-from,
	.v-leave-to {
		opacity: 0;
	}

	.v-enter-active,
	.v-leave-active {
		transition: opacity 0.5s ease;
	}

	.v-enter-to,
	.v-leave-from {
		opacity: 1;
	} */

	.slide-enter-from,
	.slide-leave-to {
		opacity: 0;
		transform: translateY(-30px);
	}

	.slide-enter-active,
	.slide-leave-active {
		transition: all 0.5s ease;
	}

	.slide-enter-to,
	.slide-leave-from {
		opacity: 1;
		transform: translateY(0);
	}
</style>