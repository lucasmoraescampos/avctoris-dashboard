<template>
	<div class="page-login">
		<v-card class="container" :loading="loading">
			<template v-slot:loader="{ isActive }: any">
        <v-progress-linear :active="isActive" color="primary" height="4" indeterminate>
        </v-progress-linear>
      </template>

			<h2 class="login-title">Entrar</h2>
			<form class="login-form" id="form-login" @submit.prevent="submit()">
				<div>
					<v-text-field type="email" label="Email" variant="underlined" color="primary" v-model="email"></v-text-field>
				</div>
				<div>
					<v-text-field type="password" label="Senha" variant="underlined" color="primary" v-model="password"></v-text-field>
				</div>
				<v-btn type="submit" size="x-large" color="primary" form="form-login" :disabled="loading">Login</v-btn>
			</form>
		</v-card>
	</div>

	<v-snackbar
		:timeout="4500"
		v-model="snackbar">
    {{ message }}
	</v-snackbar>
</template>
  
<script lang="ts">
import AuthService from '@/services/AuthService';
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'LoginView',
	data() {
		return {
			email: '',
			password: '',
			snackbar: false,
			message: '',
			loading: false
		}
	},
	methods: {
		submit() {
			if (!this.validate()) return;
			this.loading = true;
			const data = {
				email: this.email,
				password: this.password
			}
			AuthService.login(data)
				.then(res => {
					this.loading = false;
					AuthService.setToken(res.data.token);
					AuthService.setUser(res.data.user);
					this.$router.push('/home');
				})
				.catch(error => {
					this.loading = false;
					if (error.response.status == 400) {
						this.message = error.response.data.message;
						this.snackbar = true;
					}
				});
		},
		validate() {
			if (this.email.length == 0) {
				this.message = 'E-mail é obrigatório. Por favor, informe o e-mail.';
				this.snackbar = true;
				return false;
			}
			if (this.password.length == 0) {
				this.message = 'Senha é obrigatória. Por favor, informe a senha';
				this.snackbar = true;
				return false;
			}
			return true;
		}
	}
});
</script>

<style lang="scss" scoped>
.page-login {
	display: flex;
	background: linear-gradient(to right bottom, rgba(var(--v-theme-primary), 0.1), rgba(var(--v-theme-primary), 1));
	background-repeat: no-repeat;
	background-size: cover;
	width: 100%;
	height: 100vh;
	background-attachment: fixed;
}

.container {
	width: 400px;
	margin: auto;
	padding: 36px 48px 48px 48px;
}

.login-title {
	padding: 15px;
	font-size: 22px;
	font-weight: 600;
	text-align: center;
	margin-bottom: 10px;
}

.login-form {
	display: grid;
	grid-template-columns: 1fr;
	row-gap: 16px;
}
</style>