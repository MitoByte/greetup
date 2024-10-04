import * as React  from 'react';
import * as styles from './SearchBar.module.css';







export const SearchBar = ( { userInput, searchText } ) => {
    // userInput  : passes search text up to parent for narrowing down matches.
    // searchText : passes current search text to parent to find exact match.



      //  Stores text as user types --->
    const [ userText, setUserText ] = React.useState('');





      //  Triggers a search when user pushes enter key --->
    const detectEnterKey = (event)=>{
        
        if( event.keyCode === 13 ){ handleSearch(); }

    }



      //  Updates userText as user types and passes
      //  value up to parent for filtering --->
    const handleKeyStrokes = ( value ) => {

        setUserText( value );
        userInput( value );

    }


    
      //  Passes user text up to parent --->
    const handleSearch = () => { searchText(userText); }





    return(

        <article className={styles.mainContainer}>


            <label htmlFor="searchBar" className={`srcryBox ${styles.searchLabel}`}>

                <input
                    id="searchBar"
                    type="search"
                    className={ styles.searchBar }
                    placeholder="search for groups"
                    onKeyUp={ ( event ) => detectEnterKey( event ) }
                    onChange={ ( event ) => handleKeyStrokes( event.target.value ) }
                />

                <button
                    type="button"
                    className={ styles.searchButton }
                    onClick={ handleSearch }
                >
                    search
                </button>

            </label>


        </article>
    );
}