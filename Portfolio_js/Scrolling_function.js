import {modifyElementState, scrollToSection, returnRevealEffect, plainReveal} from "./module.js";

let introduction = document.getElementById(`introducion`);
let skill = document.getElementById(`skill`);
let experience = document.getElementById(`experience`);
let project = document.getElementById(`project`);
let contact = document.getElementById(`contact`);
const section_store = [introduction, skill, experience, project, contact];
const section_id = [`introducion`, `skill`, `experience`, `project`, `contact`]
const section_store_state = { introducion: 0, skill: 0, experience: 0, project: 0, contact: 0};
const target_state = {introducion: false, skill: false, experience: false, project: false, contact: false}
let main_body = document.getElementsByTagName(`body`)[0];
const paraSet = [section_store, section_store_state, target_state, main_body, section_id];
//------------------------------------------------------//
//Stuff to do after DOMContentLoadeding the web page
let Svg = document.getElementById(`svg`);
let Skill = document.getElementById(`Skill`);
let Experience = document.getElementById(`Experience`);
let project1 = document.getElementById(`Project1`);
let Contact = document.getElementById(`Contact`);
let Resume = document.getElementById(`resume`);
const nav_list = [Svg, Skill, Experience, project1, Contact, Resume]; 
let list_button = document.getElementById("list-button");
let social_media = document.getElementById("social-media");

for(let nav_li of nav_list){
    nav_li.classList.add(`nav-list-beforeAnime`)
}
if(window.innerWidth < 800) list_button.classList.add(`nav-list-beforeAnime`);

let list_box = document.getElementById("list-box");
let rotated_cross = document.getElementById("rotated-cross");
let main22 = document.getElementById(`content`);
let aside_bar = document.getElementById("aside-bar");
let html = document.getElementsByTagName(`html`)[0];

click_list_button_effect(list_box, rotated_cross, aside_bar);
list_button.classList.add("list-button-noborder");

function click_list_button_effect(list_box, rotated_cross, aside_bar){
    list_box.classList.add(`list-box-origin`);
    rotated_cross.classList.add(`rotated-cross-origin`);
    aside_bar.classList.add(`aside-bar-origin`);
}

//to-do stuff 1. Reveal anime of the nav_bar li 
nav_list.forEach((ele) => {
    setTimeout(() => {
        ele.classList.replace(`nav-list-beforeAnime`, `nav-list-anime`);
        list_button.classList.contains(`nav-list-beforeAnime`)? list_button.classList.replace(`nav-list-beforeAnime`, `nav-list-anime`): null;
    }, 150*(nav_list.indexOf(ele)))
})
//to-so stuff 2. set the first round of Scroll().reveal()
social_media.classList.add(`social-media-beforeAnimation`);
setTimeout(() => {social_media.classList.replace(`social-media-beforeAnimation`, `social-media-afterAnimation`)}, 1000)

window.addEventListener(`load`, ()=>{
$(document).ready(function() {
    let includedContent3 = document.getElementById(`project`);
    let Project_files_container2 =  document.getElementById(`Project-files-container`);
    let Project_files_parents2 = Project_files_container2.children;
    
    //Skill elements reveal independently
    let skill_title = document.getElementById(`skill-title`);
    let skill_intro = document.getElementById(`skill-intro`);
    let fig = document.getElementById(`fig`);
    let skill_list = [];

    skill_list.push(skill_title);
    skill_list.push(skill_intro);
    skill_list.push(fig);
    section_store_state[`skill`] = new Array(skill_list.length).fill(0);
    target_state[`skill`] = new Array(skill_list.length).fill(false);
    //Skill elements reveal independently*/

    // Experience elements reveal independently 
    let experience_title = document.getElementById(`experience-title`);
    let workplace2 = document.getElementById(`workplace`);
    let workplace_details_box2 = document.getElementById(`workplace-details-box`);
    let experience_list = [];

    experience_list.push(experience_title);
    experience_list.push(workplace2);
    experience_list.push(workplace_details_box2);
    section_store_state[`experience`] = new Array(skill_list.length).fill(0);
    target_state[`experience`] = new Array(skill_list.length).fill(false);
    // Experience elements reveal independently 
    
    //  elements reveal independently 
    let Rroject_title = document.getElementById(`Rroject-title`);
    let Projects = document.getElementsByClassName(`Project-box`);
    let Project_files = document.getElementsByClassName(`Project-files-Parents`);
    let Noteworthy_title = document.getElementById(`Noteworthy_title`);
    let view_achieve = document.getElementById(`view-achieve`);
    let show_hidden = document.getElementById(`show-hidden`);
    let Projects_list = [];

    Projects_list.push(Rroject_title);
    Projects_list.push(...Projects)
    Projects_list.push(Noteworthy_title);
    Projects_list.push(view_achieve);
    Projects_list.push(...Project_files);
    Projects_list.push(show_hidden);
    section_store_state[`project`] = new Array(Projects_list.length).fill(0);
    target_state[`project`] = new Array(Projects_list.length).fill(false);
    //  elements reveal independently 
    //Reason for [] but not null: 1. null is not iterable 2. Maybe change to array in the future
    let arraySectionList = [[], skill_list, experience_list, Projects_list, []]; 

    let pageState = {
        navNotClicked: true,
        firstScroll: true,
        interruptTargetOutOfScope: null,
        clickTime: 1,
        files_inline: null
    };
    let count = [0, 0, 0, 0, 0];

    pageState[`files_inline`] = calFilesInLine(includedContent3, Project_files_parents2);
    window.addEventListener(`resize`, () => {
        pageState[`files_inline`] = calFilesInLine(includedContent3, Project_files_parents2);
    })
    
    setTimeout(() => {
        introductionReveal();
        section_store.forEach((section) => {
            let sec_idx = section_store.indexOf(section);
            let sec_state = section_store_state[section.id];
            if(Array.isArray(sec_state)){
                arraySectionList[sec_idx].forEach((ele) => {
                    ScrollReveal().reveal(`#${ele.id}`, returnRevealEffect(sec_idx, sec_state.length - 1,  arraySectionList[sec_idx].indexOf(ele), pageState[`files_inline`]))
                })
            }
        })
        ScrollReveal().reveal(`#contact`, {distance: `150px`, distance: `50px`, origin: `bottom`, duration: 1000});
    }, 1450)
   
    //shouls decalre after DOMContentLoaded > some elements are inserted asynchronously
    let currentPosition = window.pageYOffset;
    switch(returnSecNo(currentPosition, section_store)){        
        case 1:
        //window.scrollTop < target.offsetTop but reveal both target and previous area 
        if(currentPosition + window.innerWidth/2 > skill.offsetTop){
            modifyElementState(`skill`, ...paraSet, skill_list);
        }
        //window.scrollTop > target.offsetTop 
        modifyElementState(`introducion`, ...paraSet);
        break;
    case 2:
        if(currentPosition + window.innerWidth/2 > experience.offsetTop){
            modifyElementState(`experience`, ...paraSet, experience_list);
        }
        modifyElementState(`skill`, ...paraSet, skill_list);
        break;
    case 3:
        if(currentPosition + window.innerWidth/2 > Project.offsetTop){
            modifyElementState(`project`, ...paraSet, Projects_list);
        }
        modifyElementState(`experience`, ...paraSet, experience_list);
        break;
    case 4:
        if(currentPosition + window.innerWidth/2 > contact.offsetTop){
            modifyElementState(`contact`, ...paraSet);
        }
        modifyElementState(`project`, ...paraSet, Projects_list);
        break;
    case 5:
        modifyElementState(`contact`, ...paraSet);
        break;
    }
    //3. Change the status (0 to 2) of revealed area in the first round (!!disposable function!!)
    //packed reveal function

//function for determine which section/s is staying in 
function returnSecNo(currentPosition, section_store){
    if(currentPosition < section_store[0].offsetHeight){
        return 1
    }
    if(currentPosition > section_store[1].offsetTop && currentPosition < section_store[2].offsetTop){
        return 2
    }
    if(currentPosition > section_store[2].offsetTop && currentPosition < section_store[3].offsetTop){
        return 3
    }
    if(currentPosition > section_store[3].offsetTop && currentPosition < section_store[4].offsetTop){
        return 4
    }
    if(currentPosition > section_store[4].offsetTop){
        return 5
    }
}

function introductionReveal(){
    ScrollReveal().reveal('#self', { delay: 500, duration: 1500, distance: `35px`, origin: `left`});
    ScrollReveal().reveal('#name', {  delay: 500, duration: 2000, distance: `35px`, origin: `left` });
    ScrollReveal().reveal('#brief', {  delay: 500, duration: 2000, distance: `35px`, origin: `left`});
    ScrollReveal().reveal('#self-intro', {  delay: 500, dduration: 2000, origin: `left` , distance: `150px`});
    ScrollReveal().reveal('#touch', {  delay: 500, opacity: 0, duration: 1500 });
}

/* functions for operation after DOMContentLoadeding page */
//------------------------------------------------------//

//------------------------------------------------------//
/* scroll event finishes with only one tool */
document.addEventListener(`scroll`, () => { 
    //case: wheel/touchmove scroll event without intersect with click event > change status of all revealed elements
    if(pageState[`navNotClicked`] == true){ //without intersect with click event - declared by navNotClicked
        scrollWithoutClickingNav(window.scrollY, section_store);
    }
})


// change the status in the case of scrolling without clicking nav_list // 
function scrollWithoutClickingNav(currentPosition, section_store){
    let b = window.innerHeight;
    if(count[0] == 0 && currentPosition <= section_store[0].offsetHeight){
        modifyElementState(`introducion`, ...paraSet);
        count[0] = 1;
        return
    }
    if((count[1] == 0 && currentPosition + b >= section_store[1].offsetTop) && (currentPosition + b <= section_store[2].offsetTop)){
        modifyElementState(`skill`, ...paraSet, skill_list);
        if((section_store_state[`skill`]).every( (val, i, arr) => val === 2 )){
            count[3] = 1;
            return
        } 
    }
    if((count[2] == 0 && currentPosition + b >= section_store[2].offsetTop) && (currentPosition + b <= section_store[3].offsetTop)){
        modifyElementState(`experience`, ...paraSet, experience_list);
        if((section_store_state[`experience`]).every( (val, i, arr) => val === 2 )){
            count[2] = 1;
            return
        } 
    }
    //!!
    if((count[3] == 0 && currentPosition + b >= section_store[3].offsetTop) && (currentPosition + b <= section_store[4].offsetTop)){
        modifyElementState(`project`, ...paraSet, Projects_list);
        if((section_store_state[`project`]).every( (val, i, arr) => val === 2 )){
            count[3] = 1;
            return
        }
        
    }
    if((count[4] == 0 && currentPosition + b >= section_store[4].offsetTop)){
        count[4] = 1;
        modifyElementState(`contact`, ...paraSet);
        return
    }
}

//------------------------------------------------------//
let navList = document.getElementById(`nav_list`);
let arrow = document.getElementById("arrow");

//click event to trigegr scroll event 
navList.addEventListener(`click`, (event) => {
    if((event.target.tagName == `LI` || event.target.parentNode.tagName == `LI`)){
        let target = document.getElementById(event.target.textContent);

        if(window.scrollY > target.offsetTop + 1 && window.scrollY < target.nextElementSibling.offsetTop - 1 && pageState[`clickTime`] != 2){
            return
        } else { 
            setTimeout(() => {
                scrollToSection(pageState, event.target, ...paraSet, arraySectionList, navList)
            }, 50)
        }
    }
})

/* Responsive part */
/*
Responsive aside bar
situation that the responsive bar take place 
 - innerwidth < 800 + click - only triggered by one way
situation that the responsive bar hid
 case 1. innerwidth > 800
 case 2. list-btn is clicked
 case 3. the content body is clicked
 */

// 1 + 2
let main2 =  document.getElementById("content");

main2.addEventListener("pointerdown", ()=>{
    list_button.classList.replace("list-button-border", "list-button-noborder");
})

//list-button when click
/*
1. modify list-box
2. modify rotated-cross
3. modify ul-list + content + scrollbar 
*/
list_button.addEventListener("pointerdown", (e)=>{
    list_button.classList.replace("list-button-noborder", "list-button-border");
    
    if(getStyle(list_box, "transform") == "matrix(1, 0, 0, 1, 0, 0)"){
        list_box.classList.replace(`list-box-origin`, `list-box-beforeModification`);
        rotated_cross.classList.replace(`rotated-cross-origin`, `rotated-cross-beforeModification`);
        aside_bar.classList.replace(`aside-bar-origin`, `aside-bar-beforeModification`);
        html.classList.add(`body-hideScrollbar`);
        main22.classList.add(`main-filter`);
    }
    else{
        //case 2
        click_cross(list_box, rotated_cross, aside_bar, html, main22);
        setTimeout(() => {list_box.classList.replace(`list-box-afterModification`, `list-box-origin`);}, 100)
    }

    // case 1 > only clicked + resize(>800) triggers case 1
    window.addEventListener("resize", ()=>{
        if(window.innerWidth == 800){
        // Remove all css click effect class
        list_box.classList.remove(`list-box-beforeModification`, `list-box-origin`);
        rotated_cross.classList.remove(`rotated-cross-beforeModification`, `rotated-cross-origin`);
        aside_bar.classList.remove(`aside-bar-beforeModification`, `aside-bar-origin`);
        html.classList.remove(`body-hideScrollbar`);
        main22.classList.remove(`main-filter`);
        // Reset the css to the origin
        click_list_button_effect(list_box, rotated_cross, aside_bar);
        list_button.classList.replace("list-button-border", "list-button-noborder");
        }
    })

})

//When the aside-bar is clicked 
//When the <a> element is clicked > scroll to the corresponding section

aside_bar.addEventListener("pointerdown", (e)=>{
    click_cross(list_box, rotated_cross, aside_bar, html, main22)
    setTimeout(() => {list_box.classList.replace(`list-box-afterModification`, `list-box-origin`)}, 100)

    list_button.classList.replace("list-button-border", "list-button-noborder");
    
    if(e.target.tagName == `A` || e.target.parentNode.tagName == `A`){
        setTimeout(() => {
            scrollToSection(pageState, e.target, ...paraSet, arraySectionList, navList);
        }, 100);
    }
})

function click_cross(list_box, rotated_cross, aside_bar, html, main22){
    list_box.classList.replace(`list-box-beforeModification`, `list-box-afterModification`);
    rotated_cross.classList.replace(`rotated-cross-beforeModification`, `rotated-cross-origin`);
    aside_bar.classList.replace(`aside-bar-beforeModification`, `aside-bar-origin`);
    html.classList.remove(`body-hideScrollbar`);
    main22.classList.remove(`main-filter`);
}

// ------------------- click Arrow and scroll ------------------------------------- //
let distance = 0;
let target = 0;
let step = 0;

arrow.addEventListener("pointerdown", ()=>{
    let animation = setInterval(function(){
        distance = scroll().top;
        let isFirefox2 = typeof InstallTrigger !== 'undefined';
        step = (target - distance)/(isFirefox2? 10: 25);
        distance += step;
        scrollTo(0, distance);

        if(Math.ceil(target - distance) == -0){
            clearInterval(animation);
        }
        window.addEventListener("wheel", ()=>{
            clearInterval(animation);
        })
        window.addEventListener("touchmove", ()=>{
            clearInterval(animation);
        })
    }, 0)
})
})
})
// ------------------- click Arrow and scroll ------------------------------------- //

// ---------------------- Scrolling event of workplace_bar------------------------- //
// ------------------- Responsive nav-list ------------------------------------- //
aside_bar.addEventListener(`scroll`, () => {
    nav.classList.replace(`nav-shown`, `nav-hidden`);
    if(aside_bar.scrollTop == 0){
        nav.classList.replace(`nav-hidden`, `nav-shown`);
    }
})

function calFilesInLine(includedContent3, Project_files_parents2){
    let divide3 = (Math.ceil((includedContent3.clientWidth - 80)/Project_files_parents2[0].clientWidth) == 3 || Math.floor((includedContent3.clientWidth - 80)/Project_files_parents2[0].clientWidth) == 3);
    let divide2 = (Math.ceil((includedContent3.clientWidth - 80)/Project_files_parents2[0].clientWidth) == 2 || Math.floor((includedContent3.clientWidth - 80)/Project_files_parents2[0].clientWidth) == 2);
    return divide3 == true? 3: divide2 == true? 2: 1;
}
