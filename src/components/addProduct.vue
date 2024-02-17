<script>
import { List, ListItem, ListItemMeta, Input, FormItem, Row, Button } from 'view-ui-plus';


export default {
	components: { ListItemMeta, ListItem, List, Input, FormItem, Row, Button },
	data() {
		return {

			modal2: false,
			//^^^新增商品燈箱^^^

			imgDynamic: [
				{
					imgUrl: "",
					imgAlt: ""
				}
			],
			nameValue: "",
			priceValue: "",
			descriptionValue: "",
			categoryValue: "服飾",
			index: 1,
			colorDynamic: {
				colors: [
					{
						value: '',
						index: 1,
						status: 1
					}
				]
			},
			specDynamic: {
				specs: [
					{
						value: '',
						index: 1,
						status: 1
					}
				]
			},
		}
	},
	methods: {
		addColor() {
			this.index++;
			this.colorDynamic.colors.push({
				value: '',
				index: this.index,
				status: 1
			});
		},
		removeColor(index) {
			this.colorDynamic.colors[index].status = 0;
		},
		addSpec() {
			this.index++;
			this.specDynamic.specs.push({
				value: '',
				index: this.index,
				status: 1
			});
		},
		removeSpec(index) {
			this.specDynamic.specs[index].status = 0;
		},
		handleSubmit(name) {
			this.$refs[name].validate((valid) => {
				if (valid) {
					this.$Message.success('儲存成功');
				} else {
					this.$Message.error('儲存失敗');
				}
			})
		},
		handleReset(name) {
			this.$refs[name].resetFields();
		},
	}
}
</script>

<template>
	<Space wrap>


		<!-- 這邊下面是表格類的燈箱 -->
		<Button @click="modal2 = true">新增商品</Button>

		<Modal title="新增商品" v-model="modal2" class="vertical-center-modal" width="600" ok-text="確定" cancel-text="取消">
			<List item-layout="vertical">
				<Form>
					<ListItem justify="center" align="middle">

						<p align="center" class="list-title">商品照片</p>


						<Upload multiple action="">
							<Button icon="md-add">上傳圖片</Button>
						</Upload>

					</ListItem>

					<ListItem>

						<Row class="form-row" justify="center" align="middle">
							<Col span="5" align="center" class=" row-title">
							<span>商品名稱：</span>
							</Col>
							<Col span="19">
							<Input v-model="nameValue" placeholder="請輸入名稱" />
							</Col>
						</Row>

						<Row class="form-row" justify="center" align="middle">
							<Col span="5" align="center">
							<span>商品類別：</span>
							</Col>
							<Col span="19">
							<FormItem>
								<Select v-model="categoryValue">
									<Option value="服飾">服飾</Option>
									<Option value="文青生活">文青生活</Option>
									<Option value="露營用品">露營用品</Option>
								</Select>
							</FormItem>
							</Col>
						</Row>

					</ListItem>

					<ListItem justify="center" align="middle">

						<p align="center" class="list-title">商品顏色</p>

						<template v-for="(color, index) in  colorDynamic.colors " class="dynamic-add">
							<FormItem v-if="color.status" :key="index" :label="'商品顏色' + color.index" :prop="'items.' + index + '.value'"
								class="dynamic-row">
								<Row :gutter="4">
									<Col span="18">
									<Input type="text" v-model="color.value" placeholder="請輸入顏色"></Input>
									</Col>
									<Col span="4">
									<Button @click="removeColor(index)">刪除</Button>
									</Col>
								</Row>
							</FormItem>
						</template>
						<Button type="dashed" @click="addColor" icon="md-add">新增商品顏色</Button>

					</ListItem>

					<ListItem justify="center" align="middle">

						<p align="center" class="list-title">商品規格</p>

						<template v-for="( spec, index ) in  specDynamic.specs ">
							<FormItem v-if="spec.status" :key="index" :label="'商品規格' + spec.index" :prop="'items.' + index + '.value'"
								class="dynamic-row">
								<Row :gutter="4">
									<Col span="18">
									<Input type="text" v-model="spec.value" placeholder="請輸入規格"></Input>
									</Col>
									<Col span="4">
									<Button @click="removeSpec(index)">刪除</Button>
									</Col>
								</Row>
							</FormItem>
						</template>

						<Button type="dashed" @click="addSpec" icon="md-add">新增商品規格</Button>

					</ListItem>

					<ListItem justify="center" align="middle">

						<Row class="form-row" justify="center" align="middle">
							<Col span="5" align="center" class=" row-title">
							<span>商品說明：</span>
							</Col>
							<Col span="19">
							<Input type="textarea" :rows="5" v-model="descriptionValue" maxlength="200" show-word-limit
								placeholder="請輸入說明" />
							</Col>
						</Row>

					</ListItem>

					<ListItem>

						<Row class="form-row" justify="center" align="middle">
							<Col span="5" align="center">
							<span>商品價格：</span>
							</Col>
							<Col span="17">
							<FormItem>
								<Input v-model="priceValue" placeholder="請輸入單價" />
							</FormItem>
							</Col>
							<Col span="2" align="center">
							<span>元</span>
							</Col>
						</Row>

					</ListItem>

					<!-- <FormItem> -->
					<!-- <Button type="primary">Submit</Button> -->
					<!-- @click="handleSubmit('formDynamic')" -->
					<!-- <Button style="margin-left: 8px">Reset</Button> -->
					<!-- @click="handleReset('formDynamic')" -->
					<!-- </FormItem> -->

				</Form>

			</List>
			<template #footer>
				<Button type="dashed">取消</Button>
				<Button type="primary">儲存</Button>
			</template>
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
</style>
