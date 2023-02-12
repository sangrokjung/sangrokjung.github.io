document.addEventListener('DOMContentLoaded', () => {
    const upBtnTag = document.querySelector('.up_icon')
    const link = "/Users/snagrockjung/Documents/VSC/PROJECT_PROFILE/ResumePage/Resume_index.html"

    upBtnTag.addEventListener('click', (event)=>{
        window.screenY('0')
    })
})