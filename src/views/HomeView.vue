<template>
  <PageContent hide-footer>
    Home
  </PageContent>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import PageContent from './PageContent.vue';

export default defineComponent({
  name: 'HomeView',
  components: { PageContent }
});
</script>
