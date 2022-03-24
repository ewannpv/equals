<template>
  <CardLayout color="white">
    <v-container fluid class="px-3">
      <v-row color="white">
        <v-col cols="12" sm="6" class="d-flex">
          <div>
            <v-card-title> Resume </v-card-title>
            <v-card-text>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laboriosam quidem hic,
              dolorum explicabo et aliquid, animi enim quaerat sequi ab eveniet delectus autem?
              Nobis, reprehenderit? Temporibus quos corrupti aliquid dolorum.
            </v-card-text>
          </div>
        </v-col>
        <v-spacer></v-spacer>

        <v-col cols="12" sm="6" class="d-flex">
          <CardLayout color="blue" width="100%">
            <v-card-text>
              <v-row justify="center">
                <h2 class="h2">titre</h2>
              </v-row>
              <v-row justify="center pt-2">
                <v-progress-circular
                  :rotate="180"
                  :size="100"
                  :width="15"
                  :value="circleValue"
                  color="yellow"
                >
                  <h3>
                    {{ circleValue }}
                  </h3>
                </v-progress-circular>
              </v-row>
            </v-card-text>
          </CardLayout>
        </v-col>
      </v-row>
    </v-container>
  </CardLayout>
</template>

<script>
import CardLayout from '@/components/layout/CardLayout.vue';

export default {
  components: { CardLayout },
  data() {
    return {
      circleValue: 70,
    };
  },
};
</script>

<style></style>
