
// //----------------------------------------------------------------
// //마우스 이동 이벤트 (section 1)
// //----------------------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
    const liTag1 = document.querySelector('#id_li_1');
    const liTag2 = document.querySelector('#id_li_2');
    const liTag3 = document.querySelector('#id_li_3');
    const liTag4 = document.querySelector('#id_li_4');

    const imgTag1 = document.querySelector('#img_lotte')

    liTag1.addEventListener('mouseover', (event) => {
        console.log('mouseover')
        clearInterval(intFun)
        imgTag.style.display = 'flex';
        intFun = setInterval(inOpVal(imgTag1), 50);
    })
    
    liTag1.addEventListener('mouseout', (event) => {
        console.log('mouseout')
        clearInterval(intFun)
        
        intFun = setInterval(outOpVal(imgTag1), 50);
    })

    // titleMsg.addEventListener('click', (event) => {
    //     console.log('click')
    // })

    let intFun = null
    let opVal = 0;

    const inOpVal = function(img){
        opVal += 0.05

        if (opVal >= 1){
            opval = 1;
            clearInterval(intFun);
            img.style.opacity = opVal;
            return
        }
        else{
            img.style.opacity = opVal;
        }
    }
    
    const outOpVal = function (img){
        opVal -= 0.05

        if (opVal <= 0.1){
            opval = 0;
            img.style.opacity = 0;
            img.style.display = 'none';
            clearInterval(intFun);
            return
        }
        else{
            img.style.opacity = opVal;
        }
    }
})

