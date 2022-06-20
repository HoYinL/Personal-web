        /*
         Click and modify the files
         Children side:
         1. modify the title color + border
         2. modify the position of the whole files
         Parent side:
         1. hide and show the contained files by clicking the btn
         - modify the size of container 
         - show the contained files one by one
         1. children side > 2. parent side (declare the smallest and independent/ but universal element first)

         situtions that trigger click event
         1. files non hid(const) + files(>6) hid - partly able to click
         2. files non hid(const) + files(>6) are shown - all able to click 
          - there are 2 kinds of transition styles for files(>6 to files_length) [for shown + for hover]
         */
         //modify the position of the files
         /*
         //each file has 2 transition styles - 1. normal 2. shown
         */

                       /* 
     Project_files_cover[a].addEventListener( .., .., true/fasle)
     - true - Capture: main's event > cover's event - The fomer effect is cancelled, but then the cover effect added it back
     - false(default) - Bubbling: cover's event > main's event - The former effcect is cancelled
     Triggered event in capture stage can achieve very close/even seems the same effect, but its logic is in fact 
     completely opposite to the original ides as !both the events are actually triggered!
     - What we really want is trigger the event apple to apple
     e.stopPropagation() > cut the capture/bubbling chain - depends on the third argumnet is true/false

     Event flow:
     - Trigger the event 
     - Capture 
       1. (true)? trigger the event in ascending order 
       2. e.stopPropagation()? end the capturing after the element was captured
     - Target 
     - Bubbling
       1. (false)? trigger the event in descending order 
       2. e.stopPropagation()? end the bubbling after the event flow was bubbled to the event
     */

       /*workplace_li[0].classList.add("workplace-list-click");
    for(let a = 0; a < workplace_li_length; a++){
                details_opacity(a, "0");
                details_opacity(0, "1");

                // click event: 1) list-change 2) content-change 
                workplace_li[a].onclick = function(){
                    for(let b = 0; b < workplace_li_length; b++){
                        // 1) list-change
                        workplace_li[b].classList.remove("workplace-list-click");
                        // 2) content-change
                        workplace_details[b].style.transition = "opacity 0s"; 
                        details_opacity(b, "0");
                    }
                    //1) list-change
                    workplace_li[a].classList.add("workplace-list-click"); //modify as function later
                    window.innerWidth > 800? change_border(a, 44, workplace_light):change_border(a, 150, workplace_light);
                    window.addEventListener("resize", ()=>{
                    window.innerWidth > 800? change_border(a, 44, workplace_light):change_border(a, 150, workplace_light);
                    })
                    // 2) content-change
                    workplace_details[a].style.transition = "opacity 0.25s"; 
                    details_opacity(a, "1");
                }
    
                main.addEventListener("click", ()=>{
                        workplace_details[a].classList.remove("workplace-details-click-border");
                });
        
                workplace_details[a].addEventListener("click", (e)=>{
                    e.stopPropagation();
                    getStyle(workplace_details[a], "border-left-color") == "rgba(0, 0, 0, 0)"? 
                    workplace_details[a].classList.add("workplace-details-click-border"): 
                    workplace_details[a].classList.remove("workplace-details-click-border");
                }, false);

            function details_opacity(target, value){
                workplace_details[target].style.opacity = value;
                workplace_details[target].style.zIndex = value;
            }
            function change_border(num, length, target){
                let c = num*length;
                let d = c.toString();
                if(window.innerWidth > 800){ 
                    target.style.top = d + "px";
                    target.style.left = "0";
                }
                else{
                    target.style.left = d + "px";
                    target.style.top = "auto";
                    target.style.bottom = "0";
                }
            }
        }*/

//linear speed: calculate outside the interval function
//ease speed: claculate during the interval function executing

