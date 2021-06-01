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
   
    let result_array = [];
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
                    while(!css_array[i].includes("@")){
                        i--
                    }
                    let media_index = result_array.indexOf(css_array[i]);
                    //if it's new media query
                    if(media_index == -1){
                        result_array.push(css_array[i]) //push @media screen...
                        //add entry of media
                        let j = idx;
                        while(!css_array[j].includes("}")){
                            result_array.push(css_array[j]);
                            j++
                        }
                        result_array.push(css_array[j])
                        result_array.push("}")
                    } else {
                        //if this media query already exists
                        let j2 = idx;
                        let m = media_index;
                        let end = false;
                        while(!css_array[j2].includes("}")){
                            let test_arr = result_array.slice(m);
                            if(css_array[j2].includes("{") && test_arr.indexOf(css_array[j2]) != -1){
                                end=true;
                                break;
                            }
                            result_array = insert(result_array, m+1, css_array[j2])
                            j2++
                            m++
                        }
                        if(!end){
                            result_array = insert(result_array, m+1, "    }")
                        }
                    }
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

const insert = (arr, index, newItem) => [
    // part of the array before the specified index
    ...arr.slice(0, index),
    // inserted item
    newItem,
    // part of the array after the specified index
    ...arr.slice(index)
  ]