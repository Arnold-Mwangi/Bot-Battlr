function digitalRoot(n) {
    let numbers = `${n}`;
    let sum = 0;
     
    for(let item of numbers){
      sum += parseInt(item);
      
    }
     let stringSum = `${sum}`
     if(stringSum.length > 1){
       
      return digitalRoot(sum)
       
     }else{
         return sum
     }
    
   }

   console.log(digitalRoot(132189 ));
   
   //