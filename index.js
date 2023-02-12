document.addEventListener('DOMContentLoaded', () => {
    const upBtnTag = document.querySelector('.up_icon');
    const link = "./index.html";

    const classTag1 = document.querySelector('#div_id_h1')
    const classTag2 = document.querySelector('#div_id_main_vidieo')

    upBtnTag.addEventListener('click', (event)=>{
        window.scrollTo(0,0)
        classTag1.style.opacity = 1;
        classTag2.style.opacity = 1;

    })
})