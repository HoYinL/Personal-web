//------------- scrollUp/Down effect when operating nav scrolling ------- //
// functiom for opertaion after interrupting the scroll event
// 90% similar to function after finishing the scroll event
/* 
1. Shows the sections that are hidden during scrolling
2. Adds new Scroll().reveal() function to sections that reveals undesirely
difference: 3. determine whether the scrolling function is interrupted after revealing target area
*/

export function modifyElementState(target, section_store, section_store_state, target_state, main_body, section_id, target_list = []){
    if(!Array.isArray(section_store_state[target])){
        section_store_state[target] = 2;
        target_state[target] = true;
    } else {
        let b = window.scrollY + window.innerHeight;
        let current_sec = section_store[section_id.indexOf(target)];
        let manuallycalOffsettop;
        let ele_offSetParent;

        // Recurse section 
        //for(let a of target_list){
        target_list.forEach((ele) => {
            // If offsetParent isn't main-body 
            manuallycalOffsettop = null;
            ele_offSetParent = ele.offsetParent;

            while(ele_offSetParent != main_body){
                manuallycalOffsettop += ele_offSetParent.offsetTop;
                ele_offSetParent = ele_offSetParent.offsetParent;
            }
            
            /* to-do stuff: Exclude the elements aren't shown in the window out */
            // Case 1: the whole section is included in the window
            if(current_sec.previousElementSibling.offsetTop > window.scrollY && current_sec.nextElementSibling.offsetTop < b){
                section_store_state[target][target_list.indexOf(ele)] = 2;
                target_state[target][target_list.indexOf(ele)] = true;
            }

            // Case 2a: elements of section that are not included in the window (upward)
            if((manuallycalOffsettop != null? manuallycalOffsettop + ele.offsetTop + ele.clientHeight: ele.offsetTop + ele.offsetHeight) < window.scrollY){
                
            }
            // Case 2b: elements of same section that are not included in the window (downward)
            else if((manuallycalOffsettop != null? manuallycalOffsettop + ele.offsetTop: ele.offsetTop) > b){
                
            } 
            //Result of exclusion: elements included in the window   
            else{
                section_store_state[target][target_list.indexOf(ele)] = 2;
                target_state[target][target_list.indexOf(ele)] = true;
            }
        })
    }
}

/* 
Scrolling event 
1. Set the reveal() function of the target section are scrolling to
2. Scrolling effect: hide all the elements other than the target
3. Scroll the page till reach the target area

Possible case 1: function finishes smoothly 
 - condition: floor / ceil(distance) == 0 / -0 > then call afterScrolling()
Possible case 2: function get interrupted 
    notInterrupted = 1 > execute the notInterrupted verison of afterScrolling()
 - case A: wheel > run the wheel / touchmove eventlistener
 - case B: click > 1. targetOfInterruption = click target
*/

export function scrollToSection(pageState, eventTarget, inscope_section_store, inscope_section_store_state, inscope_target_state, inscope_mainBody, inscope_section_id, arrayList, inscope_navList = document.getElementById(`nav_list`), nav2 = document.getElementById(`nav`)){
    pageState[`navNotClicked`] = false; // scrolling is triggered by click event

    let target = document.getElementById(eventTarget.textContent);
    let targetAsArray = arrayList[inscope_section_id.indexOf(target.id)];

    let callAfterScrolling = false; // Call afterScrolling() is true
    let notInterrupted = null; 
    let interruptTimes = null; // guarantee wheel / touchmove interruption occur once only 
    let targetOfInterruption = null;

    const inscope_paraSet = [inscope_section_store, inscope_section_store_state, inscope_target_state, inscope_mainBody, inscope_section_id]

    // to-do stuff 2. 
    inscope_section_store.forEach((section) => {
        if(inscope_section_store_state[section.id] == 0|| inscope_section_store_state[section.id] == 1){ // section isn't an array 
            section.classList.add(`opacity0`);
        } else if (section.id != eventTarget.textContent){ // section is an array 
            let arraySectionListEleChild = arrayList[inscope_section_id.indexOf(section.id)];

            arraySectionListEleChild.forEach((ele) => {
                if(inscope_section_store_state[section.id][arraySectionListEleChild.indexOf(ele)] == 0) {
                    ele.classList.add(`opacity0`);
                }
            })
        }
    })

    // to-do stuff 1. 
    if (inscope_section_store_state[target.id] == 0){ 
        inscope_section_store[inscope_section_id.indexOf(target.id)].classList.remove(`opacity0`);
        ScrollReveal().clean(`#${target.id}`);
        plainReveal(`#${target.id}`);
    }

    // to-do stuff 3. 
    let targetPosition = target.offsetTop;
    let speed = scroll().top; 
    let distance  = targetPosition - speed;
    //let distance1 = targetPosition - speed;
    let isFirefox = typeof InstallTrigger !== 'undefined';

    let scrollAnimation = setInterval(() => {
        distance = targetPosition - speed;

        speed += distance / (isFirefox? 10: 25);
        scrollTo(0, speed);

        if((distance < 0 && Math.ceil(distance) == -0) || (distance > 0 && Math.floor(distance) == 0)){
            clearInterval(scrollAnimation);  
            modifyElementState(eventTarget.textContent, ...inscope_paraSet, targetAsArray);

            notInterrupted = 0;
            callAfterScrolling = true;
        }
    }, 1)

    arrow.addEventListener(`pointerdown`, () => {
        clearInterval(scrollAnimation);
    })
    
    window.addEventListener(`wheel`, () => {
        if(callAfterScrolling == false && interruptTimes == null){
            interruptedByTools(eventTarget.textContent, pageState, scrollAnimation, ...inscope_paraSet, eventTarget, arrayList);
            interruptTimes = 1;
            pageState[`navNotClicked`] = true;
    }})
    
    window.addEventListener(`touchmove`, () => {
        if(callAfterScrolling == false && interruptTimes == null){
            interruptedByTools(eventTarget.textContent, pageState, scrollAnimation, ...inscope_paraSet, eventTarget, arrayList);
            interruptTimes = 1;
            pageState[`navNotClicked`] = true;
        }
    })

    let timer = setInterval(() => {  
        if(callAfterScrolling == true){
            // 1. reach the exact offsetTop of target (ceilied in scrollToSect())
            if (distance > 0) scrollBy(0, 1);
            // 2. reveal the nav_bar
            if (nav2.classList.contains(`nav-hidden`)) setTimeout(() => {nav2.classList.replace(`nav-hidden`, `nav-shown`)}, 100);
            // 3. call afterscrolling() depends on value of notInterrupted  
            if (notInterrupted == 0){
                afterScrolling(pageState, target, inscope_paraSet, inscope_target_state, arrayList, notInterrupted);
                clearInterval(timer);
            } else {
                afterScrolling(pageState, targetOfInterruption, inscope_paraSet, inscope_target_state, arrayList, notInterrupted);
                clearInterval(timer);
            }
        }
    }, 10);

            
    inscope_navList.addEventListener(`click`, function(event){
        if(event.target.tagName == `LI` || event.target.parentNode.tagName == `LI`){
            clearInterval(scrollAnimation);

            if(callAfterScrolling == false){ 
                notInterrupted = 1; 
                targetOfInterruption = document.getElementById(event.target.textContent); // obtain target
                pageState[`interruptTargetOutOfScope`] = targetOfInterruption; // for interruptedByTools() obatin target
                let iteration_targetIndex = inscope_section_store.indexOf(targetOfInterruption);
                let original_target = target;
                
                if(event.target.textContent == original_target.id) {
                    pageState[`clickTime`] = 2;
                    return
                }
                // Case: reach original target area when clicking nav_li.target
                if(window.scrollY < original_target.offsetTop + original_target.clientHeight){
                    if(Array.isArray(inscope_section_store_state[original_target.id])){
                        modifyElementState(original_target.id, ...inscope_paraSet, arrayList[inscope_section_store.indexOf(original_target)]);
                    } else {
                        modifyElementState(original_target.id, ...inscope_paraSet);
                    }
                }

                // Case: within target area when clicking nav_li.target
                else if(window.scrollY > targetOfInterruption.offsetTop && window.scrollY < targetOfInterruption.nextElementSibling.offsetTop){
                    if(Array.isArray(inscope_section_store_state[targetOfInterruption.id])){
                        arrayList[iteration_targetIndex].forEach((ele) => { ele.classList.remove(`opacity0`) });
                        modifyElementState(event.target.textContent, ...inscope_paraSet, arrayList[iteration_targetIndex]);
                    } else {
                        targetOfInterruption.classList.remove(`opacity0`);
                        modifyElementState(targetOfInterruption.id, ...inscope_paraSet);
                    }
                    return // the next step should either be wheel/touchmove or click nav_list
                }

                else{
                    if(Array.isArray(inscope_section_store_state[targetOfInterruption.id])){
                        arrayList[iteration_targetIndex].forEach((ele) => { ele.classList.add(`opacity0`) });
                        modifyElementState(event.target.textContent, ...inscope_paraSet, arrayList[iteration_targetIndex]);
                    } else {
                        targetOfInterruption.classList.add(`opacity0`);
                        modifyElementState(targetOfInterruption.id, ...inscope_paraSet);
                    }
                }

                // Case: execute afterScrolling()
                // Process: 1. click eventB > 2. afterscrolling() > 3. click eventA
                callAfterScrolling = true;
            } else {
                return
            }
        }
    })
}

function interruptedByTools(target, pageState, scrollAnimation, section_store, section_store_state, target_state, main_body, section_id, eventTarget, arraySectionList){
    const paraList2 = [section_store, section_store_state, target_state, main_body, section_id];

    clearInterval(scrollAnimation);

    section_store.forEach((section) => {
        let sec_idx = section_store.indexOf(section);
        if(Array.isArray(section_store_state[section.id])) modifyElementState(section.id, ...paraList2, arraySectionList[sec_idx]);  
    })
    
    // Sync: to-do stuff 1. > reveal current section + cal element state
    // navNotClicked == true > trigger scrollWithoutClickingNav - changes status to 2 and true simulatenously
    section_store.forEach((section) => {
        if(Array.isArray(section_store_state[section.id])){
            arraySectionList[section_store.indexOf(section)].forEach((ele) => { ele.classList.remove(`opacity0`); })
        } 
        else if(section.classList.contains(`opacity0`)) {
            section.classList.remove(`opacity0`);
        }
    })

    // special case: reveal taregt + reach its offsetTop, but interrupt it 
    if(pageState[`firstScroll`] == false && window.scrollY < pageState[`interruptTargetOutOfScope`].offsetTop){
        //clean + reset the reveal() of the scrolled target
        let indexOf_target = section_store.indexOf(pageState[`interruptTargetOutOfScope`]) - 1;
        let current_section = section_store[indexOf_target];

        if(Array.isArray(section_store_state[current_section.id])){
            let target = arraySectionList[indexOf_target];

            arraySectionList[indexOf_target].forEach((ele) => {
                ScrollReveal().clean(`#${ele.id}`);
                ScrollReveal().reveal(`#${ele.id}`,
                    returnRevealEffect(section_store.indexOf(current_section), section_store_state[current_section.id].length - 1, target.indexOf(ele))
                )
            })
        }

        modifyElementState(current_section.id, ...paraList2, arraySectionList[section_id.indexOf(target.id)]);
        pageState[`firstScroll`] = false;
        return
    }
    
    // async: to-do stuff 2. > Rest Scrolling.reveal() of other sections 
    setTimeout(() => { 
        let state_of_other_section;

        for(let a = 0; a < section_store.length; a++){
            state_of_other_section = section_store_state[section_store[a].id];

            if(Array.isArray(state_of_other_section)){
                arraySectionList[a].forEach((ele) => {
                    ScrollReveal().clean(`#${ele.id}`);
                    if(section_store_state[section_store[a].id][arraySectionList[a].indexOf(ele)] == 0)
                        ScrollReveal().reveal(`#${ele.id}`, returnRevealEffect(a, state_of_other_section.length - 1, arraySectionList[a].indexOf(ele), pageState[`files_inline`]))})
            }   
            else if(section_store[a].id != target.textContent && section_store_state[`${section_id[a]}`] == 0){
                ScrollReveal().clean(`#${section_id[a]}`);
                reveal(`#${section_id[a]}`, paraList2[2], paraList2[3], paraList2);
            }  
        }
    
    }, 400);

    return
}     

/* 
after finishing / interrupting the scrolling event
1. shows the elements that are hidden by class. opacity0
2. reset the reveal fun() to the elements that revealed undesirely 
Case A: element isn't array - show + reset reveal if *setion4[`section`] == 0*
Case B: element is array - show + reset reveal if *setion4[`section`][index] == 0*
*/
function afterScrolling(pageState, target, paraSet, target_list, arraySectionList, notInterrupted, original_target){
    original_target = original_target || target;
    notInterrupted == 0? pageState[`navNotClicked`] = true: pageState[`navNotClicked`] = false; // clicking nav scrolling event is finished / intrrupted 
    let iteration_target;
    let effectObj;
    let section_store = paraSet[0]; let section_store_state = paraSet[1]; 

    section_store.forEach((section) => {
        if(Array.isArray(section_store_state[section.id])){
            iteration_target = arraySectionList[section_store.indexOf(section)];
    
            iteration_target.forEach((ele) => {
                if(notInterrupted == 0){
                    ele.classList.remove(`opacity0`);
                } else { 
                    if(section.id == target.id) ele.classList.remove(`opacity0`);
                }

                effectObj = returnRevealEffect(section_store.indexOf(section), section_store_state[section.id].length - 1, iteration_target.indexOf(ele), pageState[`files_inline`])
                if(section_store_state[section.id][iteration_target.indexOf(ele)] == 0){
                    //Case B to-do stuff 2 
                    ScrollReveal().clean(`#${ele.id}`);
                    ScrollReveal().reveal(`#${ele.id}`, effectObj);
                }
            })
        } else { // Case A
            section.classList.contains(`opacity0`)? section.classList.remove(`opacity0`): null; // Case A to-do stuff 1.
            ScrollReveal().clean(`#${section.id}`); // Case A to-do stuff 2
            section != target? reveal(`#${section.id}`, ...paraSet, target_list, arraySectionList): null; 
        }
    })

    pageState[`clickTime`] = 1;
}

export function plainReveal(target){
    ScrollReveal().reveal(target, {opacity: 0, duration: 1500})
}

export function returnRevealEffect(iteration_target_index, last_index, indexOfA, filesNo){
    let return_obj;

    switch(iteration_target_index){
        case 1: 
            return_obj = (indexOfA == 0? 
                {opacity: 0, distance: `150px`, origin: `left`, duration: 2000}: 
                    indexOfA == last_index? {opacity: 0, distance: `50px`, origin: `bottom`, duration: 1500}:
                        {opacity: 0, distance: `100px`, origin: `right`, duration: 1500})
            break;
        case 2: 
            return_obj = (indexOfA == 0? 
                {opacity: 0, distance: `150px`, origin: `right`, duration: 2000}: 
                    indexOfA == last_index? {opacity: 0, distance: `50px`, origin: `bottom`, duration: 1500}:
                        {opacity: 0, distance: `100px`, origin: `left`, duration: 1500})
            break;
        case 3: 
            return_obj = indexOfA == 0? 
                {opacity: 0, distance: `100px`, origin: `left`, duration: 1500}: indexOfA > 0 && indexOfA < 6?
                {opacity: 0, distance: `50px`, origin: `bottom`, duration: 1250}: indexOfA == last_index? 
                {opacity: 0, distance: `50px`, origin: `bottom`, duration: 1000}: {delay: 250 * (indexOfA % filesNo), duration: 1000};
            break;
    }
    return return_obj
}

/* ------------------------------------ plain function ---------------------------------------------*/
function reveal(target, section_store_state, target_state, paraSet){ 
    let target1 = target.slice(1, target.length);

    if(section_store_state[target1] == 0){
        ScrollReveal().reveal( target, { duration: 1500, opacity: 0, distance: `150px`, origin: `bottom`});
        if(target_state[target1] == false){ 
            section_store_state[target1] = 0;
            return
        }
        modifyElementState(target, ...paraSet);
    }
}