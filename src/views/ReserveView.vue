<script>
import apiInstance from "@/plugins/auth";
import { getImageUrl } from "@/assets/js/common";

export default {
  mounted() {
    this.test();
  },
  methods: {
    test() {
      apiInstance
        .get("/test.php")
        .then((response) => {
          console.log(response.data); // 这里应该能看到 { "number": 123 }
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
  </main>
</template>

<style lang="scss" scoped></style>
