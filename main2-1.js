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


    const sectionSet = [
        // section-0
        {
            // type : section의 구분값 (sticky : 글자위치가 고정되어 스크롤에 반응하는 섹션)
            //                          normal : 일반적인 스크롤 섹션
            type : 'normal',

            // height : 스크롤의 높이, 초기화함수에서 화면 구성에 따라 비율로 설정됨.
            height : 0,

            // multiple : 스크롤 높이를 설정하기 위한 배수.
            multiple : 1,

            // section에서 사용하는 element들을 저장.
            objs : {
                container : document.querySelector('#section-0'),
                seriseMsgA : document.querySelector('.fadein-items0'),
                seriseVdieoA : document.querySelector('#div_id_main_vidieo'),
                serisePhotoA : document.querySelector('#id_main_phto1'),
                serisePhotoB : document.querySelector('#id_main_phto2'),
                serisePhotoC : document.querySelector('#id_main_phto3'),
                serisePhotoD : document.querySelector('#id_main_phto4'),
                
            },
            // section에서 사용하는 값들을 저장.
            values : {
                MessageA_opacity : [0, 1],

                seriseMsgA_opacityOut : [1, 0, {start : 0.4, end : 0.5}],

                serisePhotoA_opacityIn : [0, 1, {start : 0.5, end : 0.6}],
                serisePhotoA_opacityOut : [1, 0, {start : 0.6, end : 0.7}],

                serisePhotoB_opacityIn : [0, 1, {start : 0.6, end : 0.7}],
                serisePhotoB_opacityOut : [1, 0, {start : 0.7, end : 0.8}],

                serisePhotoC_opacityIn : [0, 1, {start : 0.7, end : 0.8}],
                serisePhotoC_opacityOut : [1, 0, {start : 0.8, end : 0.9}],

                serisePhotoD_opacityIn : [0, 1, {start : 0.8, end : 0.9}],
                serisePhotoD_opacityOut : [1, 0, {start : 0.9, end : 1}],
            }

        },
        
        // section-1
        {
            type : 'sticky',
            height : 0,
            multiple : 7,
            objs : {
                container : document.querySelector('#section-1'),
                seriseMsgIntro : document.querySelector('#id_title0'),
                seriseMsgA : document.querySelector('.fadein-items1'),
                seriseUlA : document.querySelector('.history'),
                seriseMsgB : document.querySelector('.fadein-items2'),
                seriseMsgC : document.querySelector('.fadein-items3'),

                seriseBlogImg : document.querySelector('#div_blog_img')
            },
            values : {
                MessageIntro_opacity_in : [0, 1, {start : 0, end : 0.05}],
                MessageIntro_opacity_out : [1, 0, {start : 0.05, end : 0.1}],

                MessageA_opacity_in : [0, 1, {start : 0.1, end : 0.25}],
                MessageA_opacity_out : [1, 0, {start : 0.25, end : 0.4}],


                MessageB_opacity_in : [0, 1, {start : 0.4, end : 0.55}],
                MessageB_opacity_out : [1, 0, {start : 0.55, end : 0.7}],
                seriseUlA_translateY_in : [0, -30, {start : 0.4, end : 0.55}],

                MessageC_opacity_in : [0, 1, {start : 0.7, end : 0.85}],
                MessageC_opacity_out : [1, 0, {start : 0.85, end : 1.0}],
            }

        },

        // section-2
        {
            type : 'normal',
            height : 0,
            multiple : 1,            
            objs : {
                container : document.querySelector('#section-2'),
                seriseMsgA : document.querySelector('#fadein-items4'),
                seriseMsgB : document.querySelector('#fadein-items5'),
            },
            values : {
                MessageA_opacity_in : [0, 1, {start : 0.05, end : 0.15}],
                MessageA_translateX : [500, 0, {start : 0.5, end : 0.59}]
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

        switch(currentSection){
            case 0 : 
                console.log('window.scrollY = ' + window.scrollY)
                if (offsetRate < 0.1) {
                    sectionSet[currentSection].objs.serisePhotoA.style.opacity = `${0}`
                    sectionSet[currentSection].objs.serisePhotoB.style.opacity = `${0}`
                    sectionSet[currentSection].objs.serisePhotoC.style.opacity = `${0}`
                    sectionSet[currentSection].objs.serisePhotoD.style.opacity = `${0}`

                    sectionSet[currentSection].objs.serisePhotoA.style.display = `${'block'}`;
                    sectionSet[currentSection].objs.serisePhotoB.style.display = `${'block'}`;
                    sectionSet[currentSection].objs.serisePhotoC.style.display = `${'block'}`;
                    sectionSet[currentSection].objs.serisePhotoD.style.display = `${'block'}`;
                }
                else if(offsetRate >= 0.3 && offsetRate <= 0.4) {
                    sectionSet[currentSection].objs.seriseMsgA.style.opacity = `${1}`
                    sectionSet[currentSection].objs.seriseVdieoA.style.opacity = `${1}`
                }
                else if(offsetRate >= 0.4 && offsetRate <= 0.5) {
                    opOutval = calcValue(sectionSet[currentSection].values.seriseMsgA_opacityOut);
                    sectionSet[currentSection].objs.seriseMsgA.style.opacity = `${opOutval}`
                    sectionSet[currentSection].objs.seriseVdieoA.style.opacity = `${opOutval}`

                    sectionSet[currentSection].objs.serisePhotoA.style.opacity = `${0}`


                }
                else if(offsetRate >= 0.5 && offsetRate <= 0.6){
                    opInVal = calcValue(sectionSet[currentSection].values.serisePhotoA_opacityIn);
                    sectionSet[currentSection].objs.serisePhotoA.style.opacity = `${opInVal}`;

                    sectionSet[currentSection].objs.serisePhotoB.style.opacity = `${0}`;
                }
                else if(offsetRate >= 0.6 && offsetRate <= 0.7){
                    opOutval = calcValue(sectionSet[currentSection].values.serisePhotoA_opacityOut);
                    sectionSet[currentSection].objs.serisePhotoA.style.opacity = `${opOutval}`;

                    opInVal = calcValue(sectionSet[currentSection].values.serisePhotoB_opacityIn);
                    sectionSet[currentSection].objs.serisePhotoB.style.opacity = `${opInVal}`;
                }
                else if(offsetRate >= 0.7 && offsetRate <= 0.8){
                    opOutval = calcValue(sectionSet[currentSection].values.serisePhotoB_opacityOut);
                    sectionSet[currentSection].objs.serisePhotoB.style.opacity = `${opOutval}`;

                    opInVal = calcValue(sectionSet[currentSection].values.serisePhotoC_opacityIn);
                    sectionSet[currentSection].objs.serisePhotoC.style.opacity = `${opInVal}`;

                    sectionSet[currentSection].objs.serisePhotoD.style.opacity = `${0}`;

                    sectionSet[currentSection].objs.serisePhotoA.style.opacity = `${0}`;
                }
                else if(offsetRate >= 0.8 && offsetRate <= 0.9){
                    opOutval = calcValue(sectionSet[currentSection].values.serisePhotoC_opacityOut);
                    sectionSet[currentSection].objs.serisePhotoC.style.opacity = `${opOutval}`;

                    opInVal = calcValue(sectionSet[currentSection].values.serisePhotoD_opacityIn);
                    sectionSet[currentSection].objs.serisePhotoD.style.opacity = `${opInVal}`;

                    sectionSet[currentSection].objs.serisePhotoB.style.opacity = `${0}`;

                }
                else if(offsetRate >= 0.9 && offsetRate <= 1){
                    opOutval = calcValue(sectionSet[currentSection].values.serisePhotoD_opacityOut);
                    sectionSet[currentSection].objs.serisePhotoD.style.opacity = `${opOutval}`;

                    sectionSet[currentSection].objs.serisePhotoC.style.opacity = `${0}`;

                    sectionSet[currentSection].objs.serisePhotoA.style.display = `${'block'}`;
                    sectionSet[currentSection].objs.serisePhotoB.style.display = `${'block'}`;
                    sectionSet[currentSection].objs.serisePhotoC.style.display = `${'block'}`;
                    sectionSet[currentSection].objs.serisePhotoD.style.display = `${'block'}`;

                    sectionSet[currentSection + 1].objs.seriseMsgIntro.style.opacity = `${opInVal}`;
                    sectionSet[currentSection + 1].objs.seriseMsgIntro.style.display = `${'none'}`;
                }

                //section1 Object diplay SET
                sectionSet[currentSection + 1].objs.seriseMsgA.style.display = `${'none'}`;
                sectionSet[currentSection + 1].objs.seriseUlA.style.display = `${'none'}`;
                sectionSet[currentSection + 1].objs.seriseMsgB.style.display = `${'none'}`;
                sectionSet[currentSection + 1].objs.seriseMsgC.style.display = `${'none'}`;

                break;

            case 1 : 
                if (offsetRate >= 0 && offsetRate <= 0.05) {
                    sectionSet[currentSection - 1].objs.serisePhotoA.style.opacity = `${0}`;
                    sectionSet[currentSection - 1].objs.serisePhotoB.style.opacity = `${0}`;
                    sectionSet[currentSection - 1].objs.serisePhotoC.style.opacity = `${0}`;
                    sectionSet[currentSection - 1].objs.serisePhotoD.style.opacity = `${0}`;
                    sectionSet[currentSection - 1].objs.serisePhotoA.style.display = `${'none'}`;
                    sectionSet[currentSection - 1].objs.serisePhotoB.style.display = `${'none'}`;
                    sectionSet[currentSection - 1].objs.serisePhotoC.style.display = `${'none'}`;
                    sectionSet[currentSection - 1].objs.serisePhotoD.style.display = `${'none'}`;


                    //opacity RESET
                    opOutval = 0;
                    sectionSet[currentSection].objs.seriseMsgA.style.opacity = `${opOutval}`;
                    sectionSet[currentSection].objs.seriseMsgB.style.opacity = `${opOutval}`;
                    sectionSet[currentSection].objs.seriseMsgC.style.opacity = `${opOutval}`;

                    sectionSet[currentSection].objs.seriseMsgIntro.style.display = `${'flex'}`;

                    opInVal = calcValue(sectionSet[currentSection].values.MessageIntro_opacity_in);
                    sectionSet[currentSection].objs.seriseMsgIntro.style.opacity = `${opInVal}`;
                }
                else if(offsetRate >= 0.05 && offsetRate <= 0.1) {
                    opOutval = calcValue(sectionSet[currentSection].values.MessageIntro_opacity_out);
                    sectionSet[currentSection].objs.seriseMsgIntro.style.opacity = `${opOutval}`;



                    sectionSet[currentSection].objs.seriseBlogImg.style.display = 'none'
                }
                else if (offsetRate >= 0.1 && offsetRate <= 0.25) {
                    sectionSet[currentSection].objs.seriseMsgIntro.style.display = 'none'
                    sectionSet[currentSection].objs.seriseUlA.style.display = 'none'
                    sectionSet[currentSection].objs.seriseMsgB.style.display = 'none'
                    sectionSet[currentSection].objs.seriseMsgC.style.display = 'none'

                    sectionSet[currentSection].objs.seriseMsgIntro.style.display = `${'none'}`;
                    sectionSet[currentSection].objs.seriseMsgIntro.style.opacity = `${0}`;
                    sectionSet[currentSection].objs.seriseMsgA.style.display = `${'block'}`;
                    opInVal = calcValue(sectionSet[currentSection].values.MessageA_opacity_in)

                    sectionSet[currentSection].objs.seriseMsgA.style.opacity = `${opInVal}`;

                }
                else if (offsetRate >= 0.25 && offsetRate <= 0.4) {
                    opOutval = calcValue(sectionSet[currentSection].values.MessageA_opacity_out)
                    sectionSet[currentSection].objs.seriseMsgA.style.opacity = `${opOutval}`;

                    sectionSet[currentSection].objs.seriseMsgB.style.opacity = `${0}`;
                    sectionSet[currentSection].objs.seriseMsgC.style.opacity = `${0}`;

                    sectionSet[currentSection].objs.seriseUlA.style.display = 'none'
                    sectionSet[currentSection].objs.seriseMsgB.style.display = 'none'
                    sectionSet[currentSection].objs.seriseMsgIntro.style.display = 'none'
                    sectionSet[currentSection].objs.seriseMsgC.style.display = 'none'
                }
                else if (offsetRate >= 0.4 && offsetRate <= 0.55) {
                    sectionSet[currentSection].objs.seriseBlogImg.style.display = 'none'

                    

                    sectionSet[currentSection].objs.seriseUlA.style.display = `${'block'}`;
                    sectionSet[currentSection].objs.seriseMsgA.style.display = `${'none'}`;
                    
                    sectionSet[currentSection].objs.seriseMsgB.style.display = `${'block'}`;

                    opInVal = calcValue(sectionSet[currentSection].values.MessageB_opacity_in)
                    sectionSet[currentSection].objs.seriseMsgB.style.opacity = `${opInVal}`;

                    sectionSet[currentSection].objs.seriseUlA.style.opacity = `${opInVal}`;

                    tsYinVal = calcValue(sectionSet[currentSection].values.seriseUlA_translateY_in)
                    sectionSet[currentSection].objs.seriseUlA.style.transform = `translateY(${tsYinVal}px)`;

                }
                else if (offsetRate >= 0.55 && offsetRate <= 0.7) {
                    opOutval = calcValue(sectionSet[currentSection].values.MessageB_opacity_out)
                    sectionSet[currentSection].objs.seriseMsgB.style.opacity = `${opOutval}`;
                    sectionSet[currentSection].objs.seriseUlA.style.opacity = `${opOutval}`;
                }
                else if (offsetRate >= 0.7 && offsetRate <= 0.85) {
                    sectionSet[currentSection].objs.seriseMsgB.style.display = `${'none'}`;
                    sectionSet[currentSection].objs.seriseMsgC.style.display = `${'block'}`;
                    sectionSet[currentSection].objs.seriseUlA.style.display = `${'none'}`;

                    opInVal = calcValue(sectionSet[currentSection].values.MessageC_opacity_in)
                    sectionSet[currentSection].objs.seriseMsgC.style.opacity = `${opInVal}`;
                }
                else if (offsetRate >= 0.85 && offsetRate <= 1) {
                    opOutval = calcValue(sectionSet[currentSection].values.MessageC_opacity_out)
                    sectionSet[currentSection].objs.seriseMsgC.style.opacity = `${opOutval}`;
                }
                else{
                }
            //1. 스크롤 값을 기반으로 opacity 범위를 계산한다.
            // opVal = calcValue(sectionSet[currentSection].values.MessageA_opacity)
            
            //2. CSS에 적용한다.
            // sectionSet[currentSection].objs.seriseMsgA.style.opacity = `${opVal}`;
            break;

            case 2 : 
                console.log('case2')
                console.log('offsetrate = ' + offsetRate)
                if (offsetRate <= 0.05) {
                    sectionSet[currentSection - 1].objs.seriseMsgA.style.display = `${'none'}`;
                    sectionSet[currentSection - 1].objs.seriseMsgB.style.display = `${'none'}`;
                    sectionSet[currentSection - 1].objs.seriseMsgC.style.display = `${'none'}`;
                    sectionSet[currentSection - 1].objs.seriseMsgIntro.style.display = `${'none'}`;

                    sectionSet[currentSection - 1].objs.seriseMsgA.style.opacity = `${0}`;
                    sectionSet[currentSection - 1].objs.seriseMsgB.style.opacity = `${0}`;
                    sectionSet[currentSection - 1].objs.seriseMsgC.style.opacity = `${0}`;
                    
                    sectionSet[currentSection].objs.seriseMsgA.style.display = `${'flex'}`;

                }
                else if (offsetRate >= 0.05 && offsetRate <= 0.15) {

                    opInVal = calcValue(sectionSet[currentSection].values.MessageA_opacity_in);
                    sectionSet[currentSection].objs.seriseMsgA.style.opacity = `${opInVal}`;
                    sectionSet[currentSection].objs.seriseMsgB.style.opacity = `${opInVal}`;
                    // tsXinVal = calcValue(sectionSet[currentSection].values.MessageA_translateX);
                    // // sectionSet[currentSection].objs.seriseMsgA.style.transform = `translateX(${tsXinVal}px)`;
                }
                else if (offsetRate > 0.15) {
                    sectionSet[currentSection].objs.seriseMsgA.style.opacity = `${1}`;
                    sectionSet[currentSection].objs.seriseMsgB.style.opacity = `${1}`;

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
            opctValue += 0.01;
            tslYValue -= 0.5;
            sectionSet[0].objs.seriseMsgA.style.opacity = `${opctValue}`;
            sectionSet[0].objs.seriseMsgA.style.transform = `translateY(${tslYValue}px)`
            sectionSet[0].objs.seriseVdieoA.style.opacity = `${opctValue}`;
            // sectionSet[0].objs.seriseVdieoA.style.transform = `translateY(${tslYValue}px)`
        }
        else if (opctValue >= 0.93){
            console.log('WINDOW Loading EVENT END')
            opctValue = 1;
            clearInterval(intv);
            sectionSet[0].objs.seriseMsgA.style.opacity = `${opctValue}`;
            sectionSet[0].objs.seriseMsgA.style.transform = `translateY(${tslYValue}px)`
            sectionSet[0].objs.seriseVdieoA.style.opacity = `${opctValue}`;
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