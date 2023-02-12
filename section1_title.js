
// //----------------------------------------------------------------
// //마우스 이동 이벤트 (section 1)
// //----------------------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
    const titleMsg = document.querySelector('#div_id_title')
    const imgTag = document.querySelector('#div_blog_img')

    titleMsg.addEventListener('mouseover', (event) => {
        console.log('mouseover')
        clearInterval(intFun)
        imgTag.style.display = 'flex';
        intFun = setInterval(inOpVal, 50);
    })
    
    titleMsg.addEventListener('mouseout', (event) => {
        console.log('mouseout')
        clearInterval(intFun)
        
        intFun = setInterval(outOpVal, 50);
    })

    // titleMsg.addEventListener('click', (event) => {
    //     console.log('click')
    // })

    let intFun = null
    let opVal = 0;
    const inOpVal = function (){
        opVal += 0.05

        if (opVal >= 1){
            opval = 1;
            clearInterval(intFun);
            imgTag.style.opacity = opVal;
            return
        }
        else{
            imgTag.style.opacity = opVal;
        }
    }
    
    const outOpVal = function (){
        opVal -= 0.05

        if (opVal <= 0.1){
            opval = 0;
            imgTag.style.opacity = 0;
            imgTag.style.display = 'none';
            clearInterval(intFun);
            return
        }
        else{
            imgTag.style.opacity = opVal;
        }
    }
})

