<template>
  <div>
    <h2>新增商品</h2>
    <form @submit.prevent="addProduct">
      <div>
        <label for="images">商品圖片：</label>
        <!-- 修改為支持多文件選擇 -->
        <input type="file" id="images" @change="handleImageUpload" accept="image/*" multiple required>
      </div>
      <!-- 其他表單字段保持不變 -->
      <div>
        <label for="title">商品標題：</label>
        <input type="text" id="title" v-model="product.title" required>
      </div>
      <div>
        <label for="category">商品類別：</label>
        <input type="text" id="category" v-model="product.category" required>
      </div>
      <div>
        <label for="description">商品描述：</label>
        <textarea id="description" v-model="product.description" required></textarea>
      </div>
      <div>
        <label for="price">商品價格：</label>
        <input type="number" id="price" v-model="product.price" required>
      </div>
      <div>
        <label for="state">商品狀態：</label>
        <input type="text" id="state" v-model="product.state" required>
      </div>
      <div>
        <label for="createdate">建立日期：</label>
        <input type="date" id="createdate" v-model="product.createdate" required>
      </div>
      <button type="submit">新增商品</button>
    </form>
  </div>
  <AddProduct></AddProduct>
</template>

<script>
import apiInstance from "@/plugins/auth";
import AddProduct from "@/components/addProduct.vue";

export default {
    data() {
        return {
            product: {
                // 移除 images 屬性，因為我們將使用 FormData 直接處理圖片數據
                title: '',
                category: '',
                description: '',
                price: null,
                state: '',
                createdate: ''
            },
            formData: new FormData() // 增加 formData 來管理表單數據和文件
        };
    },
    methods: {
        handleImageUpload(event) {
            const files = event.target.files;
            if (files) {
                // 為每個選擇的文件添加到 formData 中
                for (let i = 0; i < files.length; i++) {
                    this.formData.append('images[]', files[i]);
                }
            }
        },
        addProduct() {
            // 將其他表單數據添加到 formData 中
            this.formData.append('title', this.product.title);
            this.formData.append('category', this.product.category);
            this.formData.append('description', this.product.description);
            this.formData.append('price', this.product.price);
            this.formData.append('state', this.product.state);
            this.formData.append('createdate', this.product.createdate);
            // 發送 formData 到後端
            apiInstance.post('/addProduct.php', this.formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then(response => {
                console.log(response.data); // 處理響應
            })
                .catch(error => {
                console.error(error); // 處理錯誤
            });
        }
    },
    components: { AddProduct }
};
</script>



<!-- <script>
import apiInstance from "@/plugins/auth";

export default {
  data() {
    return {
      search:'',

      columns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '商品編號',
          key: 'id',
          sortable: true
        },
        {
          title: '商品名稱',
          key: 'name'
        },
        {
          title: '顏色',
          key: 'color'
        },
        {
          title: '尺寸',
          key:'size',
        },
        {
          title: '商品價格',
          key: 'price',
          sortable: true
        },
        {
          title: '商品類別',
          key: 'category',
          filters: [
            {
              label: '文青生活',
              value: '文青生活'
            },
            {
              label: '服飾',
              value: '服飾'
            },
            {
              label: '營地用品',
              value: '營地用品'
            }
          ],
          filterMethod(value, row) {
            return row.category.indexOf(value) > -1;
          }
        },
        {
          title: '商品狀態',
          key: 'status',
        },
        {
          title: '編輯',
          key: 'price'
        },
      ],
      data: [
        {
          id: '11111',
          name:'New York No. 1 Lake Park',
          price:  18,
          category: '文青生活',
          color: '黑',
          size: 'XL',
          status: 'true'
        },
        {
          id: '22222',
          name: 'London No. 1 Lake Park',
          price: 24,
          category: '服飾',
          color: '黑',
          size: 'XL'
        },
        {
          id: '33333',
          name: 'Sydney No. 1 Lake Park',
          price: 30,
          category: '服飾',
          color: '黑',
          size: 'XL'
        },
        {
          id: '44444',
          name: 'Ottawa No. 2 Lake Park',
          price: 26,
          category: '營地用品',
          color: '黑',
          size: 'XL'
        }
      ]
    }
  },
  methods: {
    handleSelectAll(status) {
      this.$refs.selection.selectAll(status);
    },
    handleFilter(){
      console.log(this.search.id)
    },
    getPHP() {
      apiInstance
        .get("./getadmin.php")
        .then((response) => {
          this.adminList = response.data;
        }
        ).catch((error) => {
          console.error("Error", error);
        });
    }
  },
  mounted() {
    
  },
}
</script>

<template>
  <main>
    <h2 class="product-title dark">商品列表管理</h2>

    <div class="product-search">
      <h4>商品列表清單</h4>
      <Input search enter-button placeholder="請輸入商品名稱或商品Id進行搜尋" class="product-id-search" v-model="this.search" @onchange="handleFilter" />
    </div>
    <Table class="product-table" border ref="selection" :columns="columns" :data="data"></Table>
    <div style="margin-top: 16px">
      <Button @click="handleSelectAll(true)">Set all selected</Button>
      <Button @click="handleSelectAll(false)">Cancel all selected</Button>
    </div>
  </main>
</template>

<style lang="scss" scoped>
h2 {
  margin-bottom: 20px;
}

h4 {
  font-weight: 700;
  margin-bottom: 5px;
}
.product-table{
  margin-top: 20px;
}

</style> -->
