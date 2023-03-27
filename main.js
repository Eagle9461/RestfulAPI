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
        clinic.stateName = ( clinic.stateName == undefined ) ? State.getStateByCodeAndCountry(clinic.stateCode, 'US').name : clinic.stateName;

        //convert stateName to stateCode
        clinic.stateCode = ( clinic.stateCode == undefined ) ? stateNameToCode(clinic.stateName) : clinic.stateCode;

        return (
            ( isContained(clinic.clinicName, clinicName) || isContained(clinic.name, clinicName) ) &&
            ( clinic.stateCode == state || isContained(clinic.stateName, state) ) &&
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

// Test

//generalSearch({name:'', state:'', availability:{from:'', to:''}});

generalSearch({name:'German Pets', state:'KS', availability:{from:'', to:''}});

//generalSearch({name:'Mount', state:'TX', availability:{from:'', to:''}});
