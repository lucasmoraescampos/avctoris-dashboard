<template>
  <PageContent :title="title" :breadcrumbs="breadcrumbs">
    <v-card class="order-list" :loading="loading">
      <v-toolbar class="order-list-toolbar">
        <Searchbar @change="changedSearchbar($event)"></Searchbar>
        <v-spacer></v-spacer>
        <!-- <v-btn icon="mdi-dots-vertical"></v-btn> -->
      </v-toolbar>

      <template v-slot:loader="{ isActive }: any">
        <v-progress-linear :active="isActive" color="primary" height="4" indeterminate>
        </v-progress-linear>
      </template>

      <v-data-table :headers="headers" :items="orders" :items-per-page="-1">
        <template v-slot:body>
          <tr v-for="order in orders" :key="order.id">
            <td>
              <span class="column-text">{{ order.title }}</span>
            </td>
            <td>
              <span class="column-text">{{ order.email }}</span>
            </td>
            <td>
              <span class="column-text">{{ order.file_filename }}</span>
            </td>
            <td>
              <v-badge
                color="error"
                content="cancelado"
                inline
                v-if="order.canceled_at">
              </v-badge>

              <v-badge
                color="primary"
                content="entregue"
                inline
                v-else-if="order.delivered_at">
              </v-badge>

              <v-badge
                color="success"
                content="pago"
                inline
                v-else-if="order.paid_at">
              </v-badge>

              <v-badge
                color="warning"
                content="expirado"
                inline
                v-else-if="order.expired_at">
              </v-badge>

              <v-badge
                color="info"
                content="gerado"
                inline
                v-else>
              </v-badge>
            </td>
            <td>
              <div class="buttons-nowrap">
                <v-btn icon="mdi-eye-outline" size="small" variant="text" @click="viewOrder(order)"></v-btn>
                <v-btn icon="mdi-send-outline" size="small" variant="text" @click="sendCertificate(order)"></v-btn>
              </div>
            </td>
          </tr>
        </template>

        <template v-slot:bottom></template>
      </v-data-table>
    </v-card>

    <template v-slot:footer>
      <div class="d-flex justify-center w-100">
        <v-pagination color="primary" :length="numberPages" :total-visible="5"
          @update:modelValue="changeCurrentPage($event)">
        </v-pagination>
      </div>
    </template>

    <OrderDialog
      v-model="orderDialog"
      :order="currentOrder"
      @close="closeOrderDialog()">
    </OrderDialog>

    <v-snackbar
      :timeout="4500"
      v-model="snackbarState"
      :color="snackbarColor">
      {{ snackbarTxt }}
    </v-snackbar>
  </PageContent>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import OrderService from '../../services/OrderService';
import PageContent from '../PageContent.vue';
import OrderDialog from './OrderDialog.vue';
import Searchbar from '../../components/Searchbar.vue';

export default defineComponent({
  name: "OrderListView",
  data() {
    return {
      title: 'Pedidos',
      breadcrumbs: [
        {
          title: 'Início',
          disabled: false,
          route: '/home',
        },
        {
          title: 'Pedidos',
          disabled: true,
          href: '',
        },
      ],
      loading: true,
      orders: [] as any,
      total: 0,
      currentPage: 1,
      limit: 30,
      numberPages: 0,
      headers: [
        { title: 'Título', key: 'title' },
        { title: 'E-mail', key: 'email' },
        { title: 'Arquivo', key: 'file_filename' },
        { title: 'Status', key: 'status', sortable: false },
        { title: '', key: 'actions', sortable: false }
      ],
      orderDialog: false,
      currentIndex: -1,
      currentOrder: {
        title: '',
        email: '',
        file_filename: '',
        description_additional: '',
        description_author: '',
        description_holder: ''
      },
      search: '',
      snackbarTxt: '',
      snackbarState: false,
      snackbarColor: ''
    };
  },
  methods: {
    loadOrders() {
      this.loading = true;
      const params = {
        page: this.currentPage,
        limit: this.limit,
        search: this.search
      };
      OrderService.getAll(params)
        .then(res => {
          this.loading = false;
          this.orders = res.data.items;
          this.total = res.data.total;
          this.currentPage = res.data.current_page;
          this.numberPages = Math.ceil(this.total / this.limit);
        })
        .catch(e => {
          this.loading = false;
          console.log(e);
        });
    },
    changeCurrentPage(page: number) {
      PageContent.methods?.scrollTop();
      this.currentPage = page;
      this.loadOrders();
    },
    viewOrder(order: any) {
      this.currentIndex = this.orders.indexOf(order);
      this.currentOrder = Object.assign({}, order);
      this.orderDialog = true;
    },
    closeOrderDialog() {
      this.orderDialog = false;
      this.currentIndex = -1;
    },
    changedSearchbar(value: string) {
      this.search = value;
      this.currentPage = 1;
      this.loadOrders();
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
  },
  created() {
    this.loadOrders();
  },
  components: {
    PageContent,
    OrderDialog,
    Searchbar
  }
});
</script>

<style lang="scss" scoped>
.order-list {
  .order-list-toolbar {
    background-color: transparent;
    padding: 5px 15px;
  }
}

.order-pagination {}

.column-text {
  overflow: hidden;
  display: -webkit-box;
  -moz-line-clamp: 3;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -moz-box-orient: vertical;
  -webkit-box-orient: vertical;
  box-orient: vertical;
}

.buttons-nowrap {
  display: flex;
  flex-wrap: nowrap;
}
</style>