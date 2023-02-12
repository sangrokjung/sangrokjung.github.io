const media = matchMedia("screen and (min-width: 1024px)")
media.addListener((a) => {
    const titleTag1 = document.querySelector('#id_main_title')
    const titleTag2 = document.querySelector('#id_main_title2')

    const seasonTag1 = document.querySelector('#id_season')
    const historyTag1 = document.querySelector('#id_history')
    const imgTag1 = document.querySelector('#img_lotte')
    const vidTag1 = document.querySelector('#vid_nam')

    const titleTag3 = document.querySelector('#id_season-1')
    const historyTag2 = document.querySelector('#id_div_his_1')
    const imgTag2 = document.querySelector('#img_create')
    const imgTag3 = document.querySelector('#img_the')

    const imgTag4 = document.querySelector('#div_army')

    const titleTag4 = document.querySelector('#id_season-2')
    const historyTag3 = document.querySelector('#id_div_his_2')
   

    if (matchMedia("screen and (min-width: 1024px)").matches) {
        // 1024px 이상에서 사용할 스크립트
        console.log('1024 이상')



    } 
    else {
        // 1024px 미만에서 사용할 스크립트
        console.log('1024 미만')
        titleTag1.style.marginLeft = '30px';
        titleTag2.style.marginLeft = '30px';

        seasonTag1.style.marginLeft = '30px';
        historyTag1.style.marginLeft = '30px';
        imgTag1.style.paddingLeft = '538px';
        vidTag1.style.paddingLeft = '538px';

        titleTag3.style.marginLeft = '30px';
        historyTag2.style.marginLeft = '30px';

        imgTag2.style.paddingLeft = '573px';
        imgTag3.style.paddingLeft = '573px';
        imgTag4.style.margin = '0 20px'

        titleTag4.style.marginLeft = '30px';
        historyTag3.style.marginLeft = '30px';


    }
})
