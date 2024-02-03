<script>
import apiInstance from "@/plugins/auth";

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
  },
};
</script>

<template>
  <main></main>
</template>

<style lang="scss" scoped></style>
