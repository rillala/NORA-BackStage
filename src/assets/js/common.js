// 共用function可以放在這邊

export const getImageUrl = (paths) => {
  return `http://localhost/NORAapi/image/${paths}`;
};

// 資料庫中圖片路徑使用辦法:
// import { getImageUrl } from "@/assets/js/common";

// methods:{
//     getImageUrl(paths){
//     return getImageUrl(paths);
//     },
// }
// paths == image資料架下的路徑和檔案名稱
// 到時候資料庫表格裡的圖片路徑, 就要輸入'paths'
