<template>
	<v-dialog :value="show" transition="dialog-bottom-transition" scrollable width="auto">
		<v-card class="order-dialog" :loading="loading">
			<template v-slot:loader="{ isActive }: any">
        <v-progress-linear :active="isActive" color="primary" height="4" indeterminate>
        </v-progress-linear>
      </template>
			<v-toolbar class="dialog-toolbar" title="Pedido"></v-toolbar>
			<v-list :lines="false">
				<v-list-item title="Title" :subtitle="order.title" v-if="order.title"></v-list-item>
				<v-list-item title="E-mail" :subtitle="order.email" v-if="order.email"></v-list-item>
				<v-list-item title="Informação Adicional" :subtitle="order.description_additional" v-if="order.description_additional"></v-list-item>
				<v-list-item title="Autores" :subtitle="order.description_author" v-if="order.description_author"></v-list-item>
				<v-list-item title="Titulares" :subtitle="order.description_holder" v-if="order.description_holder"></v-list-item>
				<v-list-item title="Hash" :subtitle="order.file_hash" v-if="order.file_hash"></v-list-item>
				<v-list-item title="Arquivo" :subtitle="order.file_filename" v-if="order.file_filename"></v-list-item>
				<v-list-item title="Categoria" :subtitle="order.file_category" v-if="order.file_category"></v-list-item>
				<v-list-item title="Tamanho" :subtitle="order.file_size" v-if="order.file_size"></v-list-item>
				<v-list-item title="Tipo" :subtitle="order.file_type" v-if="order.file_type"></v-list-item>
				<v-list-item title="Cupom" :subtitle="order.coupon" v-if="order.coupon"></v-list-item>
				<v-list-item title="Gerado em" :subtitle="formatDate(order.generated_at)" v-if="order.generated_at"></v-list-item>
				<v-list-item title="Pago em" :subtitle="formatDate(order.paid_at)" v-if="order.paid_at"></v-list-item>
				<v-list-item title="Expirado em" :subtitle="formatDate(order.expired_at)" v-if="order.expired_at"></v-list-item>
				<v-list-item title="Entregue em" :subtitle="formatDate(order.delivered_at)" v-if="order.delivered_at"></v-list-item>
				<v-list-item title="Cancelado em" :subtitle="formatDate(order.canceled_at)" v-if="order.canceled_at"></v-list-item>
			</v-list>
			<v-card-actions class="justify-end">
				<v-btn color="primary" variant="text" @click="$emit('close')">Fechar</v-btn>
				<v-btn color="primary" variant="text" @click="sendCertificate(order)">Reenviar Certificado</v-btn>
			</v-card-actions>
		</v-card>

		<v-snackbar
      :timeout="4500"
      v-model="snackbarState"
      :color="snackbarColor">
      {{ snackbarTxt }}
    </v-snackbar>
	</v-dialog>
</template>
  
<script lang="ts">
import OrderService from '@/services/OrderService';
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'OrderDialog',
	data() {
		return {
			loading: false,
			snackbarTxt: '',
      snackbarState: false,
      snackbarColor: ''
		};
	},
	props: {
		show: Boolean,
		order: {
			title: String,
			email: String,
			description_additional: String,
			description_author: String,
			description_holder: String,
			file_hash: String,
			file_filename: String,
			file_mimetype: String,
			file_category: String,
			file_filesize: String,
			file_type: String,
			file_raw: String,
			coupon: String,
			generated_at: String,
			paid_at: String,
			expired_at: String,
			delivered_at: String,
			canceled_at: String,
		} as any
	},
	methods: {
		formatDate(dateString: string) {
			const date = new Date(dateString);
			return new Intl.DateTimeFormat('default', {dateStyle: 'long'}).format(date);
		},
		sendCertificate(order: any) {
      this.loading = true;
      OrderService.sendCertificate(order)
        .then(res => {
          this.loading = false;
          this.snackbarState = true;
          this.snackbarTxt = 'Certificado enviado com sucesso!';
          this.snackbarColor = 'success';
        })
        .catch(err => {
          this.loading = false;
        });
    }
	}
});
</script>
  
<style lang="scss" scoped>
.dialog-toolbar {
	background-color: transparent;
}
</style>