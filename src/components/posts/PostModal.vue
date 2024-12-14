<template>
	<!-- show는 외부에서 받을 수 없다. -->
	<!-- props는 내부에서 변경을 하면 안되기 때문 -->
	<AppModal v-model="show" title="게시글" @close="closeModal">
		<template #default>
			<div class="row g-3">
				<div class="col-3 text-muted">제목</div>
				<div class="col-9 text-muted">{{ title }}</div>
				<div class="col-3 text-muted">내용</div>
				<div class="col-9 text-muted">{{ content }}</div>
				<div class="col-3 text-muted">등록일</div>
				<div class="col-9 text-muted">{{ createdAt }}</div>
			</div>
		</template>
		<template #actions>
			<button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="closeModal">닫기</button>
		</template>
	</AppModal>
</template>

<script setup>
import { computed } from 'vue';


// 그래서 외부에서 v-model을 그대로 사용할 수 있도록 아래의 내용을 작성해준다.
const props = defineProps({
	modelValue: Boolean,
	title: String,
	content: String,
	createdAt : [String, Number],
});
const emit = defineEmits(['update:modelValue']);

// computed는 읽기 전용이지만
// 세터와 게터를 사용하면 쓰기도 가능하다.

const show = computed({
	get(){
		return props.modelValue
	},
	set(value){
		emit('update:modelValue', value)
	}
})

const closeModal = () => {
	show.value = false;
}
</script>

<style lang="scss" scoped>

</style>