import http from './HttpClient';

class AuthService {
	login(data: any) {
		return http.post('admin/login', data);
	}

	async logout() {
		return http.delete('admin/logout')
			.then(res => {
				localStorage.removeItem('access_token');
				localStorage.removeItem('user_logged');
				return res;
			});
	}

	getToken() {
		return localStorage.getItem('access_token');
	}

	getUser() {
		return JSON.parse(localStorage.getItem('user_logged') ?? '');
	}

	setToken(token: string) {
		localStorage.setItem('access_token', token);
	}

	setUser(user: any) {
		localStorage.setItem('user_logged', JSON.stringify(user));
	}
}

export default new AuthService();