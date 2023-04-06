import http from './HttpClient';

class OrderService {
	getAll(params?: any) {
		return http.get('admin/orders', { params });
	}

	sendCertificate(order: any) {
		return http.post('v3/eduzz/delivery/custom', {
			edz_produtor_email: "rrm32@e-marcas.com.br",
			edz_produtor_cod: "934140",
			edz_cli_apikey: "59e9c98256",
			edz_fat_status: "3",
			edz_gtr_param1: order.file_hash,
			edz_cli_email: order.email,
			edz_fat_cod: order.transaction?.invoice,
			edz_fat_dtcadastro: order.created_at
		});
	}
}

export default new OrderService();