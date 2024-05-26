<script lang="ts" setup>
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { setLoadingState, useAuthentication } from "@composables/";
import router, { RoutesEnum } from "../routes";

const loading = setLoadingState(false);

const computedVMainStyle = computed(() => ({
  "vmain__main-content__loading": loading.value,
  "vmain__main-content__loaded": !loading.value,
}));

const authenticationStore = useAuthentication();
const { isAuthenticated, userRef } = storeToRefs(authenticationStore);

const handleLogout = () => {
  authenticationStore.logout();
  localStorage.clear();
  window.location.reload();
};

const handleProfileItemClick = () => {
  router.push(RoutesEnum.PROFILE);
};
</script>
<template>
  <v-app>
    <v-app-bar color="info" density="comfortable" v-if="isAuthenticated">
      <v-app-bar-title> Subscription plus </v-app-bar-title>
    </v-app-bar>
    <v-navigation-drawer expand-on-hover rail v-if="isAuthenticated">
      <v-list>
        <v-list-item
          :title="userRef?.displayName ?? undefined"
          :prepend-avatar="userRef?.photoURL ?? undefined"
          :subtitle="userRef?.email ?? undefined"
          @click="handleProfileItemClick"
        ></v-list-item>
        <v-divider></v-divider>
        <v-list-item
          prepend-icon="mdi-account-multiple"
          to="profile"
          title="Profile"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-home"
          to="home"
          title="Home"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-plus"
          to="add"
          title="Add subscription"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-information"
          to="about"
          title="About"
        ></v-list-item>
        <v-dialog width="500" transition="dialog-top-transition">
          <template #activator="{ props }">
            <v-list-item
              v-bind="props"
              prepend-icon="mdi-logout"
              title="Logout"
              @click=""
            ></v-list-item>
          </template>
          <template #default="{ isActive }">
            <v-card title="Are you sure you want to logout">
              <template v-slot:actions>
                <v-spacer></v-spacer>

                <v-btn color="error" variant="elevated" @click="handleLogout">
                  Yes
                </v-btn>

                <v-btn
                  @click="isActive.value = false"
                  color="primary"
                  variant="elevated"
                >
                  No
                </v-btn>
              </template>
            </v-card>
          </template>
        </v-dialog>
      </v-list>
    </v-navigation-drawer>
    <v-main :class="computedVMainStyle"><slot /></v-main>
  </v-app>
</template>

<style lang="scss" scoped>
.vmain {
  &__main-content {
    &__loading {
      padding-top: 40vh !important;
    }

    &__loaded {
      padding-top: 15vh !important;
      width: 80vw;
    }
  }
}
</style>
