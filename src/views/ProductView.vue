<script>
import apiInstance from "@/plugins/auth";
import { getImageUrl } from "@/assets/js/common";
import AddProduct from "@/components/addProduct.vue";

export default {
  components: { AddProduct },
  data() {
    return {
      isEditDialogVisible: false,
      currentProductData: {},
      products: [],
      NewColorInput: "",
      NewSizeInput: "",
      search: "",

      //編輯Modal
      editModal: false,

      columns: [
        {
          title: "商品編號",
          key: "product_id",
          sortable: true,
          width: 120,
        },
        {
          title: "商品圖片",
          slot: "images",
          width: 120,
        },
        {
          title: "商品名稱",
          key: "title",
        },
        {
          title: "顏色",
          key: "colors",
        },
        {
          title: "尺寸",
          key: "sizes",
        },
        {
          title: "商品價格",
          key: "price",
          sortable: true,
        },
        {
          title: "商品類別",
          key: "category",
          filters: [
            {
              label: "NORA文青生活",
              value: "NORA文青生活",
            },
            {
              label: "NORA品牌服飾",
              value: "NORA品牌服飾",
            },
            {
              label: "NORA營地用品",
              value: "NORA營地用品",
            },
          ],
          filterMethod(value, row) {
            return row.category.indexOf(value) > -1;
          },
        },
        {
          title: "商品狀態",
          key: "state",
          slot: "state",
          filters: [
            {
              label: "已上架",
              value: 1,
            },
            {
              label: "未上架",
              value: 0,
            },
          ],
          filteredValue: [1],
          filterMethod(value, row) {
            return row.state === value;
          },
        },
        {
          title: "上架日期",
          key: "createdate",
          sortable: true,
        },
        {
          title: "編輯",
          slot: "action",
        },
      ],
    };
  },
  methods: {
    getProducts() {
      apiInstance
        .get("./getProduct.php")
        .then((response) => {
          this.products = response.data.map((product) => ({
            ...product,
            //將狀態轉為布林值
            state: parseInt(product.state),
            stateBool: product.state == 1,
          }));
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
    getImageUrl(image) {
      return getImageUrl(image);
    },
    refreshPage() {
      window.location.reload();
    },
    toggleProductState(index) {
      const product = this.products[index];
      const newState = product.stateBool ? 0 : 1; // 根据布尔值转换回数字状态

      apiInstance
        .post("/updateProductState.php", {
          product_id: product.product_id,
          state: newState,
        })
        .then((response) => {
          if (response.data.success) {
            // 更新原始数字状态值，以便正确反映在界面上
            product.state = newState;
            this.$Message.success("商品狀態已更新");
            this.getProducts();
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          this.$Message.error("商品狀態更新失败");
        });
    },
    //打開Modal
    showEditDialog(product) {
      this.currentProductData = { ...product };
      if (typeof product.colors === "string") {
        this.currentProductData.colors = product.colors.split(",");
      } else {
        this.currentProductData.colors = [];
      }
      if (typeof product.sizes === "string") {
        this.currentProductData.sizes = product.sizes.split(",");
      } else {
        this.currentProductData.sizes = [];
      }
      this.editModal = true;
    },
    //上傳圖片
    handleFileChange(e) {
      const files = e.target.files;
      if (!files.length) return;

      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append("images[]", files[i], files[i].name);
      }
      formData.append("product_id", this.currentProductData.product_id);

      apiInstance
        .post("/uploadImages.php", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          if (response.data.error) {
            console.error("圖片上传失败:", response.data.msg);
          } else {
            const uploadedImagesPaths = response.data.imagesPaths;
            if (!this.currentProductData.images) {
              this.currentProductData.images = [];
            }
            // 将新上传的图片路径添加到images数组中
            this.currentProductData.images.push(...uploadedImagesPaths);
            // 清除input file的值，以便下次可以重新选择相同的文件
            e.target.value = "";
          }
        })
        .catch((error) => {
          console.error("上传错误", error);
          // 可能需要处理错误，例如显示错误消息
        });
    },

    //刪除照片
    removeImage(index) {
      this.currentProductData.images.splice(index, 1);
    },
    addColor() {
      if (this.NewColorInput.trim()) {
        this.currentProductData.colors.push(this.NewColorInput.trim());
        this.NewColorInput = "";
      }
    },
    addSize() {
      if (this.NewSizeInput.trim()) {
        this.currentProductData.sizes.push(this.NewSizeInput.trim());
        this.NewSizeInput = "";
      }
    },
    removeColor(index) {
      this.currentProductData.colors.splice(index, 1);
    },
    removeSize(index) {
      this.currentProductData.sizes.splice(index, 1);
    },

    updateProduct() {
      apiInstance
        .post("/updateProduct.php", this.currentProductData)
        .then((response) => {
          if (response.data.success) {
            this.$Message.success("商品信息更新成功");
            this.getProducts();
            this.editModal = false;
          } else {
            this.editModal = false;
            this.getProducts();
            //  this.$Message.error('更新失败: ' + response.data.message);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          this.editModal = false; // 关闭模态框
          this.getProducts(); // 重新加载商品列表
          this.$Message.error("商品信息更新失败");
        });
    },
  },
  computed: {
    filteredProducts() {
      if (!this.search.trim()) {
        return this.products;
      }
      const searchLower = this.search.trim().toLowerCase();
      return this.products.filter((product) => {
        return (
          product.title.toLowerCase().includes(searchLower) ||
          product.product_id.toString().includes(searchLower)
        );
      });
    },
  },
  created() {
    this.getProducts();
  },
};
</script>

<template>
  <main>
    <h2 class="product-title dark">商品列表管理</h2>
    <div class="product-search">
      <h4>商品列表清單</h4>
      <Input search enter-button placeholder="請輸入商品名稱或商品Id進行搜尋" class="search" v-model="this.search" />
    </div>
    <AddProduct @product-changed="refreshPage"></AddProduct>
    <Table class="product-table" height="500" ref="selection" :columns="columns" :data="filteredProducts">
      <template #images="{ row }">
        <Carousel loop style="width: 100px; height: auto">
          <CarouselItem v-for="(image, index) in row.images" :key="index">
            <Image :src="getImageUrl(image)" alt="商品圖片" fit="cover" width="100%" height="100%" />
          </CarouselItem>
        </Carousel>
      </template>
      <template #state="{ row, index }">
        <Switch v-model="row.stateBool" @on-change="() => toggleProductState(index)"></Switch>
      </template>
      <template #action="{ row }">
        <Button @click="showEditDialog(row)"><img src="@/assets/image/icon/edit.svg" alt="editBtn" /></Button>
      </template>
    </Table>
  </main>

  <!-- 以下為Modal -->
  <Modal title="編輯商品" v-model="editModal" class="vertical-center-modal" width="600" ok-text="確定" cancel-text="取消"
    footer-hide>
    <!-- {{ this.currentProductData }} -->
    <List item-layout="vertical">
      <Form>
        <ListItem justify="center" align="middle">
          <p align="center" class="list-title">商品圖片</p>
          <input type="file" @change="handleFileChange" accept="image/*" multiple />
          <div v-for="(image, index) in currentProductData.images" :key="index" class="image-preview">
            <img :src="getImageUrl(image)" :alt="`Image ${index}`" style="width: 100px; height: auto" />
            <button @click.prevent="removeImage(index)">刪除</button>
          </div>
        </ListItem>

        <ListItem>
          <Row class="form-row" justify="center" align="middle">
            <Col span="5" align="center" class="row-title">
            <span>商品名稱：</span>
            </Col>
            <Col span="19">
            <Input v-model="currentProductData.title" placeholder="請輸入商品名稱" required />
            </Col>
          </Row>
          <Row class="form-row" justify="center" align="middle">
            <Col span="5" align="center">
            <span>商品類別：</span>
            </Col>
            <Col span="19">
            <Select v-model="currentProductData.category" placeholder="請選擇商品類別">
              <Option value="NORA品牌服飾">NORA品牌服飾</Option>
              <Option value="NORA文青生活">NORA文青生活</Option>
              <Option value="NORA營地用品">NORA營地用品</Option>
            </Select>
            </Col>
          </Row>
        </ListItem>

        <!-- 商品颜色 -->
        <ListItem justify="center" align="middle">
          <Row class="form-row" justify="center" align="middle">
            <Col span="5" align="center" class="row-title">
            <span>商品顏色：</span>
            </Col>
            <Col span="15">
            <Input type="text" v-model="NewColorInput" placeholder="請輸入商品顏色"></Input>
            </Col>
            <Button @click="addColor">添加顏色</Button>
          </Row>
          <div v-for="(color, index) in currentProductData.colors" :key="index">
            {{ color }} <Button @click="removeColor(index)">移除</Button>
          </div>
        </ListItem>

        <!-- 商品尺寸 -->
        <ListItem justify="center" align="middle">
          <Row class="form-row" justify="center" align="middle">
            <Col span="5" align="center" class="row-title">
            <span>商品尺寸：</span>
            </Col>
            <Col span="15">
            <Input type="text" v-model="NewSizeInput" placeholder="請輸入商品尺寸"></Input>
            </Col>
            <Button @click="addSize">添加尺寸</Button>
          </Row>
          <div v-for="(size, index) in currentProductData.sizes" :key="index">
            {{ size }} <Button @click="removeSize(index)">移除</Button>
          </div>
        </ListItem>

        <ListItem justify="center" align="middle">
          <Row class="form-row" justify="center" align="middle">
            <Col span="5" align="center" class="row-title">
            <span>商品詳情：</span>
            </Col>
          </Row>
          <Row class="form-row" justify="center" align="middle">
            <Col span="19">
            <Input type="textarea" :rows="5" v-model="currentProductData.description" placeholder="請輸入商品詳情" required />
            </Col>
          </Row>
        </ListItem>

        <ListItem>
          <Row class="form-row" justify="center" align="middle">
            <Col span="5" align="center">
            <span>商品價格：</span>
            </Col>
            <Col span="17" align="middle">
            <Input v-model="currentProductData.price" placeholder="請輸入單價" required />
            </Col>
            <Col span="2" align="center">
            <span>元</span>
            </Col>
          </Row>
        </ListItem>

        <Row class="form-row form-footer" justify="center" align="middle">
          <Button @click="editModal = false">取消</Button>
          <Button style="background-color: rgb(71, 236, 236)" @click="updateProduct">儲存</Button>
        </Row>
      </Form>
    </List>
  </Modal>
</template>

<style lang="scss" scoped>
h2 {
  margin-bottom: 20px;
}

h4 {
  font-weight: 700;
  margin-bottom: 5px;
}

.search {
  width: 400px;
  margin-bottom: 10px;

  .ivu-input-search {
    background: $blue-3;
  }
}

.product-table {
  margin-top: 20px;
}

.ivu-row {
  display: flex;
  flex-flow: row nowrap;
}

//預約訂單明細
.vertical-center-modal {
  display: flex;
  align-items: center;
  justify-content: center;
}

.vertical-center-modal .ivu-modal {
  top: 0;
}

.row {
  padding: 5px 40px;
}

.list-title {
  padding-bottom: 10px;
}

.row-content {
  border: 1px solid #dcdee2;
  border-radius: 3px;
  height: 30px;
  display: flex;
  align-items: center;
  cursor: not-allowed;

  span {
    padding-left: 8px;
  }
}

.table {
  margin: 0 40px;
}

.reserve-Status {
  display: flex;

  .Status-col {
    flex-grow: 1;
    margin-right: 10px;
  }
}

//新增商品
.form-row {
  margin: 5px 40px;
}

.dynamic-row {
  width: 100%;
  padding: 5px 0px 5px 55px;
  margin-bottom: 0px;
}

.form-footer {
  display: flex;
  justify-content: right;
  gap: 8px;
  margin-top: 20px;
}
</style>
