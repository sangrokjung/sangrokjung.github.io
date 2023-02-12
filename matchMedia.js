const media = matchMedia("screen and (min-width: 1024px)")
media.addListener((a) => {
    const titleVidTag = document.querySelector('#div_id_main_vidieo')
    const titleTag = document.querySelector('#div_id_h1')

    const imgsTag1 = document.querySelector('#id_main_phto1')
    const imgsTag2 = document.querySelector('#id_main_phto2')
    const imgsTag3 = document.querySelector('#id_main_phto3')
    const imgsTag4 = document.querySelector('#id_main_phto4')

    const titleDivTag = document.querySelector('#id_title0')

    const learnTextTag = document.querySelector('#div_id_title')
    const learnListTag = document.querySelector('#id_learn_div')

    const learnJsTag = document.querySelector('#id_js')
    const learnJavaTag = document.querySelector('#id_java')
    const learnMysqlTag = document.querySelector('#id_mysql')
    const learnCssTag = document.querySelector('#id_cs')

    const learnDivTag1 = document.querySelector('#links_div1')
    const learnDivTag2 = document.querySelector('#links_div2')
    const learnDivTag3 = document.querySelector('#links_div3')
    const learnDivTag4 = document.querySelector('#links_div4')

    const linkstitleTag = document.querySelector('.fadein-items2')
    const historyDivTag = document.querySelector('.div-history')

    const linkstitleTag2 = document.querySelector('.fadein-items3')

    const sectionTag2 = document.querySelector('#section-2')

    if (matchMedia("screen and (min-width: 1024px)").matches) {
        // 1024px 이상에서 사용할 스크립트
        console.log('1024 이상')



    } 
    else {
        // 1024px 미만에서 사용할 스크립트
        console.log('1024 미만')
        titleVidTag.style.margin = '0 20px';
        titleTag.style.paddingLeft = '93px';

        imgsTag1.style.maxWidth = `600px`;
        imgsTag2.style.maxWidth = `600px`;
        imgsTag3.style.maxWidth = `600px`;
        imgsTag4.style.maxWidth = `600px`;

        titleDivTag.style.fontSize = '70px';
        titleDivTag.style.marginLeft = '35px';

        learnTextTag.style.marginLeft = `30px`;
        learnListTag.style.marginLeft = `30px`;

        learnJsTag.style.width = '847px';
        learnJavaTag.style.width = '847px';
        learnMysqlTag.style.width = '847px';
        learnCssTag.style.width = '847px';

        learnDivTag1.style.width = '670px';
        learnDivTag2.style.width = '670px';
        learnDivTag3.style.width = '670px';
        learnDivTag4.style.width = '670px';

        linkstitleTag.style.marginLeft = `50px`
        historyDivTag.style.paddingLeft = '575px'

        linkstitleTag2.style.marginLeft = '50px'

        sectionTag2.style.marginLeft = '50px'
        sectionTag2.style.marginBottom = '100px'
        sectionTag2.style.maxWidth = '804px'
    }
      
})
