/**
 * @description: 购物车 store
 * @author LiQingSong
 */
import { nextTick } from "vue";
import { defineStore } from "pinia";

export interface IProductItem {
	sid: number; // 店铺id
	id: number; // 商品id
	name: string; // 商品名称
	thumb: string; // 图片地址
	price: number; // 价额
	quantity: number; // 购买的数量
	attr?: string; // 选择的属性内容
	checked?: boolean; // 是否选中
	[key: string]: any;
}

// state ts类型
export interface ICartState {
	// 店铺id
	shopId: number[];
	// 店铺id对应的店铺信息
	shopIdInfo: { [id: number]: any };
	// 店铺id对应的产品信息
	shopIdPro: { [id: number]: IProductItem[] };
	// 复选框选中的店铺id
	checkedShopId: number[];
	// 复选框选中的店铺id对应的产品
	checkedShopIdProId: { [id: number]: number[] };
	// 全选值
	checkAllVal: boolean;
	// 是否是管理状态
	isManagement: boolean;
}

export const useCartStore = defineStore("useCartStore", {
	state: (): ICartState => {
		return {
			shopId: [],
			shopIdInfo: {},
			shopIdPro: {},
			checkedShopId: [],
			checkedShopIdProId: {},
			checkAllVal: false,
			isManagement: false,
		};
	},
	getters: {
		/**
		 * @description 是否有产品
		 */
		isHavePro({ shopId }) {
			return shopId.length > 0;
		},
		/**
		 * @description 统计
		 */
		total({ shopId, shopIdPro }) {
			// 购物车累加数量,包括同件商品多次累计
			let quantity = 0;
			// 选中的总价格
			let checkPrice = 0;
			// 选中的商品数
			let checkNum = 0;
			// 选中的累计数量，包括同件商品多次累计
			let checkQuantity = 0;

			shopId.forEach((item) => {
				// 循环购物车中所有商铺
				shopIdPro[item].forEach((proRow) => {
					// 循环商铺中所有商品
					quantity = quantity + proRow.quantity;
					if (proRow.checked) {
						// 如果这个商品选中
						checkNum++;
						checkQuantity = checkQuantity + proRow.quantity;
						checkPrice = checkPrice + proRow.price * proRow.quantity;
					}
				});
			});

			return {
				quantity,
				checkPrice,
				checkNum,
				checkQuantity,
			};
		},
	},
	actions: {
		/**
		 * @description 获取购物车商品
		 */
		async getData() {
			// 这里写对应的ajax请求，然后回调下面代码
			this.shopId = [1, 2];
			this.shopIdInfo = {
				1: { name: "莫莫莫店", checked: false },
				2: { name: "莫莫莫2店", checked: false },
			};
			this.shopIdPro = {
				1: [
					{
						id: 1,
						name: "商品标题1",
						thumb: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
						price: 10.23,
						quantity: 1,
						attr: "属性1，2",
						sid: 1,
						checked: false,
					},
					{
						id: 11,
						name: "商品标题11",
						thumb: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
						price: 11.23,
						quantity: 1,
						attr: "属性789",
						sid: 1,
						checked: false,
					},
				],
				2: [
					{
						id: 2,
						name: "商品标题2",
						thumb: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
						price: 3.12,
						quantity: 1,
						attr: "属性2，3",
						sid: 2,
						checked: false,
					},
				],
			};

			this.checkAllVal = false;
			this.isManagement = false;
		},

		/**
		 * @description 删除对应产品
		 * @param item 产品item
		 * @param index 产品对应 shopIdPro[item.sid] 的下标
		 * @param sIndex 商铺id对应 shopId 的下标
		 */
		async delPro(item: IProductItem, index: number, sIndex: number) {
			// 这里写对应的ajax请求，然后回调下面代码
			// 删除商铺中对应的产品
			this.shopIdPro[item.sid].splice(index, 1);
			if (this.shopIdPro[item.sid].length < 1) {
				// 如果没有产品了，删除对应的商铺
				this.shopId.splice(sIndex, 1);
			} else {
				if (this.checkedShopIdProId[item.sid]) {
					// 如果存在选择的商铺的id key

					// 店铺对应选中的产品数
					const checkedShopIdProIdLen = this.checkedShopIdProId[item.sid].length;
					// 店铺对应的现在的产品数
					const shopIdProLen = this.shopIdPro[item.sid].length;
					// 设置店铺对应的checkbox值
					if (checkedShopIdProIdLen !== shopIdProLen) {
						// 不相等说明 check false
						this.shopIdInfo[item.sid].checked = false;
					} else {
						// 相等说明 check true
						this.shopIdInfo[item.sid].checked = true;
					}
				}
			}

			// 设置全选值
			this.nextTickSetCheckAllVal();
		},

		/**
		 * @description 批量删除勾选的产品
		 */
		async delBatchPro() {
			// 这里写对应的ajax请求，然后回调下面代码

			// 没有产品了，需要删除的商铺Id
			const delShopId: number[] = [];
			this.checkedShopId.forEach((item) => {
				// 循环有选中产品的商铺
				// 选中的产品剔除
				this.shopIdPro[item] = this.shopIdPro[item].filter((item) => !item.checked);
				this.checkedShopIdProId[item] = [];

				// 没有产品的商铺存储起来
				if (this.shopIdPro[item].length < 1) {
					delShopId.push(item);
				}
			});

			// 删除没有产品的商铺
			this.shopId = this.shopId.filter((item) => !delShopId.includes(item));
			this.checkedShopId = [];

			// 设置全选值
			this.nextTickSetCheckAllVal();
		},

		/**
		 * @description 店铺的checkbox change
		 * @param sid number 店铺id
		 */
		shopCheckChange(sid: number) {
			const v = this.shopIdInfo[sid].checked;
			const index = this.checkedShopId.indexOf(sid);
			if (v === true) {
				// 说明全选true
				if (index === -1) {
					// 不存在
					this.checkedShopId.push(sid);
				}
				this.checkedShopIdProId[sid] = this.shopIdPro[sid].map((item) => {
					// 设置产品对应的checkbox 值
					item.checked = true;
					return item.id;
				});
			} else {
				// 说明全选 false
				if (index !== -1) {
					// 存在
					this.checkedShopId.splice(index, 1);
				}
				this.checkedShopIdProId[sid] = [];

				// 设置产品对应的checkbox 值
				this.shopIdPro[sid].map((item) => {
					item.checked = false;
					return item;
				});
			}

			// 设置全选值
			this.nextTickSetCheckAllVal();
		},

		/**
		 * @description 产品checkbox change
		 * @param item 产品
		 */
		shopProCheckChange(item: IProductItem) {
			const v = item.checked;
			if (!this.checkedShopIdProId[item.sid]) {
				this.checkedShopIdProId[item.sid] = [];
			}
			// 产品对应下标
			const index = this.checkedShopIdProId[item.sid].indexOf(item.id);
			if (v === true) {
				// 选中
				if (index === -1) {
					// 不存在，产品id,追加
					this.checkedShopIdProId[item.sid].push(item.id);
				}
			} else {
				// 不选中
				if (index !== -1) {
					// 存在, 产品id,删除
					this.checkedShopIdProId[item.sid].splice(index, 1);
				}
			}

			const index2 = this.checkedShopId.indexOf(item.sid);
			const checkedShopIdProIdLen = this.checkedShopIdProId[item.sid].length;
			if (checkedShopIdProIdLen > 0) {
				// 说明需要赋值店铺id
				if (index2 === -1) {
					// 不存在,店铺id,追加
					this.checkedShopId.push(item.sid);
				}
			} else {
				// 说明需要删除店铺id
				if (index2 !== -1) {
					// 存在,店铺id,删除
					this.checkedShopId.splice(index2, 1);
				}
			}

			// 设置店铺对应的checkbox值
			const shopIdProLen = this.shopIdPro[item.sid].length;
			if (checkedShopIdProIdLen !== shopIdProLen) {
				// 不相等说明 check false
				this.shopIdInfo[item.sid].checked = false;
			} else {
				// 相等说明 check true
				this.shopIdInfo[item.sid].checked = true;
			}

			// 设置全选值
			this.nextTickSetCheckAllVal();
		},

		/**
		 * @description 全选/反选
		 */
		checkAll() {
			if (this.total.quantity < 1) {
				return;
			}

			const checkShopId: any = []; // 选中的店铺id
			const checkShopIdProId: any = {}; // 选择的店铺对应的产品id
			this.shopId.forEach((item) => {
				// 循环购物车中所有商铺
				this.shopIdInfo[item].checked = this.checkAllVal;

				if (this.checkAllVal === true) {
					checkShopId.push(item);
					checkShopIdProId[item] = [];
				}
				this.shopIdPro[item].forEach((proRow) => {
					// 循环商铺中所有商品
					proRow.checked = this.checkAllVal;

					if (this.checkAllVal === true) {
						checkShopIdProId[item].push(proRow.id);
					}
				});
			});

			this.checkedShopId = checkShopId;
			this.checkedShopIdProId = checkShopIdProId;
		},
		/**
		 * @description 设置全选值
		 */
		nextTickSetCheckAllVal() {
			nextTick(() => {
				// 设置全选状态
				this.checkAllVal = this.total.quantity === this.total.checkQuantity && this.total.quantity !== 0;
			});
		},
	},
});
