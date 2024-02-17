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
            <td>
              <!-- 顯示多張圖片 -->
              <div v-for="(image, index) in product.images" :key="index">
                <img :src="getImageUrl(image)" alt="商品圖片" style="width: 100px; height: auto;">
              </div>
            </td>
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
import { getImageUrl } from "@/assets/js/common";
import apiInstance from "@/plugins/auth";

export default {
  data() {
    return {
      products: []
    };
  },
  created() {
    this.getProducts();
  },
  methods: {
    getProducts() {
      apiInstance
        .get("./getProduct.php")
        .then(response => {
          this.products = response.data;
        })
        .catch(error => {
          console.error("Error:", error);
        });
    },
    getImageUrl(image) {
      // 如果您的圖片路徑是相對於後端服務器的，這裡可能需要添加基礎URL
      return getImageUrl(image);
    }
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
