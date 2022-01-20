<template>
  <body>
    <div id="id">
      <Navbar />
      <keep-alive exclude="adopt">
        <router-view></router-view>
      </keep-alive>
    </div>
  </body>
</template>

<script>
import Navbar from "./components/Navbar";

export default {
  data: () => ({
    //
  }),
  components: { Navbar },
  name: "App",
};
</script>
