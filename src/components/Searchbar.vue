<template>
	<form class="searchbar" id="searchbar" @submit.prevent="$emit('change', model)">
		<input type="search" class="input-search" placeholder="Buscar" v-model="model"/>
		<v-btn type="submit" icon="mdi-magnify" variant="plain" density="comfortable" form="searchbar"></v-btn>
	</form>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'Search-bar',
	data() {
		return {
			model: ''
		}
	}
})
</script>

<style lang="scss" scoped>
.searchbar {
	background: #f2f2f2;
	border-radius: 4px;
	padding: 4px;
}

.input-search {
	outline: none;
	padding: 4px;
}
</style>
  