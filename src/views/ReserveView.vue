<script>
import apiInstance from "@/plugins/auth";
import { getImageUrl } from "@/assets/js/common";

export default {
  data() {
    return {
      sites: [],
    };
  },
  mounted() {
    this.getPHP();
  },
  methods: {
    getPHP() {
      apiInstance
        .get("./campSite.php")
        .then((response) => {
          console.log(response.data); // 这里应该能看到 { "number": 123 }
          this.sites = response.data.sites;
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
    getImageUrl(paths) {
      return getImageUrl(paths);
    },
  },
};
</script>

<template>
  <main>
    <img :src="getImageUrl('test.png')" alt="test" />
    <img :src="getImageUrl('/sub/cat.png')" alt="test" />
    <div>{{ sites }}</div>
  </main>
</template>

<style lang="scss" scoped></style>
