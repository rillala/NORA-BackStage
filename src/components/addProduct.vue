<script>
import { List, ListItem, ListItemMeta, Input, FormItem, Row, Button, Col } from 'view-ui-plus';
import apiInstance from "@/plugins/auth";



export default {
	components: { ListItemMeta, ListItem, List, Input, FormItem, Row, Button, Col },
	data() {
		return {
			modal2: false,
			selectedFiles: [], // 用於存储已選擇文件的信息
			product: {
				title: '',
				category: '',
				description: '',
				price: null,
				state: 0,
			},
			formData: new FormData()
		}
	},
	methods: {
		handleBeforeChange() {
			return new Promise((resolve, reject) => {
				if (this.product.state === 0) {
					this.$Modal.confirm({
						title: '上架確認',
						content: '您確認要上架商品嗎？',
						onOk: () => {
							resolve(); // 確認下架
							this.product.state = 1;
						},
						onCancel: () => {
							reject(); // 取消下架
						}
					});
				} else {
					this.$Modal.confirm({
						title: '下架確認',
						content: '您確認要下架商品嗎？',
						onOk: () => {
							resolve(); // 確認上架
							this.product.state = 0;
						},
						onCancel: () => {
							reject(); // 取消上架
						}
					});
				}
			});
		},
		handleImageUpload(event) {
			this.selectedFiles = []; // 清空之前的選擇
			const files = event.target.files;
			if (files) {
				for (let i = 0; i < files.length; i++) {
					this.formData.append('images[]', files[i]);
					// 創建並存储預覽 URL
					const fileReader = new FileReader();
					fileReader.onload = (e) => {
						this.selectedFiles.push({ name: files[i].name, url: e.target.result });
					};
					fileReader.readAsDataURL(files[i]);
				}
			}
		},
		addProduct() {
			// 在發送前自動設置 createdate 為當前日期時間
			const now = new Date();
			const timezoneOffset = now.getTimezoneOffset() * 60000; // 時區偏移量，以毫秒為單位
			const localISOTime = (new Date(now - timezoneOffset)).toISOString().slice(0, 19).replace('T', ' ');
			this.formData.append('title', this.product.title);
			this.formData.append('category', this.product.category);
			this.formData.append('description', this.product.description);
			this.formData.append('price', this.product.price);
			this.formData.append('state', this.product.state);
			this.formData.append('createdate', localISOTime); // 使用當前日期時間

			apiInstance.post('/addProduct.php', this.formData, {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			})
				.then(response => {
					console.log(response.data);
				})
				.catch(error => {
					console.error(error);
				});
				this.modal2 = false;
		},

		// handleSubmit(name) {
		// 	this.$refs[name].validate((valid) => {
		// 		if (valid) {
		// 			this.$Message.success('儲存成功');
		// 		} else {
		// 			this.$Message.error('儲存失敗');
		// 		}
		// 	})
		// },
		// handleReset(name) {
		// 	this.$refs[name].resetFields();
		// },
	}
}
</script>

<template>
	<Space wrap>
		<!-- 這邊下面是表格類的燈箱 -->
		<Button @click="modal2 = true">新增商品</Button>

		<Modal title="新增商品" v-model="modal2" class="vertical-center-modal" width="600" ok-text="確定" cancel-text="取消"
			footer-hide>
			<List item-layout="vertical">
				<Form>
					<ListItem justify="center" align="middle">
						<p align="center" class="list-title">商品圖片</p>
						<input type="file" id="images" @change="handleImageUpload" accept="image/*" multiple required>
						<div v-for="(file, index) in selectedFiles" :key="index">
        <img :src="file.url" :alt="file.name" style="width: 100px; height: auto;">
        <p>{{ file.name }}</p>
    </div>
					</ListItem>

					<ListItem>
						<Row class="form-row" justify="center" align="middle">
							<Col span="5" align="center" class=" row-title">
							<span>商品名稱：</span>
							</Col>
							<Col span="19">
							<Input v-model="product.title" placeholder="請輸入商品名稱" required />
							</Col>
						</Row>

						<Row class="form-row" justify="center" align="middle">
							<Col span="5" align="center">
							<span>商品類別：</span>
							</Col>
							<Col span="19">
							<Select v-model="product.category" placeholder="請選擇商品類別">
								<Option value="Nora品牌服飾">Nora品牌服飾</Option>
								<Option value="Nora文青生活">Nora文青生活</Option>
								<Option value="Nora營地用品">Nora營地用品</Option>
							</Select>
							</Col>
						</Row>

					</ListItem>

					<ListItem justify="center" align="middle">
						<Row class="form-row" justify="center" align="middle">
							<p align="center" class="list-title">商品顏色</p>
						</Row>
						<Row class="form-row" justify="center" align="middle">
							<Col span="19">
							<Input type="text" placeholder="請輸入商品顏色(選填)"></Input>
							</Col>
						</Row>
					</ListItem>

					<ListItem justify="center" align="middle">
						<Row class="form-row" justify="center" align="middle">
							<p align="center" class="list-title">商品尺寸</p>
						</Row>
						<Row class="form-row" justify="center" align="middle">
							<Col span="19">
							<Input type="text" placeholder="請輸入商品尺寸(選填)"></Input>
							</Col>
						</Row>
					</ListItem>

					<ListItem justify="center" align="middle">
						<Row class="form-row" justify="center" align="middle">
							<Col span="5" align="center" class=" row-title">
							<span>商品詳情：</span>
							</Col>
						</Row>
						<Row class="form-row" justify="center" align="middle">
							<Col span="19">
							<Input type="textarea" :rows="5" v-model="product.description" placeholder="請輸入商品詳情" required />
							</Col>
						</Row>
					</ListItem>

					<ListItem>
						<Row class="form-row" justify="center" align="middle">
							<Col span="5" align="center">
							<span>商品價格：</span>
							</Col>
							<Col span="17" align="middle">
							<Input v-model="product.price" placeholder="請輸入單價" required />
							</Col>
							<Col span="2" align="center">
							<span>元</span>
							</Col>
						</Row>
					</ListItem>
					<ListItem>
						<Row class="form-row" justify="center" align="middle">
							<Col span="5" align="center">
							<span>上架：</span>
							</Col>
							<Col span="5" align="middle">
							<Switch :before-change="handleBeforeChange" />
							</Col>
						</Row>
					</ListItem>
					<Row class="form-row form-footer" justify="center" align="middle">
						<Button @click="modal2 = false">取消</Button>
						<Button style="background-color: rgb(71, 236, 236);" @click="addProduct">送出</Button>
					</Row>
				</Form>

			</List>
		</Modal>
	</Space>
</template>

<style lang="less" scoped>
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
