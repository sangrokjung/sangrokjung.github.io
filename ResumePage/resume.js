(()=>{
    // 스크롤 값
    let yOffset = 0;

    // 현재 보여지는 section
    let currentSection = 0;     

    let PrevSectionHeight = 0;

    let sectionYOffset = 0;

    let intv;

    let bRunFlag = null;

    let opctValue = 0;
    let tslYValue = 0;
    let tslXValue = 300;

    setInterval
    const sectionSet = [
        // section-0
        {
            // type : section의 구분값 (sticky : 글자위치가 고정되어 스크롤에 반응하는 섹션)
            //                          normal : 일반적인 스크롤 섹션
            type : 'normal',

            // height : 스크롤의 높이, 초기화함수에서 화면 구성에 따라 비율로 설정됨.
            height : 0,

            // multiple : 스크롤 높이를 설정하기 위한 배수.
            multiple : 3,

            // section에서 사용하는 element들을 저장.
            objs : {
                container : document.querySelector('#section-0'),
                switcher : document.querySelector('#local-nav-item-1'),
                mainTitle : document.querySelector('#id_main_title'),
                mainTitle2 : document.querySelector('#id_main_title2'),
                menuSwitcher : document.getElementById("menuSwitcher"),

                titleSson : document.querySelector('#id_season'),
                history1 : document.querySelector('#id_history'),

                subImg : document.querySelector('#img_lotte'),
                subVid : document.querySelector('#vid_nam'),

                music : document.querySelector('#div_applemusic'),

                //section2
                titleSson2 : document.querySelector('#id_season-1'),
                history2 : document.querySelector('#id_div_his_1')
            },
            // section에서 사용하는 값들을 저장.
            values : {
                mainTitle_opacity_out : [1, 0, {start : 0.01, end : 0.04}],

                switcher_opacity_in : [0, 1, {start : 0.05, end : 0.08}],
                mainTitle2_opacity_out : [1, 0, {start : 0.05, end : 0.08}],

                titleSson_op_out : [1, 0, {start : 0.33, end : 0.35}],
                history1_op_out : [1, 0, {start : 0.35, end : 0.37}],

                subImg_op_in : [0, 1, {start : 0.31, end : 0.35}],
                subImg_op_out: [1, 0, {start : 0.35, end : 0.39}],

                subVid_op_in : [0, 1, {start : 0.35, end : 0.39}],
                subVid_op_in : [1, 0, {start : 0.32, end : 0.34}],

                part1_op_in : [0, 1, {start : 0.1, end : 0.3}],

                music_op_in : [0, 1, {start : 0.4, end : 0.6}],
                music_op_out : [1, 0, {start : 0.67, end : 0.73}],

                titleSson2_op_in : [0, 1, {start : 0.73, end : 0.9}]
            }

        },
        
        // section-1
        {
            type : 'sticky',
            height : 0,
            multiple : 2,
            objs : {
                container : document.querySelector('#section-1'),
                titleSson2 : document.querySelector('#id_season-1'),
                history2 : document.querySelector('#id_div_his_1'),
                armyImg : document.querySelector('#div_army'),

                titleSson3 : document.querySelector('#id_season-2'),
                history3 : document.querySelector('#id_div_his_2')
            },
            values : {
                titleSson2_op_out : [1, 0, {start : 0, end : 0.04}],
                history2_op_out : [1, 0, {start : 0.04, end : 0.07}],
                armyImg_op_out : [1, 0, {start : 0.5, end : 0.59}],

                titleSson3_op_int : [0, 1, {start : 0.63, end : 0.7}],
            }
        },

        // section-2
        {
            type : 'normal',
            height : 0,
            multiple : 2,            
            objs : {
                container : document.querySelector('#section-2'),
                titleSson3 : document.querySelector('#id_season-2'),
                history3 : document.querySelector('#id_div_his_2')
            },
            values : {
                titleSson3_op_out : [1, 0, {start : 0, end : 0.05}],
                
            }
        }        
    ];

//-------------------------------------------------------------------------
// 함수 파트
//-------------------------------------------------------------------------
    
    // sectionSet 배열을 초기화 해주는 함수.
    const initSectionSet = function()
    {
        // 높이를 설정.
        for(let i = 0; i < sectionSet.length; i++)
        {
            // 높이를 설정한다.
            sectionSet[i].height = window.innerHeight * sectionSet[i].multiple;                 
            sectionSet[i].objs.container.style.height = `${sectionSet[i].height}px`;

        }

    }    

    // yOffset에 따라 현재 보고있는 Section을 설정한다.\
    // 스크롤이 일어날때 실행되어야 한다.
    const getCurrentSection = function()
    {   
        let result = 0;
        if (yOffset <= sectionSet[0].height)
        {
            result = 0;

        }
        else if ((yOffset > sectionSet[0].height) && 
                 (yOffset <= sectionSet[0].height + sectionSet[1].height))
        {
            result = 1;
            
        }
        else if (yOffset > sectionSet[0].height + sectionSet[1].height)
        {
            result = 2;
        }

        return result;
        
        // console.log('currentSection = ' + currentSection);
    }

    //현재 section의 위쪽 section의 합을 구하는 함수
    const getPrevSectionHeight = function () {
        let result = 0;

        for (let i = 0; i < currentSection; i++) {
            result = result + sectionSet[i].height;
        }

        return result;
    }

    // 최초에 HTML Page를 초기화하는 함수.
    const initHTMLPage = function()
    {
        // sectionSet을 초기화한다.
        initSectionSet();

        // 기타 전역변수들도 초기화.
        yOffset = 0;

    }

    // 스크롤시에 수행되는 함수
    const scrollLoop = function()
    {
        // currentSection을 설정한다.
        getCurrentSection();

        // currentSection에 따른 CSS값을 설정.
        document.body.setAttribute('id', `show-section-${currentSection}`)

        // 해당 currentSection에서 에니메이션을 실행한다.
        playAnimation();
    }

    const calcValue = function (values) {
        //현재 sectionY offset에 따라 values의 범위 내에서 값을 계산 
        let result = 0;
        let range = 0;
        let rate = 0;
        //구하고자 하는 영역의 높이 시작값, 끝 값, 영역의 전체 높이 값, 영역의 Y Offset
        let partStart = 0;
        let partEnd = 0;
        let partHeight = 0;

        if(values.length === 3){
            partStart = sectionSet[currentSection].height * values[2].start;
            partEnd = sectionSet[currentSection].height * values[2].end;
            console.log('sectionYOffset = ' + sectionYOffset)
            console.log('partStart = ' + partStart)
            console.log('partEnd = ' + partEnd)
            partHeight = partEnd - partStart;

            if (sectionYOffset >= partStart * 1.02 && sectionYOffset <= partEnd * 0.99) {
                // console.log('Part ACTION VALUES')
                rate = (sectionYOffset - partStart) / partHeight;
                range = values[1] - values[0];
                result = ((rate * range) + values[0]);
                return result
            }
            else if (sectionYOffset < partStart * 1.02 ) {
                // console.log('Part START VALUES')
                result = values[0]
                return result;
            }
            else if (sectionYOffset >= partEnd * 0.99) {
                console.log('Part END VALUES')
                result = values[1]
                return result;
            }
            // 풀어쓴 식
            // rate = (sectionYOffset - (sectionSet[currentSection].height) * values[2].start ) / 
            //         ((sectionSet[currentSection].height) * (values[2].end - values[2].start))        
            // range = values[1] - values[0];
            // result = ((rate * range) + values[0]);
            // if (result <= 0.05) {
            //     result = 0;
            //     return result
            // }
            // else if (result >= 0.95) {
            //     result = 1;
            //     return result
            // }
            // return result
        } 
        else{
            //전체 높이 대비, sectionYOffset의 비율.
            rate = sectionYOffset / sectionSet[currentSection].height
            range = values[1] - values[0];
            result = (rate * range) + values[0]
            return result
            // Opacity Values만 허용 하는 식
            // if (values[1] > values[0]) {
            //     range = values[1] - values[0]
            //     result = (1 / range) * (sectionYOffset * (range / sectionSet[currentSection].height));

            //     return result
            // }
            // else {
            //     range = values[0] - values[1]
            //     result = (1 - ((1 / range) * (sectionYOffset * (range / sectionSet[currentSection].height))));

            //     return result
            // }
        }
    }


    const playAnimation = function() {
        let opInVal = 0;
        let opOutval = 0;
        let tsYinVal = 0;
        let tsYoutValue = 0;
        let tsXinVal = 0;
        let tsXoutValue = 0;

        const offsetRate = sectionYOffset / sectionSet[currentSection].height;
        console.log('offsetRate = ' + offsetRate)

        let secObj = sectionSet[currentSection].objs

        //mene switcher
        
        const menu = document.getElementById("menu");
        let rotation = 0;

        switch(currentSection){
            case 0 : 
                console.log('case0')
                if(offsetRate < 0.01) {
                    secObj.mainTitle.style.opacity = `${1}`;
                    secObj.mainTitle2.style.opacity = `${1}`;

                    secObj.mainTitle2.style.display = 'flex';
                    secObj.mainTitle.style.display = 'flex';

                    secObj.switcher.style.opacity = `${0}`;
                    secObj.menuSwitcher.style.cursor = 'default';
                }
                else if (offsetRate > 0.01 && offsetRate < 0.04) {
                    secObj.switcher.style.cursor = 'default';
                    opOutval = calcValue(sectionSet[currentSection].values.mainTitle_opacity_out);
                    secObj.mainTitle.style.opacity = `${opOutval}`;
                }
                else if (offsetRate > 0.05 && offsetRate < 0.08){
                    secObj.mainTitle.style.opacity = `${0}`;

                    opOutval = calcValue(sectionSet[currentSection].values.mainTitle2_opacity_out);
                    secObj.mainTitle2.style.opacity = `${opOutval}`;

                    opInVal = calcValue(sectionSet[currentSection].values.switcher_opacity_in);
                    secObj.switcher.style.opacity = `${opInVal}`;
                }
                else if(offsetRate > 0.08 && offsetRate < 0.09) {
                    secObj.mainTitle2.style.opacity = `${0}`;
                    secObj.mainTitle2.style.display = 'none';
                    secObj.mainTitle.style.display = 'none';

                    secObj.menuSwitcher.style.cursor = 'pointer';
                }
                else if(offsetRate > 0.1 && offsetRate < 0.3) {
                    opInVal = calcValue(sectionSet[currentSection].values.part1_op_in)
                    secObj.titleSson.style.opacity = `${opInVal}`
                    secObj.history1.style.opacity = `${opInVal}`
                }
                else if(offsetRate > 0.33 && offsetRate < 0.35){
                    opoutVal = calcValue(sectionSet[currentSection].values.titleSson_op_out)
                    secObj.titleSson.style.opacity = `${opoutVal}`
                }
                else if(offsetRate > 0.35 && offsetRate < 0.37){
                    opoutVal = calcValue(sectionSet[currentSection].values.history1_op_out)
                    secObj.history1.style.opacity = `${opoutVal}`
                }
                else if(offsetRate > 0.4 && offsetRate < 0.6){
                    secObj.history1.style.opacity = `${0}`
                    secObj.titleSson.style.opacity = `${0}`
                    opInVal = calcValue(sectionSet[currentSection].values.music_op_in)
                    secObj.music.style.opacity = `${opInVal}` 
                }
                else if(offsetRate > 0.67 && offsetRate < 0.73){
                    opoutVal = calcValue(sectionSet[currentSection].values.music_op_out)
                    secObj.music.style.opacity = `${opoutVal}` 
                }
                else if(offsetRate > 0.73 && offsetRate < 0.9){
                    secObj.titleSson.style.opacity = `${0}`
                    secObj.history1.style.opacity = `${0}`

                    opInVal = calcValue(sectionSet[currentSection].values.titleSson2_op_in)
                    secObj.history2.style.opacity = `${opInVal}` 
                    secObj.titleSson2.style.opacity = `${opInVal}`
                }
            break;

            case 1 : 
                console.log('case1')
                sectionSet[currentSection - 1].objs.menuSwitcher.style.cursor = 'pointer';
                sectionSet[currentSection - 1].objs.switcher.style.display = 'flex';
                sectionSet[currentSection - 1].objs.switcher.style.opacity = `${1}`;
                if(offsetRate > 0 && offsetRate < 0.04) {
                    opOutval = calcValue(sectionSet[currentSection].values.titleSson2_op_out)
                    secObj.titleSson2.style.opacity = `${opOutval}`
                }
                else if(offsetRate > 0.04 && offsetRate < 0.07) {
                    secObj.titleSson2.style.opacity = `${0}`

                    opOutval = calcValue(sectionSet[currentSection].values.history2_op_out)
                    secObj.history2.style.opacity = `${opOutval}`
                }
                else if(offsetRate > 0.1 && offsetRate < 0.2) {
                    secObj.titleSson2.style.opacity = `${0}`
                    secObj.history2.style.opacity = `${0}`
                }
                else if(offsetRate > 0.5 && offsetRate < 0.59) {
                    opoutVal = calcValue(sectionSet[currentSection].values.armyImg_op_out)
                    secObj.armyImg.style.opacity = `${opoutVal}`
                }
                else if(offsetRate > 0.63 && offsetRate < 0.7) {
                    opInVal = calcValue(sectionSet[currentSection].values.titleSson3_op_int)
                    secObj.titleSson3.style.opacity = `${opInVal}`
                    secObj.history3.style.opacity = `${opInVal}`
                }
            break;

            case 2 : 
                console.log('case2')
                sectionSet[currentSection - 2].objs.menuSwitcher.style.cursor = 'pointer';
                sectionSet[currentSection - 2].objs.switcher.style.display = 'flex';
                sectionSet[currentSection - 2].objs.switcher.style.opacity = `${1}`;

                if(offsetRate > 0 && offsetRate < 0.05) {
                    opoutVal = calcValue(sectionSet[currentSection].values.titleSson3_op_out)
                    secObj.titleSson3.style.opacity = `${opoutVal}`
                    secObj.history3.style.opacity = `${opoutVal}`
                }
                else if(offsetRate > 0.05 && offsetRate < 0.06) {
                    secObj.titleSson3.style.opacity = `${0}`
                    secObj.history3.style.opacity = `${0}`
                }
            break;
        }
    }


    //---------------------------------------------------------------------
    //최초 로딩시 발생하는 이벤트
    //인터벌
    //opacity, translate Value
    //bRunFlag

    const animi = function() {
        console.log('WINDOW Loading EVENT START')

        if (opctValue < 0.93){
            opctValue += 0.008;
            tslXValue -= 2.5;

            sectionSet[0].objs.mainTitle.style.transform = `translateX(${tslXValue}px)`
            sectionSet[0].objs.mainTitle.style.opacity = `${opctValue}`;
            sectionSet[0].objs.mainTitle2.style.transform = `translateX(${tslXValue}px)`
            sectionSet[0].objs.mainTitle2.style.opacity = `${opctValue}`;
            // sectionSet[0].objs.seriseVdieoA.style.transform = `translateY(${tslYValue}px)`
        }
        else if (opctValue >= 0.93){
            console.log('WINDOW Loading EVENT END')
            opctValue = 1;
            clearInterval(intv);

            sectionSet[0].objs.mainTitle.style.transform = `translateX(${0}px)`
            sectionSet[0].objs.mainTitle.style.opacity = `${opctValue}`;
            sectionSet[0].objs.mainTitle2.style.transform = `translateX(${0}px)`
            sectionSet[0].objs.mainTitle2.style.opacity = `${opctValue}`;
            // sectionSet[0].objs.seriseVdieoA.style.transform = `translateY(${tslYValue}px)`

            return
        }
        // console.log('opctValue = ' + opctValue)
        // console.log('tslYValue = ' + tslYValue)
    }
    // END
    //---------------------------------------------------------------------

//-------------------------------------------------------------------------
// 이벤트 핸들러
//-------------------------------------------------------------------------

window.addEventListener('scroll', ()=>{      
    console.log('window.scrollY = ' + window.scrollY)
    // 스크롤 값
    // 현재 센셕
    // 이전 섹션의 높이
    // 현재 섹션내에서 스크롤 값          
    yOffset             = window.scrollY;
    currentSection      = getCurrentSection();
    PrevSectionHeight   = getPrevSectionHeight();
    sectionYOffset      = yOffset - PrevSectionHeight;

    scrollLoop();
});



window.addEventListener('load', () => {
    intv = setInterval(animi, 10)
})
    

//-------------------------------------------------------------------------
// 함수 호출
//-------------------------------------------------------------------------
    initHTMLPage();

})();