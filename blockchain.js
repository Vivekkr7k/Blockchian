const SHA256 = require('crypto-js/sha256');

class Block{
    constructor(index , timestamp , data , previousHash = " "){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
       
        this.hash = this.calculateHash();
    }
  
    // will use sha256 cryptographic function to generate the hash of the this block
     calculateHash(){
        return SHA256(this.index + this.timestamp + JSON.stringify(this.data) + this.previousHash  + this.nonce).toString();
     }

     mineNewBlock(difficulty){
        while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0") ){
            this.nonce++;
            this.hash =this.calculateHash();
        }
        console.log("a new block is minned "+ this.hash);
     }

}

class BlockChain{
    constructor(){
        this.chain=[this.createGenisisBlock()];
        this.difficulty= 0; 
    }
    
  

   
  createGenisisBlock(){
      return new Block(0, "12/03/2023","This is the genisis block" , "0");
    }
   

    
    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }
    
    addBlock(newBlock){
          newBlock.previousHash = this.getLatestBlock().hash;
        //   newBlock.hash =newBlock.calculateHash();
         newBlock.mineNewBlock(this.difficulty);

          this.chain.push(newBlock);
    }

    
    checkBlockChainValid(){
        for(let i = 1 ; i< this.chain.length ; i++ ){
           const currentBlock = this.chain[i] ;
           const previousBlock = this.chain[i-1] ;

           if(currentBlock.hash  != currentBlock.calculateHash()){
            return false;
           }

           if(currentBlock.previousHash != previousBlock.hash){
            return false;
           }

        }
        return true ;
        
    }



}
//creating new blocks
let block1 = new Block(1 , "20/01/2023", {mybalance : 100});
let block2 = new Block(2 , "21/01/2023", {mybalance : 200});

//adding the block to the blockchain 
let  myBlockchain  = new BlockChain();

console.log("the first block creation ");
myBlockchain.addBlock(block1);
console.log("the second block creation ");
myBlockchain.addBlock(block2);



console.log(JSON.stringify(myBlockchain, null, 4));
// console.log("Valication check for the blockchain : " + myBlockchain.checkBlockChainValid());

//tampering the blockchain
// myBlockchain.chain[1].data = {mybalance : 400};

// console.log("Valication check for the blockchain after hacking : " + myBlockchain.checkBlockChainValid());
// console.log(JSON.stringify(myBlockchain, null, 4));  //printing the data vlaue 















