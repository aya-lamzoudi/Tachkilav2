//match functions



export function affichage(matches,liste,template){

   liste.innerHTML = ``;

   matches.forEach(matche => {
        const clone = template.content.cloneNode(true);
        const card = clone.querySelector(".match-card");
       
     
        let date= new Date(`${matche.date}`);
        
        card.querySelector(".date-day-name").innerText = date.toLocaleString('default', {weekday : "short"})
        card.querySelector(".date-day").innerText = date.getDate();
        card.querySelector(".date-month").innerText = date.toLocaleDateString('default' ,{month : 'short'});
        card.querySelector(".date-time").innerText = matche.time;
        
        
        if(matche.domicile){
          card.querySelector(".match-status").innerText = "Domiclle";
          card.querySelector(".match-status").classList.remove("bg-slate-700");
          card.querySelector(".match-status").classList.add("bg-green-600", "text-white");
        }else{
             card.querySelector(".match-status").innerText = "Extérieur";
        }
       
        card.querySelector(".match-title").innerText = `Atlas FC vs ${matche.adversaire}`;
        card.querySelector("#match-location").innerText =matche.location;

       // let compaire de date with the curent date:

        let nowdate= new Date().getTime();
        let matchdate= date.getTime();
        console.log(matchdate)
        console.log(nowdate)
        if(nowdate>matchdate){
          console.log("its's over");
          card.querySelector(".function").classList.remove("hidden")
        }else{
          console.log("the match still did not hapened");
          // card.querySelector(".match-result").classList.remove("hidden")
        }





        card.classList.remove("hidden");
        liste.appendChild(card);


    });

}


