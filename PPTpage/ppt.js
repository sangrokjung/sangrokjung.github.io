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
                seriseMsg1 : document.querySelector('#id_section-0-1'),
                seriseMsg2 : document.querySelector('#id_section-0-2'),
                seriseMsg3 : document.querySelector('#id_section-0-3'),
                seriseMsg4 : document.querySelector('#id_section-0-4'),
            },
            // section에서 사용하는 값들을 저장.
            values : {
                seriseMsg1_op_out : [1, 0, {start : 0.05, end : 0.1}],
                seriseMsg2_op_out : [1, 0, {start : 0.3, end : 0.37}],
                seriseMsg3_op_out : [1, 0, {start : 0.57, end : 0.63}],
                seriseMsg4_op_out : [1, 0, {start : 0.84, end : 0.91}]

            }

        },
        
        // section-1
        {
            type : 'sticky',
            height : 0,
            multiple : 8,
            objs : {
                container : document.querySelector('#section-1'),
                seriseMsg1 : document.querySelector('#id_section-1-0'),
                seriseMsg2 : document.querySelector('#id_section-1-1'),
                seriseMsg3 : document.querySelector('#id_section-1-2'),
                seriseMsg4 : document.querySelector('#id_section-1-3'),
                seriseMsg5 : document.querySelector('#id_section-1-4'),
                seriseMsg6 : document.querySelector('#id_section-1-5'),
            },
            // section에서 사용하는 값들을 저장.
            values : {
                seriseMsg1_op_out : [1, 0, {start : 0.06, end : 0.076}],
                seriseMsg2_op_out : [1, 0, {start : 0.256, end : 0.27}],
                seriseMsg3_op_out : [1, 0, {start : 0.4, end : 0.42}],
                seriseMsg4_op_out : [1, 0, {start : 0.55, end : 0.58}],
                seriseMsg5_op_out : [1, 0, {start : 0.7, end : 0.74}],
                seriseMsg6_op_out : [1, 0, {start : 0.86, end : 0.89}],
            }
        },

        // section-2
        {
            type : 'normal',
            height : 0,
            multiple : 3,            
            objs : {
                container : document.querySelector('#section-2'),
                seriseMsg1 : document.querySelector('#id_section-2-0'),
                seriseMsg2 : document.querySelector('#id_section-2-1'),
            },
            values : {
                seriseMsg1_op_out : [1, 0, {start : 0.17, end : 0.2}],
                seriseMsg2_op_out : [1, 0, {start : 0.256, end : 0.27}],
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
                if (offsetRate >= 0.05 && offsetRate <=0.1) {
                    opoutVal = calcValue(sectionSet[currentSection].values.seriseMsg1_op_out);
                    secObj.seriseMsg1.style.opacity = `${opoutVal}`;
                }
                else if (offsetRate >= 0.1 && offsetRate <= 0.3) {
                    secObj.seriseMsg1.style.opacity = `${0}`;
                }
                else if (offsetRate >= 0.3 && offsetRate <= 0.37) {
                    opoutVal = calcValue(sectionSet[currentSection].values.seriseMsg2_op_out);
                    secObj.seriseMsg2.style.opacity = `${opoutVal}`;
                }
                else if (offsetRate >= 0.37 && offsetRate <= 0.57) {
                    secObj.seriseMsg2.style.opacity = `${0}`;
                }
                else if (offsetRate >= 0.57 && offsetRate <= 0.63) {
                    opoutVal = calcValue(sectionSet[currentSection].values.seriseMsg3_op_out);
                    secObj.seriseMsg3.style.opacity = `${opoutVal}`;
                }
                else if (offsetRate >= 0.63 && offsetRate <= 0.84) {
                    secObj.seriseMsg3.style.opacity = `${0}`;
                }
                else if (offsetRate >= 0.84 && offsetRate <= 0.91) {
                    opoutVal = calcValue(sectionSet[currentSection].values.seriseMsg4_op_out);
                    secObj.seriseMsg4.style.opacity = `${opoutVal}`;
                }
                else if (offsetRate >= 0.91 && offsetRate <= 1) {
                    secObj.seriseMsg4.style.opacity = `${0}`;
                }
            break;

            case 1 : 
                if (offsetRate >= 0.06 && offsetRate <=0.076) {
                    opoutVal = calcValue(sectionSet[currentSection].values.seriseMsg1_op_out);
                    secObj.seriseMsg1.style.opacity = `${opoutVal}`;
                }
                else if (offsetRate >= 0.076 && offsetRate <= 0.256) {
                    secObj.seriseMsg1.style.opacity = `${0}`;
                }
                else if (offsetRate >= 0.256 && offsetRate <= 0.27) {
                    opoutVal = calcValue(sectionSet[currentSection].values.seriseMsg2_op_out);
                    secObj.seriseMsg2.style.opacity = `${opoutVal}`;
                }
                else if (offsetRate >= 0.27 && offsetRate <= 0.4) {
                    secObj.seriseMsg2.style.opacity = `${0}`;
                }
                else if (offsetRate >= 0.4 && offsetRate <= 0.42) {
                    opoutVal = calcValue(sectionSet[currentSection].values.seriseMsg3_op_out);
                    sectionSet[currentSection].objs.seriseMsg3.style.opacity = `${opoutVal}`;
                }
                else if (offsetRate >= 0.42 && offsetRate <= 0.55) {
                    secObj.seriseMsg3.style.opacity = `${0}`;
                }
                else if (offsetRate >= 0.55 && offsetRate <= 0.58) {
                    opoutVal = calcValue(sectionSet[currentSection].values.seriseMsg4_op_out);
                    secObj.seriseMsg4.style.opacity = `${opoutVal}`;
                }
                else if (offsetRate >= 0.58 && offsetRate <= 0.7) {
                    secObj.seriseMsg4.style.opacity = `${0}`;
                }
                else if (offsetRate >= 0.7 && offsetRate <= 0.74) {
                    opoutVal = calcValue(sectionSet[currentSection].values.seriseMsg5_op_out);
                    secObj.seriseMsg5.style.opacity = `${opoutVal}`;
                }
                else if (offsetRate >= 0.74 && offsetRate <= 0.84) {
                    secObj.seriseMsg5.style.opacity = `${0}`;
                }
                else if (offsetRate >= 0.86 && offsetRate <= 0.89) {
                    opoutVal = calcValue(sectionSet[currentSection].values.seriseMsg6_op_out);
                    secObj.seriseMsg6.style.opacity = `${opoutVal}`;
                }
                else if (offsetRate >= 0.89 && offsetRate <= 1) {
                    secObj.seriseMsg6.style.opacity = `${0}`;
                }
            break;

            case 2 : 
                if (offsetRate >= 0.17 && offsetRate <=0.2) {
                    opoutVal = calcValue(sectionSet[currentSection].values.seriseMsg1_op_out);
                    secObj.seriseMsg1.style.opacity = `${opoutVal}`;
                }
                else if (offsetRate >= 0.2 && offsetRate <= 1) {
                    secObj.seriseMsg1.style.opacity = `${0}`;
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

            sectionSet[0].objs.seriseMsg1.style.transform = `translateX(${tslXValue}px)`
            sectionSet[0].objs.seriseMsg1.style.opacity = `${opctValue}`;

            // sectionSet[0].objs.seriseVdieoA.style.transform = `translateY(${tslYValue}px)`
        }
        else if (opctValue >= 0.93){
            console.log('WINDOW Loading EVENT END')
            opctValue = 1;
            clearInterval(intv);

            sectionSet[0].objs.seriseMsg1.style.transform = `translateX(${0}px)`
            sectionSet[0].objs.seriseMsg1.style.opacity = `${opctValue}`;

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