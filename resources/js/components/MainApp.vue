<template>
  <main>
    <div v-if="isAuthenticated" id="wrapper">
      <Sidebar />

      <div id="content-wrapper" class="d-flex flex-column">
        <div id="content">
          <Header />

          <router-view></router-view>
        </div>

        <Footer />
      </div>
    </div>
    <div v-else>
        <router-view></router-view>
    </div>
  </main>
</template>

<script>
import Sidebar from "./navigation/Sidebar";
import Header from "./navigation/Header";
import Footer from "./navigation/Footer";

export default {
  data() {
    return {
        isAuthenticated: false
    };
  },
  components: {
    Sidebar,
    Header,
    Footer,
  },
};
</script>
