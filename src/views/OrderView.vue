<template>
  <div>
    <h2>商品列表</h2>
    <div v-if="products.length === 0">尚無商品</div>
    <div v-else>
      <table>
        <thead>
          <tr>
            <th>商品圖片</th>
            <th>商品標題</th>
            <th>商品類別</th>
            <th>商品描述</th>
            <th>商品價格</th>
            <th>商品狀態</th>
            <th>建立日期</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product.id">
            <td><img :src="getImageUrl(product.images)" alt="商品圖片" style="width: 100px; height: auto;"></td>
            <td>{{ product.title }}</td>
            <td>{{ product.category }}</td>
            <td>{{ product.description }}</td>
            <td>{{ product.price }}</td>
            <td>{{ product.state }}</td>
            <td>{{ product.createdate }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import apiInstance from "@/plugins/auth";
import { getImageUrl } from "@/assets/js/common";

export default {
  data() {
    return {
      products: []
    };
  },
  created() {
    // 在創建時從後端獲取商品列表
    this.getPHP();
  },
  methods: {
    getPHP() {
      apiInstance
        .get("./getProduct.php")
        .then((response) => {
          console.log(response.products); // 这里应该能看到 { "number": 123 }
          this.products = response.data;
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
    getImageUrl(paths) {
      return getImageUrl(paths);
    },
  }
};
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
}

th {
  background-color: #f2f2f2;
  text-align: left;
}
</style>
