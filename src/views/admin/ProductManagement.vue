<template>
  <div><Loading/></div>
  <main class="container mt-3">
    <button
      type="button"
      class="btn btn-primary"
      data-bs-toggle="modal"
      data-bs-target="#addProductModal"
    >
      新增產品
    </button>
    <table class="table align-middle">
      <thead>
        <tr>
          <th>產品圖片</th>
          <th>產品名稱</th>
          <th>分類</th>
          <th>原價</th>
          <th>售價</th>
          <th>是否上架</th>
          <th>編輯/刪除</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in productsAry" :key="item.id">
          <th>
            <div
              style="width=120px;height: 120px;background-size: cover;
            background-position: center; background-repeat:no-repeat;"
              :style="{ 'background-image': `url(${item.imageUrl})` }"
            ></div>
          </th>
          <th>{{ item.title }}</th>
          <th>{{ item.category }}</th>
          <th>{{ $toCurrency(item.origin_price) }}</th>
          <th>{{ $toCurrency(item.price) }}</th>
          <th>
            <div class="form-check form-switch">
              <input
                class="form-check-input"
                type="checkbox"
                id="flexSwitchCheckChecked"
                @click="updateIsEnable(item)"
                :checked="item.is_enabled"
              />
              <label class="form-check-label" for="flexSwitchCheckChecked">
                {{ item.is_enabled ? '上架' : '未上架' }}
              </label>
            </div>
          </th>
          <th>
            <button
              type="button"
              class="btn btn-outline-success me-1"
              @click="getEditProduct(item.id)"
              data-bs-toggle="modal"
              data-bs-target="#productEditModal"
            >
              編輯
            </button>
            <button type="button" class="btn btn-primary" @click="deleteProduct(item)">
              刪除
            </button>
          </th>
        </tr>
      </tbody>
    </table>
  </main>
  <!-- productEditModal v-if="tempProduct.imageUrl" -->
  <div
    id="productEditModal"
    ref="productEditModal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="productModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-xl">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 id="productModalLabel" class="modal-title">
            <span>編輯產品</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-4">
              <div class="form-group">
                <label for="imageUrl">主要圖片</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="請輸入圖片連結"
                  v-model="tempProduct.imageUrl"
                />
                <img class="img-fluid" :src="tempProduct.imageUrl" />
              </div>
              <div class="mb-1">多圖新增</div>
              <!-- 使用 isArray判斷tempProduct.imagesUrl是否為陣列 開頭A大寫為建構函式=new Array()-->
              <!-- v-if="Array.isArray(tempProduct.imagesUrl)" -->
              <div v-if="Array.isArray(tempProduct.imagesUrl)">
                <!-- 資料建構 -->
                <!-- 使用 v-for 跑 tempProduct.imagesUrl 來對應按下新增圖片按鈕產生空欄位-->
                <!-- v-for="(item, i) in tempProduct.imagesUrl" :key="i" -->
                <div
                  class="mb-1"
                  v-for="(item, i) in tempProduct.imagesUrl"
                  :key="i"
                >
                  <div class="form-group">
                    <label for="imageUrl">圖片網址</label>
                    <!-- v-model="tempProduct.imagesUrl[i]" -->
                    <input
                      type="text"
                      class="form-control"
                      v-model="tempProduct.imagesUrl[i]"
                      placeholder="請輸入圖片連結"
                    />
                  </div>
                  <!-- :src="item" -->
                  <img class="img-fluid" :src="item" />
                </div>
                <!-- 新增欄位 -->
                <!-- 圖片陣列長度如果為0或1以上,用!false or true反轉 或 如果最後一個欄位有值才會再度顯示新增-->
                <!-- v-if="!tempProduct.imagesUrl.length ||
                tempProduct.imagesUrl[tempProduct.imagesUrl.length - 1]" -->
                <div
                  v-if="
                    !tempProduct.imagesUrl.length ||
                    tempProduct.imagesUrl[tempProduct.imagesUrl.length - 1]
                  "
                >
                  <!-- 使用 push加入imagesUrl陣列末端-->
                  <!-- @click="tempProduct.imagesUrl.push('')" -->
                  <button
                    type="button"
                    class="btn btn-outline-primary btn-sm d-block w-100"
                    @click="tempProduct.imagesUrl.push('')"
                  >
                    新增圖片
                  </button>
                </div>
                <!-- v-else -->
                <div>
                  <!-- 使用 pop 把imagesUrl陣列最末端資料刪除-->
                  <!-- @click="tempProduct.imagesUrl.pop()" -->
                  <button
                    type="button"
                    class="btn btn-outline-danger btn-sm d-block w-100"
                    @click="tempProduct.imagesUrl.pop()"
                  >
                    刪除圖片
                  </button>
                </div>
              </div>
              <!-- 如果tempProduct.imagesUrl不是陣列 顯示此區塊 去觸發新增陣列函式createImages -->
              <!-- v-else -->
              <div v-else>
                <!-- @click="createImages" -->
                <button
                  type="button"
                  class="btn btn-outline-primary btn-sm d-block w-100"
                  @click="createImages"
                >
                  新增陣列圖片
                </button>
              </div>
            </div>
            <div class="col-sm-8">
              <div class="form-group">
                <label for="title">標題</label>
                <!-- v-model="tempProduct.title" -->
                <input
                  id="title"
                  type="text"
                  v-model="tempProduct.title"
                  class="form-control"
                  placeholder="請輸入標題"
                />
              </div>
              <div class="row">
                <div class="form-group col-md-6">
                  <label for="category">分類</label>
                  <!-- v-model="tempProduct.category" -->
                  <input
                    id="category"
                    v-model="tempProduct.category"
                    type="text"
                    class="form-control"
                    placeholder="請輸入分類"
                  />
                </div>
                <div class="form-group col-md-6">
                  <label for="price">單位</label>
                  <!-- v-model="tempProduct.unit" -->
                  <input
                    id="unit"
                    v-model="tempProduct.unit"
                    type="text"
                    class="form-control"
                    placeholder="請輸入單位"
                  />
                </div>
              </div>
              <div class="row">
                <div class="form-group col-md-6">
                  <label for="origin_price">原價</label>
                  <!-- v-model.number="tempProduct.origin_price" -->
                  <input
                    id="origin_price"
                    type="number"
                    min="0"
                    v-model.number="tempProduct.origin_price"
                    class="form-control"
                    placeholder="請輸入原價"
                  />
                </div>
                <div class="form-group col-md-6">
                  <label for="price">售價</label>
                  <!-- v-model.number="tempProduct.price" -->
                  <input
                    id="price"
                    v-model.number="tempProduct.price"
                    type="number"
                    min="0"
                    class="form-control"
                    placeholder="請輸入售價"
                  />
                </div>
              </div>
              <hr />
              <div class="form-group">
                <label for="description">產品描述</label>
                <!-- v-model="tempProduct.description" -->
                <textarea
                  id="description"
                  v-model="tempProduct.description"
                  type="text"
                  class="form-control"
                  placeholder="請輸入產品描述"
                >
                </textarea>
              </div>
              <div class="form-group">
                <label for="content">說明內容</label>
                <!-- v-model="tempProduct.content" -->
                <textarea
                  id="description"
                  v-model="tempProduct.content"
                  type="text"
                  class="form-control"
                  placeholder="請輸入說明內容"
                >
                </textarea>
              </div>
              <div class="form-group">
                <div class="form-check">
                  <!-- v-model="tempProduct.is_enabled" :true-value="1" :false-value="0"-->
                  <input
                    id="is_enabled"
                    v-model="tempProduct.is_enabled"
                    class="form-check-input"
                    type="checkbox"
                    :true-value="1"
                    :false-value="0"
                  />
                  <label class="form-check-label" for="is_enabled"
                    >是否啟用</label
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-secondary"
            data-bs-dismiss="modal"
          >
            取消
          </button>
          <!-- @click="$emit('update-product',tempProduct)" -->
          <button type="button" class="btn btn-primary" @click="editProduct()">
            確認
          </button>
        </div>
      </div>
    </div>
  </div>

  <!--  add productModal  -->
  <div
    id="addProductModal"
    ref="addProductModal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="productModalLabel"
    aria-hidden="true"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
  >
    <div class="modal-dialog modal-xl">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 id="addProductModalLabel" class="modal-title">
            <span>編輯產品</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-4">
              <div class="form-group">
                <label for="imageUrl">主要圖片</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="請輸入圖片連結"
                  v-model="addProductModal.data.imageUrl"
                />
                <img class="img-fluid" :src="addProductModal.data.imageUrl" />
              </div>
              <div class="mb-1">多圖新增</div>
              <!-- 使用 isArray判斷tempProduct.imagesUrl是否為陣列 開頭A大寫為建構函式=new Array()-->
              <!-- v-if="Array.isArray(tempProduct.imagesUrl)" -->
              <div v-if="Array.isArray(addProductModal.data.imagesUrl)">
                <!-- 資料建構 -->
                <!-- 使用 v-for 跑 tempProduct.imagesUrl 來對應按下新增圖片按鈕產生空欄位-->
                <!-- v-for="(item, i) in tempProduct.imagesUrl" :key="i" -->
                <div
                  class="mb-1"
                  v-for="(item, i) in addProductModal.data.imagesUrl"
                  :key="i"
                >
                  <div class="form-group">
                    <label for="imageUrl">圖片網址</label>
                    <!-- v-model="tempProduct.imagesUrl[i]" -->
                    <input
                      type="text"
                      class="form-control"
                      v-model="addProductModal.data.imagesUrl[i]"
                      placeholder="請輸入圖片連結"
                    />
                  </div>
                  <!-- :src="item" -->
                  <img class="img-fluid" :src="item" />
                </div>
                <!-- 新增欄位 -->
                <!-- 圖片陣列長度如果為0或1以上,用!false or true反轉 或 如果最後一個欄位有值才會再度顯示新增-->
                <!-- v-if="!tempProduct.imagesUrl.length ||
                tempProduct.imagesUrl[tempProduct.imagesUrl.length - 1]" -->
                <div
                  v-if="
                    !addProductModal.data.imagesUrl.length ||
                    addProductModal.data.imagesUrl[
                      addProductModal.data.imagesUrl.length - 1
                    ]
                  "
                >
                  <!-- 使用 push加入imagesUrl陣列末端-->
                  <!-- @click="tempProduct.imagesUrl.push('')" -->
                  <button
                    type="button"
                    class="btn btn-outline-primary btn-sm d-block w-100"
                    @click="addProductModal.data.imagesUrl.push('')"
                  >
                    新增圖片
                  </button>
                </div>
                <!-- v-else -->
                <div>
                  <!-- 使用 pop 把imagesUrl陣列最末端資料刪除-->
                  <!-- @click="tempProduct.imagesUrl.pop()" -->
                  <button
                    type="button"
                    class="btn btn-outline-danger btn-sm d-block w-100"
                    @click="addProductModal.data.imagesUrl.pop()"
                  >
                    刪除圖片
                  </button>
                </div>
              </div>
              <!-- 如果tempProduct.imagesUrl不是陣列 顯示此區塊 去觸發新增陣列函式createImages -->
              <!-- v-else -->
              <div v-else>
                <!-- @click="createImages" -->
                <button
                  type="button"
                  class="btn btn-outline-primary btn-sm d-block w-100"
                  @click="createImages"
                >
                  新增陣列圖片
                </button>
              </div>
            </div>
            <div class="col-sm-8">
              <div class="form-group">
                <label for="title">標題</label>
                <!-- v-model="tempProduct.title" -->
                <input
                  id="addProductModalTitle"
                  type="text"
                  v-model="addProductModal.data.title"
                  class="form-control"
                  placeholder="請輸入標題"
                />
              </div>
              <div class="row">
                <div class="form-group col-md-6">
                  <label for="category">分類</label>
                  <!-- v-model="tempProduct.category" -->
                  <input
                    id="addProductModalCategory"
                    v-model="addProductModal.data.category"
                    type="text"
                    class="form-control"
                    placeholder="請輸入分類"
                  />
                </div>
                <div class="form-group col-md-6">
                  <label for="price">單位</label>
                  <!-- v-model="tempProduct.unit" -->
                  <input
                    id="addProductModalUnit"
                    v-model="addProductModal.data.unit"
                    type="text"
                    class="form-control"
                    placeholder="請輸入單位"
                  />
                </div>
              </div>
              <div class="row">
                <div class="form-group col-md-6">
                  <label for="origin_price">原價</label>
                  <!-- v-model.number="tempProduct.origin_price" -->
                  <input
                    id="addProductModalOrigin_price"
                    type="number"
                    min="0"
                    v-model.number="addProductModal.data.origin_price"
                    class="form-control"
                    placeholder="請輸入原價"
                  />
                </div>
                <div class="form-group col-md-6">
                  <label for="price">售價</label>
                  <!-- v-model.number="tempProduct.price" -->
                  <input
                    id="addProductModalPrice"
                    v-model.number="addProductModal.data.price"
                    type="number"
                    min="0"
                    class="form-control"
                    placeholder="請輸入售價"
                  />
                </div>
              </div>
              <hr />
              <div class="form-group">
                <label for="description">產品描述</label>
                <!-- v-model="tempProduct.description" -->
                <textarea
                  id="addProductModalDescription"
                  v-model="addProductModal.data.description"
                  type="text"
                  class="form-control"
                  placeholder="請輸入產品描述"
                >
                </textarea>
              </div>
              <div class="form-group">
                <label for="content">說明內容</label>
                <!-- v-model="tempProduct.content" -->
                <textarea
                  id="addProductModalDescription"
                  v-model="addProductModal.data.content"
                  type="text"
                  class="form-control"
                  placeholder="請輸入說明內容"
                >
                </textarea>
              </div>
              <div class="form-group">
                <div class="form-check">
                  <!-- v-model="tempProduct.is_enabled" :true-value="1" :false-value="0"-->
                  <input
                    id="is_enabled"
                    v-model="addProductModal.data.is_enabled"
                    class="form-check-input"
                    type="checkbox"
                    :true-value="1"
                    :false-value="0"
                  />
                  <label class="form-check-label" for="is_enabled"
                    >是否啟用</label
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-secondary"
            data-bs-dismiss="modal"
          >
            取消
          </button>
          <!-- @click="$emit('update-product',tempProduct)" -->
          <button type="button" class="btn btn-primary" @click="addProduct()">
            確認
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
</style>

<script>
// import { Modal } from 'bootstrap';
// padeLoading component
import Loading from '../../components/Loading.vue';

export default {
  components: {
    Loading,
  },
  data() {
    return {
      id: '',
      productsAry: [],
      // 蒐集全域元件需要的頁碼data
      pagination: {},
      // 新增產品
      addProductModal: {
        data: {
          // 產品名
          title: '',
          // 分類
          category: '',
          // 售價
          origin_price: 0,
          // 原價
          price: 0,
          // 單位
          unit: '',
          // 描述
          description: '',
          // 內容
          content: '',
          // 是否啟用
          is_enabled: 1,
          // 主圖
          imageUrl: '',
          // 多圖
          imagesUrl: [],
        },
      },
      // 修改產品預存結構要送回後端的資料
      tempProduct: {},
    };
  },
  mounted() {
    // bs5 modal
    // 編輯部分modal
    // this.productModal = new bootstrap.Modal(document.getElementById('productEditModal'), {
    //   keyboard: false,
    // });
    // this.productModal = new Modal(document.getElementById('productEditModal'));
    // this.productEditModal.show();// 驗證能否叫出productEditModal
    // 刪除部分modal
    // productDeleteModal = new bootstrap.Modal(document.getElementById('productDeleteModal'), {
    //   keyboard: false,
    // })
    // productDeleteModal.show();//驗證能否叫出productDeleteModal
  },
  methods: {
    // 全域元件pagination 使用$emit操作 代入item(page)作為參數 來達成切換頁面並重新渲染 記得api補上 ?page=:${page}
    // page = 1意思是當沒有參數帶入時,參數預設1
    getProducts(page = 1) {
      // 管理控制台 [需驗證]- 取得後台產品列表
      // [API]: /api/:api_path/admin/products?page=:page [方法]: get
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/products?page=${page}`;
      this.$http
        .get(url) // 資料庫每個人path是獨立的
        .then((res) => {
          if (res.data.success) {
            this.productsAry = res.data.products; // 將空陣列賦與後台products資料
            this.pagination = res.data.pagination; // 將頁碼res帶到data內供元件使用
          } else {
            this.$swal({
              title: '請重新登入!',
              icon: 'error',
            });
          }
        })
        .catch((err) => {
          //  接收錯誤回傳
          this.$swal({
            title: err,
            icon: 'error',
          });
        });
    },
    getEditProduct(id) {
      this.productsAry.forEach((item) => {
        if (item.id === id) {
          this.tempProduct = item;
        }
      });
    },
    deleteProduct(item) {
      // 管理控制台 [需驗證]- 刪除產品 /api/:api_path/admin/product/:product_id [方法]: delete
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${item.id}`;
      const data = this.tempProduct;
      if (window.confirm(`確定刪除" ${item.title} "產品嗎?`) === true) {
        this.$http
          .delete(url, { data }) // 資料庫每個人path是獨立的
          .then((res) => {
            if (res.data.success) {
              this.$swal({
                title: '已刪除產品',
              });
              this.getProducts();
            } else {
              this.$swal({
                title: res.data.success,
                icon: 'error',
              });
            }
          })
          .catch((err) => {
            //  接收錯誤回傳
            this.$swal({
              title: err,
              icon: 'error',
            });
          });
      } else {
        this.$swal({
          title: '已取消',
          icon: 'error',
        });
      }
    },
    addProduct() {
      // 管理控制台 [需驗證] - 商品建立 /api/:api_path/admin/product [方法]: post 帶參數{ data }
      // title(String)、category(String)、unit(String)、origin_price(Number)、price(Number) 為必填欄位
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product`;
      const { data } = this.addProductModal;
      if (window.confirm('確定新增產品嗎?') === true) {
        this.$http
          .post(url, { data }) // 資料庫每個人path是獨立的
          .then((res) => {
            if (res.data.success) {
              this.$swal({
                title: '已建立產品!',
              });
              this.getProducts();
              this.addProductModal.data.title = '';
              this.addProductModal.data.category = '';
              this.addProductModal.data.origin_price = 0;
              this.addProductModal.data.price = 0;
              this.addProductModal.data.unit = '';
              this.addProductModal.data.description = '';
              this.addProductModal.data.content = '';
              this.addProductModal.data.is_enabled = 1;
              this.addProductModal.data.imageUrl = '';
              this.addProductModal.data.imagesUrl = [];
            } else {
              this.$swal({
                title: res.data.message,
                icon: 'error',
              });
            }
          })
          .catch((err) => {
            //  接收錯誤回傳
            this.$swal({
              title: err,
              icon: 'error',
            });
          });
      } else {
        this.$swal({
          title: '已取消',
          icon: 'error',
        });
      }
    },
    editProduct() {
      // 管理控制台 [需驗證]-修改產品  /api/:api_path/admin/product/:id [方法]: put
      /* [說明]: id(String)、title(String)、category(String)、
      unit(String)、origin_price(Number)、price(Number) 為必填欄位 */
      const data = this.tempProduct;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${this.tempProduct.id}`;
      if (
        window.confirm(`確定修改" ${this.tempProduct.id} "產品嗎?`) === true
      ) {
        this.$http
          .put(url, { data })
          .then((res) => {
            if (res.data.success) {
              this.$swal({
                title: res.data.message,
              });
              this.getProducts();
            } else {
              this.$swal({
                title: res.data.message,
                icon: 'error',
              });
            }
          })
          .catch((err) => {
            //  接收錯誤回傳
            this.$swal({
              title: err,
              icon: 'error',
            });
          });
      } else {
        this.$swal({
          title: '已取消',
          icon: 'error',
        });
      }
    },
    updateIsEnable(item) {
      const data = item;
      if (data.is_enabled !== 1) {
        data.is_enabled = 1;
      } else {
        data.is_enabled = 0;
      }
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${item.id}`;
      // 上架
      if (data.is_enabled === 1) {
        this.$http
          .put(url, { data }) // 資料庫每個人path是獨立的
          .then((res) => {
            if (res.data.success) {
              this.$swal({
                title: '已上架產品',
              });
              this.getProducts();
            } else {
              this.$swal({
                title: res.data.message,
                icon: 'error',
              });
            }
          })
          .catch((err) => {
            //  接收錯誤回傳
            this.$swal({
              title: err,
              icon: 'error',
            });
          });
      }
      // 下架
      if (data.is_enabled === 0) {
        this.$http
          .put(url, { data }) // 資料庫每個人path是獨立的
          .then((res) => {
            if (res.data.success) {
              this.$swal({
                title: '已下架產品',
              });
              this.getProducts();
            } else {
              this.$swal({
                title: res.data.message,
                icon: 'error',
              });
            }
          })
          .catch((err) => {
            //  接收錯誤回傳
            this.$swal({
              title: err,
              icon: 'error',
            });
          });
      }
    },
    createImages() {
      // 新增圖片陣列
      this.tempProduct.imagesUrl = [''];
    },
  },
  created() {
    this.getProducts();
  },
};
</script>
