// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

// the obj factory function
const pAequorFactory = (number, dnaBase) => {
  
  let pAequor = {
    specimenNum: number,
    dna: dnaBase,

    // mutate to a completely different DNA
    mutate: function(){
      let currentDNA = this.dna;
      let newDNA = [];
      for(let i = 0; i < currentDNA.length; i++){
        let newDNABase = currentDNA[i];
        while(newDNABase === currentDNA[i]){
          newDNABase = returnRandBase();
        }
        newDNA.push(newDNABase);
      }
      this.dna = newDNA;
      return this.dna
    },

    // compare DNA between 2 objects. Describe similarity in percentage.
    compareDNA: function(pAequorToCompare){
      let counter = 0;
      for(let i = 0; i < this.dna.length; i++){
        if(this.dna[i] === pAequorToCompare.dna[i]){
          counter++
        }
      }
      console.log(`Specimen #${this.specimenNum} and specimen #${pAequorToCompare.specimenNum} have ${((counter/15)*100).toFixed(2)}% DNA in common.`);
    },

    // return true if obj's dna contains no less than 60% 'C' or 'G'.
    willLikelySurvive: function(){
      let counter = 0;
      for(let i = 0; i < this.dna.length; i++){
        this.dna[i] === 'C' || this.dna[i] === 'G' ? counter++ : counter = counter;
      }
      return counter/15 >= 0.6
    },

    // get complementary DNA strand. 'A' <==> 'T'; 'C' <==> 'G'
    complementStrand: function(){
      let complementaryStrand = [];
      for(let i = 0; i < this.dna.length; i++){
        switch(this.dna[i]){
          case 'A': complementaryStrand.push('T');
          break;
          case 'T': complementaryStrand.push('A');
          break;
          case 'C': complementaryStrand.push('G');
          break;
          case 'G': complementaryStrand.push('C');
        }
      }
      return complementaryStrand
    }
  };
  
  return pAequor
}

// create n objects that can survive. max number: 200 samples
const pAequorGenerator = (n) => {
  let number = 1;
  let pool = [];
  let currentSpecimen = {};
  while(number <= n && number <= 200){
    currentSpecimen = pAequorFactory(number, mockUpStrand());
    if(currentSpecimen.willLikelySurvive){
      pool.push(currentSpecimen);
      number += 1;
    }
  }

  return pool
}

//console.log(pAequorGenerator(30));
