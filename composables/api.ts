const fetchData = async (url: string) => {
    const res = await $fetch(url);
    const { datas, error } = JSON.parse(res as string);
    if(error > 0) console.error(error);
    return datas;
}

// 获取站点元信息
export const getSiteInfo = async () => await fetchData("http://localhost/BTXphp/index.php/sea/App/get_site_info");

// 获取友情链接
export const getFriendLinks = async () => await fetchData("http://localhost/BTXphp/index.php/sea/Index/get_friend_links");

// 获取静态文章
export const getStatic = async () => await fetchData("http://localhost/BTXphp/index.php/sea/Index/get_static");

// 获取文章列表
export const getArticleList = async () => await fetchData("http://localhost/BTXphp/index.php/sea/Index/get_articles");