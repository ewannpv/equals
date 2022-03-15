<template>
  <v-app id="inspire">
    <TopNavBar />
    <v-main class="pt-0">
      <EconomyContainer />
      <SocialContainer />
    </v-main>
  </v-app>
</template>

<script>
import TopNavBar from '@/components/TopNavBar.vue';
import EconomyContainer from '@/components/Economy/EconomyContainer.vue';
import SocialContainer from '@/components/Social/SocialContainer.vue';

export default {
  components: {
    TopNavBar,
    EconomyContainer,
    SocialContainer,
  },
};
</script>
