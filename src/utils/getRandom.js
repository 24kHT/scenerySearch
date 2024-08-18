export const getRandom = () => {
    return Math.floor(Math.random() * 6); // 生成 [0, 5] 区间的随机整数
}

// 获取n到m的随机数
export const getRandomInt = (n, m) => {
    // 确保 n 和 m 是整数，并且 n < m
    if (n > m) {
        throw new Error("参数 n 必须小于参数 m");
    }

    // 计算范围内的随机整数
    return Math.floor(Math.random() * (m - n + 1)) + n;
}
