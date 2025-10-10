const fetchData = async (url: string, formData: FormData) => {
    fetch(url, {
        method: 'POST',
        body: formData, 
    })
    .then(response => response.json()) 
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

// 图片上传测试接口
export const uploadImg = async (data: FormData) => await fetchData("http://localhost/BTXphp/sea/Test/upload_file", data);