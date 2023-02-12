document.addEventListener('DOMContentLoaded', () => {

    const menuSwitcher = document.getElementById("menuSwitcher");
    const menu = document.getElementById("menu");
    const titleTag1 = document.querySelector('#id_season')
    const hitoryTag1 = document.querySelector('#id_history')

    const titleTag2 = document.querySelector('#id_season-1')
    const hitoryTag2 = document.querySelector('#id_div_his_1')

    const titleTag3 = document.querySelector('#id_season-2')
    const hitoryTag3 = document.querySelector('#id_div_his_2')

    let rotation = 0;

    let index = [0, 1, 2]
    let num = 0;
    let menuList = 0;
    menuSwitcher.addEventListener("click", () => {
        // console.log('click')
        rotation += 120;
        
        menu.style.transform = `rotate(${rotation}deg)`;


        num += 1;
        if (num > 2) {
            num = 0;
            menuList = index[num]
            console.log('menuList = ' + menuList)
            titleTag1.style.opacity = `${1}`;
            hitoryTag1.style.opacity = `${1}`;

            window.scrollTo(0, 1314)
        }
        else{
            menuList = index[num]
            console.log('menuList = ' + menuList)

            switch(menuList){
                case 1 :
                    titleTag2.style.opacity = `${1}`;
                    hitoryTag2.style.opacity = `${1}`;
                    window.scrollTo(0, 4077) 
                break;
                
                case 2 :
                    titleTag3.style.opacity = `${1}`;
                    hitoryTag3.style.opacity = `${1}`;
                    window.scrollTo(0, 6799)
                break
            }
        }
        
        // if(window.scrollY < 840) {

        //     window.scrollTo(0, 840)
        // }
        

        //돌아갈 때 마다 특정한 위도우의 위치를 알려줘야된다.
    });
})

