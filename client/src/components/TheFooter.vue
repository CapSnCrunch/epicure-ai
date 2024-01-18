<template>
  <div
    style="
      height: 15px;
      background-image: url('https://www.loveandlemons.com/wp-content/themes/loveandlemons5/images/lnl-header-embellishment.png');
      background-size: 30px 15px;
      background-repeat: repeat-x;
      transform: scaleY(-1);
      margin-top: 100px;
    "
  />
  <v-footer style="background-color: #5d90b5; height: 400px">
    <v-container class="d-flex flex-column justify-center">
      <v-row>
        <v-col cols="4" class="d-flex flex-column justify-center align-center">
          <h1 style="font-size: 20px; font-weight: 800">Top Recipes</h1>
          <h1 style="font-size: 16px; font-weight: 400; margin-top: 12px">
            Healthy Breakfast Ideas
          </h1>
          <h1 style="font-size: 16px; font-weight: 400; margin-top: 4px">
            Easy Dinner Ideas
          </h1>
          <h1 style="font-size: 16px; font-weight: 400; margin-top: 4px">
            Best Brunch Recipes
          </h1>
          <h1 style="font-size: 16px; font-weight: 400; margin-top: 4px">
            Vegan Recipes
          </h1>
          <h1 style="font-size: 16px; font-weight: 400; margin-top: 4px">
            Best Salad Recipes
          </h1>
          <h1 style="font-size: 16px; font-weight: 400; margin-top: 4px">
            Best Soup Recipes
          </h1>
          <h1 style="font-size: 16px; font-weight: 400; margin-top: 4px">
            Easy Appetizer Recipes
          </h1>
        </v-col>
        <v-col cols="4" class="d-flex flex-column justify-center align-center">
          <h1 style="font-size: 20px; font-weight: 800">
            Cooking with Vegetables
          </h1>
          <h1 style="font-size: 16px; font-weight: 400; margin-top: 12px">
            Avocado
          </h1>
          <h1 style="font-size: 16px; font-weight: 400; margin-top: 4px">
            Beets
          </h1>
          <h1 style="font-size: 16px; font-weight: 400; margin-top: 4px">
            Brussel Sprouts
          </h1>
          <h1 style="font-size: 16px; font-weight: 400; margin-top: 4px">
            Broccoli
          </h1>
          <h1 style="font-size: 16px; font-weight: 400; margin-top: 4px">
            Butternut Squash
          </h1>
          <h1 style="font-size: 16px; font-weight: 400; margin-top: 4px">
            Cauliflower
          </h1>
          <h1 style="font-size: 16px; font-weight: 400; margin-top: 4px">
            Spaghetti Squash
          </h1>
          <h1 style="font-size: 16px; font-weight: 400; margin-top: 4px">
            Sweet Potato
          </h1>
        </v-col>
        <v-col cols="4" class="d-flex flex-column justify-center align-center">
          <h1 style="font-size: 20px; font-weight: 800">
            Plant-Based Cooking Basics
          </h1>
          <h1 style="font-size: 16px; font-weight: 400; margin-top: 12px">
            Brown Rice
          </h1>
          <h1 style="font-size: 16px; font-weight: 400; margin-top: 4px">
            Lentils
          </h1>
          <h1 style="font-size: 16px; font-weight: 400; margin-top: 4px">
            Roasted Chickpeas
          </h1>
          <h1 style="font-size: 16px; font-weight: 400; margin-top: 4px">
            Farro
          </h1>
          <h1 style="font-size: 16px; font-weight: 400; margin-top: 4px">
            Tofu
          </h1>
          <h1 style="font-size: 16px; font-weight: 400; margin-top: 4px">
            Tempeh
          </h1>
          <h1 style="font-size: 16px; font-weight: 400; margin-top: 4px">
            Quinoa
          </h1>
          <h1 style="font-size: 16px; font-weight: 400; margin-top: 4px">
            Zucchini Noodles
          </h1>
        </v-col>
      </v-row>
      <v-row class="d-flex justify-center mt-8">
        <router-link
          :to="{ name: 'home' }"
          style="text-decoration: none; color: inherit"
        >
          <div class="mx-8" style="font-weight: 800">HOME</div>
        </router-link>

        <router-link
          :to="{ name: 'home' }"
          style="text-decoration: none; color: inherit"
        >
          <div class="mx-8" style="font-weight: 800">ABOUT</div>
        </router-link>

        <router-link
          :to="{ name: 'home' }"
          style="text-decoration: none; color: inherit"
        >
          <div class="mx-8" style="font-weight: 800">SUBSCRIBE</div>
        </router-link>

        <router-link
          :to="{ name: 'home' }"
          style="text-decoration: none; color: inherit"
        >
          <div class="mx-8" style="font-weight: 800">CONTACT</div>
        </router-link>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script setup></script>
