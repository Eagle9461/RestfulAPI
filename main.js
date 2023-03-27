import axios from "axios";
import { State }  from 'country-state-city';
import { stateNameToCode } from './stateNameToCode.js';

// fetch data about clinics

const fetchData = async (url) => {
    const response = await axios.get(url);
    return response.data;
};

// check whether text contain a term

const isContained = (text, term) => {
    if( text == undefined ) 
        return false;
    
    return text.search(term) > -1;
}

// get searching result from list of clinics

const searchClinics = async (clinicName, state, availability, url) => {

    // check whether a clinic is criteria

    const isCriteria = (clinic) => {

        // convert stateCode to stateName
        let stateName = ( clinic.stateName == undefined ) ? 
            State.getStateByCodeAndCountry(clinic.stateCode, 'US').name : clinic.stateName;

        //convert stateName to stateCode
        let stateCode = ( clinic.stateCode == undefined ) ? 
            stateNameToCode(clinic.stateName) : clinic.stateCode;

        return (
            ( isContained(clinic.clinicName, clinicName) || isContained(clinic.name, clinicName) ) &&
            ( stateCode == state || isContained(stateName, state) ) &&
            (
                ( clinic.availability != undefined ) ?
                (
                    (availability.from == "" || clinic.availability.from == availability.from) && 
                    (availability.to == "" || clinic.availability.to == availability.to)
                ) :
                (
                    (availability.from == "" || clinic.opening.from == availability.from) && 
                    (availability.to == "" || clinic.opening.to == availability.to)
                )
            )
        );
    } 

    const data = await fetchData(url);
    return data.filter(isCriteria);
}

// display the results.

const display = (datas) => {
    datas.forEach ( data => console.log(data) );
}

// As main function, search for all urls.

const generalSearch = (content) => {
    const dataUrls = [];
    
    dataUrls.push('https://storage.googleapis.com/scratchpay-code-challenge/dental-clinics.json');
    dataUrls.push('https://storage.googleapis.com/scratchpay-code-challenge/vet-clinics.json');
    
    
    dataUrls.forEach( url => {
        searchClinics(content.name, content.state, content.availability, url)
        .then(data => {
            display(data);
        })
    }
    )
}

const test = () => {
    let testData = [   
        {name:'Mount', state:'Cal', availability:{from:'12:00', to:''}, description:"Multiple terms"}, 
        {name:'@\'\$\"\!Mount', state:'CA', availability:{from:'12:00', to:''}, description:"Character"},
        {name:'', state:'', availability:{from:'', to:''},  description:"Empty"},
        {name:'Mount', state:'Cal', availability:{from:'12:00', to:''}, description:"Valid terms"},
        {name:'', state:'', availability:{from:'12', to:''},  description:"Invalid terms"},
        {name:'Pets', state:'Kans', availability:{from:'', to:''}, description:"state searching"},
        {name:' German', state:'KS', availability:{from:'', to:''}, description:"leading and trailing spaces"},
        {name:'German Pets', state:'KS', availability:{from:'', to:''}, description:"spaces in between"}
   ];
    testData.forEach( (content, i) => {
        setTimeout(
            ()=> {
                console.log(content.description + " -> name: "+content.name, "state:"+content.state, "availability: from:"+content.availability.from+" to:"+content.availability.to);
                generalSearch(content);
            }, 1000*i
        )
    })
}

test();
