export const getSearchList = (text, list, canSearchSpell) => {
  const reg1 = /^\w+$/g;
  const reg2 = new RegExp(`^${text}`, 'g');
  const reg3 = new RegExp('^[\\u4E00-\\u9FFF]{1,}$', 'g');
  const reg4 = new RegExp(`^${text}`, 'g');
  const resList = [];
  if (text.match(reg1) && canSearchSpell) {
    for (let i = 0, len1 = list.length; i < len1; i++) {
      for (let j = 0, len2 = list[i][1].length; j < len2; j++) {
        if (list[i][1][j].pinyin.match(reg2)) {
          resList.push(list[i][1][j]);
        }
      }
    }
  } else {
    if (reg3.test(text)) {
      for (let i = 0, len1 = list.length; i < len1; i++) {
        for (let j = 0, len2 = list[i][1].length; j < len2; j++) {
          if (list[i][1][j].name.match(reg4)) {
            resList.push(list[i][1][j]);
          }
        }
      }
    }
  }
  return resList;
};
