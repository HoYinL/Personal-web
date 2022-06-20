function getStyle(ele, attr) {
    if (window.getComputedStyle) {
        return window.getComputedStyle(ele).getPropertyValue(attr);
    }
    return ele.currentStyle[attr];
  }

function scroll(){
    return{
        top: window.pageYOffset || document.body.scrollTop,
        right: window.pageXOffset || document.body.scrollLeft}
    }
//-----------------------------------------------------------------------------------------//

let bodies = document.getElementsByTagName(`body`)[0];

let anime_interface = document.createElement(`div`);
let loading_anime = document.createElement('div');
let loading_svg = document.createElementNS("http://www.w3.org/2000/svg", `svg`);
loading_svg.setAttributeNS(null, `height`, `150`)
loading_svg.setAttributeNS(null, `width`, `150`)
loading_svg.setAttributeNS(null, `verison`, `1.1`)
loading_svg.setAttributeNS(null, `position`, `relative`)
let loading_path = document.createElementNS("http://www.w3.org/2000/svg", `path`);
loading_path.setAttributeNS(null, `d`, `M 5 40 L 25 40 L 55 120 L 75 60 L 95 120 L 125 40 L 145 40`);
loading_path.classList.add(`loading-path`);
loading_svg.appendChild(loading_path);

anime_interface.classList.add(`loading-interface`);
loading_anime.classList.add(`loading-anime`);
bodies.prepend(anime_interface);
loading_anime.appendChild(loading_svg);
anime_interface.appendChild(loading_anime);

let svg = document.getElementById(`svg`);

svg.addEventListener(`pointerdown`, () => {
    document.location.reload(true);
})

let scrollDefault = 0;
document.addEventListener(`readystatechange`, () => {
    setTimeout(() => {
        anime_interface.remove();
    }, 500)
})
//-----------------------------------------------------------------------------------------//
/*
result: 1. click -> 2. scroll to specific section
*/
//-----------------------------------------------------------------------------------------//
// scrolling navigation bar //
let nav = document.getElementById("nav");
let a = 0;

let scrolling = function(nav, currentTop){
    if (currentTop - scroll().top < 0){
        nav.classList.contains(`nav-shown`)? nav.classList.replace(`nav-shown`, `nav-hidden`): null;
    } else{
        nav.classList.contains(`nav-hidden`)? nav.classList.replace(`nav-hidden`, `nav-shown`): null;
    }
    return scroll().top
}

nav.classList.add(`nav-shown`)
let time = 0;
window.addEventListener("scroll", () => {
    if(time > 2){ // for playing safe
        a = scrolling(nav, a);
    }
    setTimeout(() => {
        if(window.scrollY == 0){
            nav.classList.contains(`nav-hidden`)? nav.classList.replace(`nav-hidden`, `nav-shown`): null;
        }
    }, 0)
    time++
});
//---------------------- workplace list and workplace content -------------------//
let main = document.getElementById("content");

window.addEventListener("load", ()=>{
    let workplace = document.getElementById("workplace");
    let workplace_li = workplace.querySelectorAll(`li`);
    
$(document).ready(function() {
let experience_sec = document.getElementById("experience")
let includedContent = document.getElementById(`includedContent`);
let workplace_light = document.getElementById(`workplace-light`);
let workplace_details = document.getElementsByClassName("workplace-details");

let target_height = 0;
    for(let a = 0; a < workplace_details.length; a++){
        if(workplace_details[a].clientHeight > target_height){
            target_height = workplace_details[a].clientHeight;
        }
    }
includedContent.style.height = `${target_height}px`

// Section 1: nav-list part and operation
workplace_li[0].classList.add("workplace-list-click");
// operation to nav-list 
let currentEventTarget = null;
experience_sec.addEventListener("click", (event) => {
    //change the interface of nav-list 
    if((event.target.tagName == `LI`|| event.target.parentNode.tagName == `LI`)){
        for(let li of workplace_li){
            if(li.classList.contains("workplace-list-click")){
                li.classList.remove("workplace-list-click");
                break;
            }
        }

        //change the shown workPage
        let targetPage = document.querySelector(`[data-company = ${event.target.textContent}]`);
        if(currentEventTarget != event.target){
        new Promise((resolve) => {
            for(let workplace_details_page of workplace_details){
                workplace_details_page.classList.replace(`show-workplace-details`, `hide-workplace-details`)
            }
            targetPage.classList.replace(`hide-workplace-details`, `show-workplace-details`)
                setTimeout(resolve, 200);
            }).then(() => {
                event.target.classList.add("workplace-list-click");
                workplace_light_move(workplace_light, event.target);
            })
            //change the opacity with delay effect 
        }
        else return
    }

    //Case of the window be resized after clicks the nav list
    window.addEventListener(`resize`, () => {
        workplace_light.style.transition = "all 0s";

            if(window.innerWidth > 800){ 
                workplace_light.style.left = `${0}px`
                workplace_light.style.top = `${event.target.offsetTop}px`;
            } else {
                workplace_light.style.left = `${event.target.offsetLeft}px`;
                workplace_light.style.top = "auto";
            }
        }
    )

    //for determining whether clicking the clicked target 
    currentEventTarget = event.target;
})

let workplace_bar = document.getElementById(`workplace`);
let move = null;
let currentPosition = null;

workplace_bar.addEventListener(`pointerdown`, (e) => {
    move = true; 
    currentPosition = e.clientX;
})
workplace_bar.addEventListener(`pointermove`, (e) => {
    if(move == true){
        if(e.clientX > currentEventTarget){
            workplace_bar.scrollBy(-10, 0)
            currentEventTarget = e.clientX;
        } else {
            workplace_bar.scrollBy(10, 0)
            currentEventTarget = e.clientX;
        }
    }
})
workplace_bar.addEventListener(`pointerup`, (e) => {
    move = false; 
})
workplace_bar.addEventListener(`pointerleave`, (e) => {
    move = false; 
})

// Section 2: work detail corresponding to each nav list element 
for(let workplace_details_page of workplace_details){
    workplace_details_page.classList.add(`hide-workplace-details`);
}

if(workplace_details[0] == undefined){
    location.reload();
}
workplace_details[0].classList.replace(`hide-workplace-details`, `show-workplace-details`);
// click the content and show the border
main.addEventListener("pointerdown", (event)=>{
    let container = event.target.closest(`.workplace-details`);
    
    if(container)
        container.classList.contains("workplace-details-click-border") ? 
            container.classList.remove("workplace-details-click-border"):container.classList.add("workplace-details-click-border");
    else{
        for(let workplacePage of workplace_details){
            if (getStyle(workplacePage, `z-index`) == 1){
                workplacePage.classList.remove("workplace-details-click-border");
                return
            }
        }
    }
})

//functions 
function workplace_light_move(changeTarget, target){
    changeTarget.style.transition = "all 0.5s";
    window.innerWidth > 800 ? changeTarget.style.top = target.offsetTop + "px" : changeTarget.style.left = target.offsetLeft + "px";
}
})})
//----------------------- workplace list and workplace content -------------------//

//-------------------- javascript for -conatiner ---------------------------//
//-conatiner (Section 1)\
window.addEventListener("load", ()=>{
$(document).ready(function() {
    let arr = [
        'https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dmlld3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80',
        //'../Portfolio_image/spotify-2.jpg',
        'https://bnextmedia.s3.hicloud.net.tw/image/album/2019-07/img-1563419830-89111@900.png',
        './2021-09-01.png.jpg',
    ]
        
    let box = document.getElementsByClassName("Project-box");
    let Project_box = document.getElementById("project");
    
    for(let element of box){
        //element.classList.add(`-box-height`);
        let currentPageIndex = Array.from(box).indexOf(element);
        //1. change the even no. figure
        element.dataset.project == "even" ? element.classList.add("Project-box-even"): null;
    
        //2. insert the image to the page
        let img = new Image();
        img.src = arr[currentPageIndex]; 
        Project_box.getElementsByTagName('figure')[currentPageIndex].appendChild(img);
    }
})
})
//-conatiner (Section 2)
window.addEventListener("load", ()=>{
$(document).ready(function() {
    setTimeout(()=>{
         let Project_files_cover = document.getElementsByClassName("Project-files-Parents");
         let Project_container = document.getElementById("Project-files-container"); 
         let Project_files_h4 = Project_container.getElementsByTagName("h4");
         let Show_hidden = document.getElementById("show-hidden");
       
        // Sets the general interface of the section
        // Shows first 6 files and hidden all the followinf files (by default)
        for(let ele of Project_files_cover){
            let currentFileIndex = Array.from(Project_files_cover).indexOf(ele);

            if(currentFileIndex > 5){
                Project_files_cover[currentFileIndex].classList.add("Project-files-displayNone");
                setTimeout(() => {
                    Project_files_cover[currentFileIndex].classList.replace("Project-files-displayNone", "Project-files-absolute");          
                    Project_files_cover[currentFileIndex].classList.add("Project-files-opacity"); 
                    Project_files_cover[currentFileIndex].classList.add("Project-files-transform"); 
                }, 0) 
            }
            Project_files_h4[currentFileIndex].classList.add("Project-files-h4-color"); 
            Project_files_h4[currentFileIndex].classList.add("Project-border");
        }   

        // Edits the File interface if clicks it
        Project_container.addEventListener("pointerdown", (e)=>{
            remove_classes();

            let target = e.target.closest(".Project-files");
            let target_h4 = target.getElementsByTagName("h4")[0];

            target.parentNode.classList.add("Project-files-up");
            target_h4.classList.replace("Project-files-h4-color", "Project-files-h4-color-clicked");
            target_h4.classList.replace("Project-border","Project-files-border-trigg");
        });
         // Removes all edited element if clicks the window
         main.addEventListener(`pointerdown`, (e) => {
            if(e.target.contains(Project_container))
                remove_classes();
        })

        //shows the hidden files if clicks the `Show More` button
        let Project_files_length =  Project_files_cover.length;
        let clickEvent = null;

        Show_hidden.addEventListener(`pointerdown`, () => {
            ++clickEvent;
            for(let a = 6; a < Project_files_length; a++){
                switch(clickEvent % 2){
                    //click even time == click `show less` button
                    case 0:
                        remove_addedClass(a)
                        Project_files_cover[a].classList.replace("Project-files-opacity-change", "Project-files-opacity");
                        Project_files_cover[a].classList.replace("Project-files-relative", "Project-files-absolute");
                        Show_hidden.innerHTML = "Show More";     
                        break;
                    //click odd time == click `show more` button
                    case 1:
                        Show_hidden.innerHTML = "Show Less"; 
                        Project_files_cover[a].classList.replace("Project-files-transform", "after-showing-all-files");
                        Project_files_cover[a].classList.replace("Project-files-absolute", "Project-files-relative");
                        setTimeout(()=>{
                            Project_files_cover[a].classList.replace("Project-files-opacity", "Project-files-opacity-change");
                            //change transform2 to transform after the file was shown
                            setTimeout(()=>{
                                Project_files_cover[a].classList.replace("after-showing-all-files", "Project-files-transform");
                            }, 150*(a - 5));
                        }, 150*(a - 6));
                        break;
                }
            }
        })

        //removes edited files function;
        function remove_classes(){
            for(let page of Project_files_cover){
                let currentFileIndex = Array.from(Project_files_cover).indexOf(page);
                remove_addedClass(currentFileIndex);
            }
        }

        function remove_addedClass(ele){
                Project_files_cover[ele].classList.remove("Project-files-up");
                Project_files_h4[ele].classList.replace("Project-files-h4-color-clicked", "Project-files-h4-color");
                Project_files_h4[ele].classList.replace("Project-files-border-trigg", "Project-border");
        }
    })
})})
//-------------------- javascript for -conatiner ---------------------------//

//-------------------- footer ---------------------------//
let info_block = document.getElementById("info-block");
info_block.classList.add(`div-bordercolor0`);;
info_block.classList.add(`div-color0`);
//Edits/removes the css when click/click out of the footer
document.body.addEventListener("pointerdown", (event)=>{
    if(info_block.contains(event.target)){
        info_block.classList.replace(`div-bordercolor0`, `div-bordercolor1`)
        info_block.classList.replace(`div-color0`, `div-color1`);
    }
    else{
        info_block.classList.replace(`div-bordercolor1`, `div-bordercolor0`);
        info_block.classList.replace(`div-color1`, `div-color0`);
    }
});
//-------------------- footer ---------------------------//

// ------------------- Responsive nav-list ------------------------------------- //

//------------------------------------------------------------------------------ //
window.addEventListener("onload", ()=>{
    setTimeout(()=>{
        var img = document.createElement('img'); 
        img.src = 'https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dmlld3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80'; 
        document.getElementById('body').appendChild(img);
    }, 0);
})
// ------------------------ set height ----------------------------------------- //
window.addEventListener(`load`, () => {
$(document).ready(function() {
    let includedContent2 = document.getElementById(`project`);
    let Project_files_container =  document.getElementById(`Project-files-container`);
    let Project_files_parents = Project_files_container.children;

    resize_modifyProjectFiles();
    window.addEventListener(`resize`, resize_modifyProjectFiles);

    function resize_modifyProjectFiles(){
        for(let a = 0; a < Project_files_parents.length; a++){
            Project_files_parents[a].getElementsByTagName(`header`)[0].style.height = `auto`;
            Project_files_parents[a].getElementsByTagName(`p`)[0].style.height = `auto`;
        }
        let plus3 = (Math.ceil((includedContent2.clientWidth - 80)/Project_files_parents[0].clientWidth) == 3 || Math.floor((includedContent2.clientWidth - 80)/Project_files_parents[0].clientWidth) == 3);
        let plus2 = (Math.ceil((includedContent2.clientWidth - 80)/Project_files_parents[0].clientWidth) == 2 || Math.floor((includedContent2.clientWidth - 80)/Project_files_parents[0].clientWidth) == 2);
    
        for(let a = 0; a < Project_files_parents.length; plus3 == true? a += 3: plus2 == true? a += 2: a += a + Project_files_parents.length + 1){
            if(Project_files_parents[a].classList.contains(`Project-files-absolute`)){
                break;
            }
            let c_height = null;
            let d_height = null;
            c_height = Project_files_parents[a].getElementsByTagName(`h4`)[0].clientHeight;
            d_height = Project_files_parents[a].getElementsByTagName(`p`)[0].clientHeight;
            for(let b = 0; b < (plus3 == true? 3: plus2 == true? 2: 0); b++){
                if(b + 1 < (plus3 == true? 3: plus2 == true? 2: 0) && Project_files_parents[a + b + 1] != undefined){
                    if(c_height < Project_files_parents[a + b + 1].getElementsByTagName(`h4`)[0].clientHeight){
                        c_height = Project_files_parents[a + b + 1].getElementsByTagName(`h4`)[0].clientHeight;
                    }
                    if(d_height < Project_files_parents[a + b + 1].getElementsByTagName(`p`)[0].clientHeight){
                        d_height = Project_files_parents[a + b + 1].getElementsByTagName(`p`)[0].clientHeight;
                    }
                }
            }
            for(let c = 0; c < (plus3 == true? 3: plus2 == true? 2: 0); c++){
                if(Project_files_parents[a + c] == undefined){
                    break;
                }
                Project_files_parents[a + c].getElementsByTagName(`header`)[0].style.height = `${c_height + 50}px`;
                Project_files_parents[a + c].getElementsByTagName(`p`)[0].style.height = `${d_height}px`;
            }
        }
    }
})
})
