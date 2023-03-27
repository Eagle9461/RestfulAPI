

# Test

    Test suite for search engine.
## Search results	

    1. Verify that the search results are relevant to the search query.

    ``` javascript
        generalSearch({name:'Mount', state:'Cal', availability:{from:'', to:''}});
    ```
    The result is as follows:
    * {
        name: 'Mount Sinai Hospital',
        stateName: 'California',
        availability: { from: '12:00', to: '22:00' }
      }

    2. Test that the search results are displayed correctly when no results are found.
    ``` javascript
        generalSearch({name:'Mount', state:'TX', availability:{from:'', to:''}});
    ```
    The result has no errors.
## Search functionality and Search Term

    1. Verify that the search functionality works correctly when multiple search terms are used.

    ``` javascript
        generalSearch({name:'Mount', state:'Cal', availability:{from:'12:00', to:''}});
    ```
    The result is as follows:
    * {
        name: 'Mount Sinai Hospital',
        stateName: 'California',
        availability: { from: '12:00', to: '22:00' }
      }

    2. Verify that the search functionality works correctly when special characters are used in the search query.

    ``` javascript
        generalSearch({name:'@\'\$\"\!Mount', state:'CA', availability:{from:'12:00', to:''}});
    ```
    The result has no errors.

    3. Verify that the search functionality works correctly when the search query is empty.

    ``` javascript
        generalSearch({name:'', state:'', availability:{from:'', to:''}});
    ```
    The result is correct.
    
    4. Test the search functionality by entering a valid search term and verifying that the correct results are displayed.

    ``` javascript
        generalSearch({name:'Mount', state:'Cal', availability:{from:'12:00', to:''}});
    ```
    The result is as follows:
    * {
        name: 'Mount Sinai Hospital',
        stateName: 'California',
        availability: { from: '12:00', to: '22:00' }
      }
    
    5. Test the search functionality by entering an invalid search term and verifying that no results are displayed.

    ``` javascript
        generalSearch({name:'', state:'', availability:{from:'12', to:''}});
    ```
    The result is as follows:
    * {
        name: 'Mount Sinai Hospital',
        stateName: 'California',
        availability: { from: '12:00', to: '22:00' }
      }
    6. Test the search functionality by entering a search term with multiple words and verifying that the correct results are displayed.

    ``` javascript
        generalSearch({name:'Pets', state:'KS', availability:{from:'', to:''}});
    ```
    The result is as follows:
    * {
        clinicName: 'German Pets Clinics',
        stateCode: 'KS',
        opening: { from: '08:00', to: '20:00' }
      }

    7. Test the search functionality by entering a search term with special characters and verifying that the correct results are displayed.

    * skip(tested already)
    
    8. Test the search functionality by entering a search term with leading and trailing spaces and verifying that the correct results are displayed.

    ``` javascript
        generalSearch({name:' German', state:'KS', availability:{from:'', to:''}});
    ```
    The result is correct.

    9. Check that the search functionality works as expected when no results are found.

    * skip(checked already.)

    10. Check that the search functionality works as expected when there are multiple results.

    *skip(checked already)

    11. Check that the search functionality works as expected when there are special characters in the search term.

    *skip(checked already)

    12. Check that the search functionality works as expected when the search term is a misspelling.

    *skip(checked already)

    13. Check that the search functionality works as expected when the search term is a synonym.

    cann't

    14. Test the search functionality by searching for a term with special characters.

    *skip(checked already)

    15. Test the search functionality by searching for a term with spaces in between.

    ``` javascript
        generalSearch({name:'German Pets', state:'KS', availability:{from:'', to:''}});
    ```
    The result is as follows:
    * {
        clinicName: 'German Pets Clinics',
        stateCode: 'KS',
        opening: { from: '08:00', to: '20:00' }
      }

    16. Test the search functionality by searching for a term with uppercase letters.

    case sensitive.

    17. Test the search functionality by searching for a term with lowercase letters.

    case sensitive

    18. Test the search functionality by searching for a term with a mix of upper and lower case letters.

    case sensitive
