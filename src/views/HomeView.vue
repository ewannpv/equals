<template>
  <v-app id="inspire">
    <TopNavBar />
    <v-main class="pt-0">
      <EvolutionContainer />
      <EconomyContainer />
      <SocialContainer />
    </v-main>
  </v-app>
</template>

<script>
import TopNavBar from '@/components/TopNavBar.vue';
import EconomyContainer from '@/components/economy/EconomyContainer.vue';
import SocialContainer from '@/components/social/SocialContainer.vue';
import EvolutionContainer from '@/components/evolution/EvolutionContainer.vue';

export default {
  components: {
    TopNavBar,
    EconomyContainer,
    SocialContainer,
    EvolutionContainer,
  },
};
</script>
