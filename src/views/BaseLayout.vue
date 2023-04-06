<template>
	<v-layout full-height>
		<v-navigation-drawer v-model="drawer" disable-route-watcher>
			<v-toolbar prominent>
				<img class="v-toolbar__logo" :src="logo" />
			</v-toolbar>
			<v-list density="compact" nav>
				<v-list-item 
					link 
					:prepend-icon="item.icon" 
					:title="item.title" 
					:value="item.value"
					:to="item.to" 
					:key="item.value" 
					v-for="item in items">
				</v-list-item>
			</v-list>
		</v-navigation-drawer>
		<v-main>
			<router-view />
		</v-main>
	</v-layout>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'BaseLayout',
	data() {
		return {
			drawer: true,
			logo: require('@/assets/images/logo.webp'),
			items: [
				{ title: 'Início', icon: 'mdi-view-dashboard', value: 'home', to: '/home' },
				{ title: 'Pedidos', icon: 'mdi-account-box', value: 'orders', to: '/orders' },
			]
		}
	},
});
</script>
  
<style lang="scss">
.v-navigation-drawer {
	box-shadow: 0 0 25px 0 rgba(45, 69, 95, .1);
	border: 0;
	z-index: 999;

	.v-toolbar {
		background-color: #FFFFFF;
		padding: 0 20px;
	}

	.v-toolbar__logo {
		width: 180px;
	}

	.v-list {
		margin-top: 50px;
		padding: 0;
	}

	.v-list-item {
		height: 50px;
		margin: 0 !important;
		border-radius: 0;

		&:before {
			transition: all .3s ease-in-out;
			-webkit-transition: all .3s ease-in-out;
			-moz-transition: all .3s ease-in-out;
			-o-transition: all .3s ease-in-out;
			-ms-transition: all .3s ease-in-out;
			content: "";
			width: 3px;
			height: 0;
			display: inline-block;
			background: rgb(var(--v-theme-primary));
			position: absolute;
			top: 0;
			right: 0;
			opacity: 0;
		}

		&.v-list-item--active {
			background-color: #EFEBF9;
			color: rgb(var(--v-theme-primary));

			&:before {
				height: 100%;
				opacity: 1;
			}

			.v-list-item-title {
				color: rgb(var(--v-theme-primary));
			}
		}

		.v-list-item-title {
			font-size: 14px;
			font-weight: 400;
			line-height: 18px;
			color: #777d74;
		}
	}
}

.v-main {
	background-color: rgb(var(--v-theme-background));
}
</style>
  