<template>
	<div class="page-container">
		<v-toolbar class="page-header" prominent>
			<v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
			<v-toolbar-title>
				<h5 class="title" v-if="title">{{ title }}</h5>
				<v-breadcrumbs class="breadcrumbs" :items="breadcrumbs" v-if="breadcrumbs">
					<template v-slot:divider>
						<v-icon icon="mdi-chevron-right"></v-icon>
					</template>
				</v-breadcrumbs>
			</v-toolbar-title>
			<v-spacer></v-spacer>
			<v-btn icon @click="logout()">
				<v-icon>mdi-export</v-icon>
			</v-btn>
		</v-toolbar>
		<div class="page-content" id="page-content" :class="classObj" :style="styleObj">
			<slot></slot>
		</div>
		<v-footer class="page-footer" v-if="hideFooter == false">
			<slot name="footer"></slot>
		</v-footer>
	</div>
</template>
  
<script lang="ts">
import AuthService from '@/services/AuthService';
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'PageContent',
	props: {
		hideFooter: Boolean,
		padding: String,
		title: String,
		breadcrumbs: Object({ 
			title: String,
			disabled: Boolean,
			route: String
		})
	},
	data() {
		return {
			drawer: true,
			styleObj: {
				padding: this.padding ?? '20px'
			},
			classObj: {
				'hide-footer': this.hideFooter
			}
		}
	},
	methods: {
		scrollTop() {
			document.getElementById('page-content')
				?.scrollTo({ top: 0, behavior: 'smooth' });
		},
		logout() {
			AuthService.logout()
				.then(res => {
					this.$router.push('/login');
				})
		}
	}
});
</script>
  
<style lang="scss" scoped>
$toolbar-height: 70px;
$footer-height: 64px;

.page-container {
	position: relative;
	height: 100vh;
}

.page-header {
	height: $toolbar-height;
	display: flex;
	flex-direction: row;
	align-items: center;
	background-color: #FFFFFF;
	box-shadow: 0 0 25px 0 rgba(45, 69, 95, .1);
	z-index: 100;
}

.page-footer {
	position: absolute;
	bottom: 0;
	width: 100%;
	padding: 0;
	height: $footer-height;
	box-shadow: 0 0 25px 0 rgba(45, 69, 95, .1);
	z-index: 100;
}

.page-content {
	position: relative;
	overflow-y: auto;
	height: calc(100vh - $toolbar-height - $footer-height);

	&.hide-footer {
		height: calc(100vh - $toolbar-height);
	}
}

.title {
	font-size: 18px;
	font-weight: 500;
	margin: 0px;
	line-height: 1.5;
	color: #374948;
}
</style>
  