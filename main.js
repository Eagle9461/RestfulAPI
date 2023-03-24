import axios from "axios";
import { State }  from 'country-state-city';

const fetchData = async () => {
	const dental_response = await axios.get('https://storage.googleapis.com/scratchpay-code-challenge/dental-clinics.json');
    const vet_response = await axios.get('https://storage.googleapis.com/scratchpay-code-challenge/vet-clinics.json');

    return dental_response.data.concat(vet_response.data);
};

const searchClinics = async (clinicName, state, availability) => {

    let currentState = State.getStateByCodeAndCountry(state, 'US');

    const isCriteria = (clinic) => {
        let stateName = ( clinic.stateName == undefined ) ? clinic.stateCode : clinic.stateName;

        return (
            ( clinicName == "" || ( clinic.clinicName == clinicName || clinic.name == clinicName ) ) &&
            ( stateName == currentState.isoCode || stateName == currentState.name ) &&
            (
                (availability.from == "" || clinic.from == availability.from) && 
                (availability.to == "" || clinic.to == availability.to)
            )
        );
    }

    const data = await fetchData();
    return data.filter(isCriteria);
}

searchClinics('', 'CA', { from : "", to : "" }).then(data => {
    console.log(data);
})
