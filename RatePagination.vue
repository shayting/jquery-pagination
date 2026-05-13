<template>
  <div class="page-count" id="page-count">
    顯示第 {{ (currPage - 1) * countOfPage + 1 }} 至
    {{
      currPage * countOfPage > list.length
        ? list.length
        : currPage * countOfPage
    }}
    項結果，共 {{ list.length }} 項
  </div>
  <div class="page-number">
    <button
      class="pageCircle"
      :disabled="currPage == 1"
      id="forward"
      style="transform: rotate(-180deg)"
      @click="setPage(currPage - 1)"
    ></button>
    <div id="pageContainer" style="display: inline-flex; flex-wrap: wrap">
      <button
        class="btn-pointer"
        :class="currPage == 1 ? 'activeNumber' : 'unactiveNumber'"
        :disabled="currPage == 1"
        @click="setPage(1)"
      >
        {{ 1 }}
      </button>
      <button
        v-show="totalPage > 6 && currPage >= 4"
        class="btn-pointer unactiveNumber"
        :disabled="true"
      >
        ...
      </button>
      <template v-if="totalPage > 2">
        <button
          class="btn-pointer"
          :class="currPage == n + 1 ? 'activeNumber' : 'unactiveNumber'"
          v-for="n in totalPage - 2"
          v-show="
            (currPage <= 3 && n + 1 <= 5) ||
            (currPage > totalPage - 3 && n + 1 >= totalPage - 4) ||
            Math.abs(currPage - (n + 1)) <= 1
          "
          :key="'page_' + (n + 1)"
          :disabled="currPage == n + 1"
          @click="setPage(n + 1)"
        >
          {{ n + 1 }}
        </button>
      </template>
      <button
        v-show="totalPage > 6 && totalPage - currPage >= 3"
        class="btn-pointer unactiveNumber"
        :disabled="true"
      >
        ...
      </button>
      <button
        v-if="totalPage > 1"
        class="btn-pointer"
        :class="currPage == totalPage ? 'activeNumber' : 'unactiveNumber'"
        :disabled="currPage == totalPage"
        @click="setPage(totalPage)"
      >
        {{ totalPage }}
      </button>
    </div>
    <button
      class="pageCircle"
      :disabled="currPage == totalPage"
      id="backward"
      @click="setPage(currPage + 1)"
    ></button>
  </div>
</template>
<script setup>
import { ref } from "vue";

const list = ref([
  "dummy1",
  "dummy2",
  "dummy3",
  "dummy4",
  "dummy5",
  "dummy6",
  "dummy7",
  "dummy8",
  "dummy9",
  "dummy10",
  "dummy11",
  "dummy12"
]);

const totalPage = ref(1);
const pageStart = ref(0);
const countOfPage = ref(2); //一頁顯示多少項目
const currPage = ref(1);
/**
 * 取得總頁數
 */
const getTotalPage = () => {
  totalPage.value = Math.ceil(list.value.length / countOfPage.value);
};
/**
 * 設置當前頁數
 */
const setPage = page => {
  currPage.value = page;
  pageStart.value = (page - 1) * countOfPage.value;
};

getTotalPage();
setPage(1);
</script>
<style scoped>
@import url("@/assets/css/FZ63/rate.css");
.pageCircle {
  cursor: pointer;
}
.btn-pointer {
  cursor: pointer;
}
.pageCircle:disabled {
  background-color: #f5f5f5;
  background-image: url("@/assets/img/upload/rate/arrow_disable.svg");
}
.product_search {
  font-size: 16px;
}
</style>
