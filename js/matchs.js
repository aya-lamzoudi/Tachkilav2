//match functions



export function affichage(matches,liste,template){

   liste.innerHTML = ``;
   
   matches.forEach(matche => {
        const clone = template.content.cloneNode(true);
        const card = clone.querySelector(".match-card");
       
     
        let date= new Date(`${matche.date}`);
        card.dataset.id=matche.id;
        console.log("card id:",matche.id) //asign id to the card
        console.log( "the id",card.dataset.id)
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


        if(nowdate>matchdate && matche.butAtlas== null && matche.butadversaire == null){
          console.log("its's over");

          card.querySelector(".score-btn").classList.remove("hidden");
        }
        
        if(matche.butAtlas != null && matche.butadversaire != null){
         card.querySelector(".match-result").classList.remove("hidden");
         card.querySelector(".match-score").innerText= `${matche.butAtlas} - ${matche.butadversaire}`

         if(Number(matche.butAtlas) > Number(matche.butadversaire)){
            card.querySelector(".match-score").classList.add("text-[#20D244]");
            card.querySelector(".matche-status").classList.add("text-[#20D244]");
            card.querySelector(".matche-status").innerText="Victoire";
          console.log(Number(matche.butAtlas));
          console.log(Number(matche.butadversaire));
          

         }else if(matche.butAtlas < matche.butadversaire){
            card.querySelector(".match-score").classList.add("text-[#D75241]");
            card.querySelector(".matche-status").classList.add("text-[#D75241]");
            card.querySelector(".matche-status").innerText="Defaite";
         }else if(matche.butAtlas == matche.butadversaire){
            card.querySelector(".match-score").classList.add("text-slate-300");
            card.querySelector(".matche-status").classList.add("text-slate-300");
            card.querySelector(".matche-status").innerText="Nul";
         }
              statistique(matches)

        }
        else{
          console.log("the match still did not hapened");
          // card.querySelector(".match-result").classList.remove("hidden")
        }


        card.classList.remove("hidden");
        liste.appendChild(card);
          
    });

}

//statistique

export function statistique(matches) {

    let cards = document.querySelector(".match-statistique");
    // cards.querySelector(".victoire-nbr").innerText = ;
    // cards.querySelector(".nul-nbr").innerText = ;
    // cards.querySelector(".defaite").innerText =
    
    // cards.querySelector(".but-marque").innerText=but
    // cards.querySelector(".but-marque").innerText = (matches.reduce((acc, matche) => acc + Number(matche.butsAtlas), 0))
    // cards.querySelector(".but-encaise").innerText =(matches.reduce((acc, matche) => acc + Number(matche.butsAdversaire), 0))
    // cards.querySelector(".defaite").innerText = 
}