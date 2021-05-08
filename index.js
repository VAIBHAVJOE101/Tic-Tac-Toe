const boxes = Array.from(document.getElementsByClassName('box')) ;
const playText = document.getElementById("playText") ;
const restartBtn = document.getElementById('restartBtn');
const O_text = 'O'; 
const X_text = 'X';
const spaces = [] ;
let count = 0;
let currplayer ;


const drawboard = () => {
        boxes.forEach((box,index)=>{
                let stylestring = '' ;
                if(index <3 ){
                        stylestring += `border-bottom: 3px solid var(--purple);`;
                }
                if(index %3 ===0){
                        stylestring += `border-right: 3px solid var(--purple);`;
                }
                if(index %3 ===2){
                        stylestring += `border-left: 3px solid var(--purple);`;
                }
                if (index > 5) {
                        stylestring += `border-top: 3px solid var(--purple);`;
                }

                box.style = stylestring;
                box.addEventListener("click",boxclicked);
        })
}

const boxclicked = (e) =>{
        count ++ ;
        const id = e.target.id ;
        console.log(id);
        if(!spaces[id]){
                spaces[id] = currplayer ;
                e.target.innerText = currplayer ;
                
                if(playerhaswon()){
                        playText.innerText = `${currplayer}  has won` ;
                        boxes.forEach((box,index)=>{
                                box.removeEventListener("click", boxclicked);
                        })
                        return ;
                }
                if (endgame()) {
                        playText.innerText = `DRAW` ;
                        return ;
                }
                currplayer = currplayer == O_text ? X_text : O_text ;
        }
        console.log(spaces);
}

const endgame = () => {
       if(count == 9)
       {
               return true;
       }
}

const playerhaswon  = () => {
        if(spaces[0] == currplayer){
                if(spaces[1]== currplayer &&  spaces[2] ==currplayer) {
                        console.log(`${currplayer} wins up top . `); ;
                        return true ;
                }
                if(spaces[3]== currplayer &&  spaces[6] ==currplayer) {
                        console.log(`${currplayer} wins up left . `) ;
                        return true ;
                }
                if(spaces[4]== currplayer &&  spaces[8] ==currplayer) {
                        console.log(`${currplayer} wins diagonal . `) ;
                        return true ;
                }
        }
        if(spaces[8] == currplayer){
                if(spaces[5]== currplayer &&  spaces[2] ==currplayer) {
                        console.log(`${currplayer} wins up right . `); ;
                        return true ;
                }
                if(spaces[7]== currplayer &&  spaces[6] ==currplayer) {
                        console.log(`${currplayer} wins up bottom . `) ;
                        return true ;
                }
        }
        if(spaces[4] == currplayer){
                if(spaces[1] ==currplayer && spaces[7]==currplayer){
                        console.log(`${currplayer} wins up middle verticle . `); ;
                        return true ;
                }
                if(spaces[3] ==currplayer && spaces[5]==currplayer){
                        console.log(`${currplayer} wins up middle hori . `); ;
                        return true ;
                }
        }
}


const restart = () => {
        spaces.forEach((space,index)=>{
                spaces[index] = null ;
        });
        boxes.forEach((box) => {
                box.innerText = '';
        });
        count = 0;
        playText.innerHTML = `Let's Play` ;
        currplayer = O_text ;
        boxes.forEach((box,index)=>{
                box.addEventListener("click", boxclicked);
        })

}
restartBtn.addEventListener("click",restart) ;
restart();
drawboard();