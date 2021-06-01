function getHTML(){
    const html = document.getElementById('html').value;
    const div  = document.createElement('div');
    div.innerHTML = html;
    var allElements = div.querySelectorAll('*');
    const allClasses = [];

    for (var i = 0; i < allElements.length; i++) {
        var classes = allElements[i].className.toString().split(/\s+/);
        for (var j = 0; j < classes.length; j++) {
          var cls = classes[j];
          if (cls && allClasses.indexOf(cls) === -1){
            allClasses.push(cls);
          }
        }
    }
    console.log(allClasses);
    return allClasses;
}

function getStyles(){
    const css = document.getElementById('css').value;
    const css_array = css.split("\n");
    const html = getHTML();
    let styles = ``;
    const classesUsed = [];
   
    const result_array = [];
    html.forEach(cls => {
        /*
        console.log(cls)
        classesUsed.push( { name: cls, used: locations(cls, css) })
        */
       css_array.forEach((el, idx) => {
           if(el.includes(cls) && el.endsWith("{")){
               if(el[0] != " " && el[1] != " "){
                    let i = idx;
                    while(!css_array[i].includes("}")){
                        result_array.push(css_array[i]);
                        i++
                    }
                    result_array.push(css_array[i])
                } else{
                    //add media
                    let i = idx;
                    while(!css_array[i].includes("@media")){
                        i--
                    }
                    result_array.push(css_array[i])
                    //add entry of media
                    let j = idx;
                    while(!css_array[j].includes("}")){
                        result_array.push(css_array[j]);
                        j++
                    }
                    result_array.push(css_array[j])
                    result_array.push("}")
                }
           }
       })
    });
    console.log(classesUsed)
    const res_styles = result_array.join("\n");
    console.log(res_styles)
}



function locations(substring, string){
    var a=[],i=-1;
    while((i=string.indexOf(substring,i+1)) >= 0) a.push(i);
    return a;
}