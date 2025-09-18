let t;
const defaultStyle = `
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,.2);
    transition: all .3s;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 99;
    transition: all .3s;
`;
const hideStyle = defaultStyle + `
    opacity: 0;
    visibility: hidden;
`;
const showStyle = defaultStyle + `
    opacity: 1;
    visibility: visible;
`;
export const showToast = (text: string, duration=2000, icon='') => {
    clearTimeout(t);
    let bToast: HTMLDivElement | null = document.querySelector('.b-toast');
    let bToastIcon;
    if(!bToast) { // 构建组件
        bToast = document.createElement('div');
        bToast.className = 'b-toast';
        const bToastInner = document.createElement('div');
        bToast.appendChild(bToastInner);
        bToastIcon = document.createElement('i');
        bToastIcon.className = 'b-toast-icon'
        const bToastText = document.createElement('div');
        bToastInner.appendChild(bToastIcon);
        bToastInner.appendChild(bToastText);
        bToastInner.style.cssText = `
            color: #fff;
            border-radius: 7px;
            padding: 1.2rem 1.7rem;
            text-align: center;
            background-color: rgba(0,0,0,.9);
            font-size: 1.27rem;
        `;
        bToast.style.cssText = hideStyle;
        document.body.appendChild(bToast);
    }
    bToastIcon = bToast.querySelector('.b-toast-icon');
    if(icon) {
        bToastIcon.className = `b-toast-icon ico-${icon}`;
        bToastIcon.style.cssText = `
            color: #fff;
            font-size: 3.2rem;
            margin-bottom: 1.2rem;
        `;
    } else {
        bToastIcon.style.display = 'none';
    }
    (bToast.childNodes[0].childNodes[1] as HTMLDivElement).innerText = text;
    bToast.style.cssText = showStyle;
    t = setTimeout(() => {  
        bToast.style.cssText = hideStyle;
    }, duration)
}

export const showLoadToast = (text?: string) => {
    let bToast: HTMLDivElement | null = document.querySelector('.b-load-toast');
    if(!bToast) { // 构建组件
        bToast = document.createElement('div');
        bToast.className = 'b-load-toast';
        const bToastInner = document.createElement('div');
        bToast.appendChild(bToastInner);
        const bToastIcon = document.createElement('i');
        bToastIcon.className = 'ico-load ani-rotate ani-loop ani-slow';
        bToastIcon.style.cssText = `
            color: #fff;
            font-size: 3.2rem;
            margin-bottom: 1.2rem;
        `;
        const bToastText = document.createElement('div');
        bToastInner.appendChild(bToastIcon);
        bToastInner.appendChild(bToastText);
        bToastInner.style.cssText = `
            color: #fff;
            border-radius: 7px;
            padding: 1.2rem 1.7rem;
            text-align: center;
            background-color: rgba(0,0,0,.9);
            font-size: 1.27rem;
        `;
        bToast.style.cssText = hideStyle;
        document.body.appendChild(bToast);
    }
    (bToast.childNodes[0].childNodes[1] as HTMLDivElement).innerText = text || '数据加载中';
    bToast.style.cssText = showStyle;
}

export const hideLoadToast = () => {
    clearTimeout(t);
    let bToast: HTMLDivElement | null = document.querySelector('.b-load-toast');
    if(!bToast) return;
    bToast.style.cssText = hideStyle;
}