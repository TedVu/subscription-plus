<script lang="ts" setup>
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { setLoadingState, useAuthentication } from "@composables";
import router, { RoutesEnum } from "@routes";
import { useTheme } from "vuetify";
import { ref } from "vue";

const loading = setLoadingState(false);
const drawer = ref(false);
const theme = useTheme();

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

const toggleTheme = () => {
  theme.global.name.value = theme.global.current.value.dark ? "light" : "dark";
  document.body.style.background = theme.global.current.value.colors.background;
};
</script>
<template>
  <VApp>
    <VAppBar
      color="primary"
      density="comfortable"
      v-if="isAuthenticated"
      :elevation="2"
    >
      <template v-slot:prepend>
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      </template>
      <VAppBarTitle> Subscription plus </VAppBarTitle>
      <VBtn icon="mdi-theme-light-dark" @click="toggleTheme" />
    </VAppBar>
    <v-navigation-drawer v-if="isAuthenticated && drawer" location="left">
      <VList>
        <VListItem
          :title="userRef?.displayName ?? undefined"
          :prepend-avatar="userRef?.photoURL ?? undefined"
          :subtitle="userRef?.email ?? undefined"
          @click="handleProfileItemClick"
        ></VListItem>
        <v-divider></v-divider>
        <VListItem
          prepend-icon="mdi-account-multiple"
          to="profile"
          title="Profile"
        ></VListItem>
        <VListItem prepend-icon="mdi-home" to="home" title="Home"></VListItem>
        <VListItem
          prepend-icon="mdi-plus"
          to="add"
          title="Add subscription"
        ></VListItem>
        <VListItem
          prepend-icon="mdi-information"
          to="about"
          title="About"
        ></VListItem>
        <VDialog width="500" transition="dialog-top-transition">
          <template #activator="{ props }">
            <VListItem
              v-bind="props"
              prepend-icon="mdi-logout"
              title="Logout"
              @click=""
            ></VListItem>
          </template>
          <template #default="{ isActive }">
            <VCard title="Are you sure you want to logout?">
              <template v-slot:actions>
                <VSpacer></VSpacer>

                <VBtn color="error" variant="elevated" @click="handleLogout">
                  Yes
                </VBtn>

                <VBtn
                  @click="isActive.value = false"
                  color="primary"
                  variant="elevated"
                >
                  No
                </VBtn>
              </template>
            </VCard>
          </template>
        </VDialog>
      </VList>
    </v-navigation-drawer>
    <v-main :class="computedVMainStyle"><slot /></v-main>
  </VApp>
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
