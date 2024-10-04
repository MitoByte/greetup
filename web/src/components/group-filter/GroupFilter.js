import * as React        from 'react';
import * as styles       from './GroupFilter.module.css';
import { BreadCrumbs }   from './breadcrumbs/BreadCrumbs';
import { NameContainer } from './name-container/NameContainer';
import { SearchBar }     from './search-bar/SearchBar';







export const GroupFilter = ({nameList, selected, toggle, resultList}) => {
    // selected   : list of organization names selected by user.
    // nameList   : list of all organization names for matching search results.
    // toggle     : passes boolean value up to parent to close group filter.
    // resultList : passes list of selected names to parent for
    //              filtering organization data for calendar.



      //  List of organization names narrowed down by user input
      //  in search bar --->
    const [ filteredNames, setFilteredNames ] = React.useState( nameList );

      //  List of organization names selected by the user --->
    const [ selectedNames, setSelectedNames ] = React.useState( selected.length ? [ ...selected ] : [ 'all' ] );





      //  Sends list of selected organizations up to parent component
      //  as user makes new selections --->
    React.useEffect( () => resultList( selectedNames ),  [ selectedNames, resultList ] );





      //  Adds otganization name to list of selected names --->
    const handleSelection = ( name ) => {

        name === 'all' ?
        setSelectedNames( [ 'all' ] ) :
        selectedNames.indexOf( 'all' ) > -1 ? setSelectedNames( [ name ] ) :
        selectedNames.indexOf( name )  > -1 && selectedNames.length === 1 ? setSelectedNames( [ 'all' ] ) :
        selectedNames.indexOf( name )  > -1 ? setSelectedNames( [ ...selectedNames.filter( a => a !== name ) ] ) :
        setSelectedNames( [ ...selectedNames, name ] );
    }

    
    
      //  Removes a organization name from list of selectedNames --->
    const removeFromSelection = ( name ) => {

        if( name !== 'all' ){
            if( selectedNames.length === 1 ) { setSelectedNames( [ 'all' ] ); }
            else{ setSelectedNames( [ ...selectedNames.filter( a => a !== name ) ] ); }
        }
    }



      //  Updates filtered organization names are user types --->
    const handleUserInput = ( input ) => {
        
        const groups = nameList.filter( a => a.toLowerCase().startsWith( input.toLowerCase() ) );

        setFilteredNames( groups );
    }


    
    //  Filters names when user clicks search or presses
    //  enter key --->
    const handleSearch = ( input ) => {

        setFilteredNames( nameList.filter( a => a === input ) );

    }

    

    
    
    return(

        <article className={ styles.mainContainer }>

            <svg
                className={ styles.closeButton }
                viewBox="0 0 20 20"
                onClick={ () => toggle( false ) }
            >

                <use href="#close_button" />

            </svg>



            <article className={ styles.breadcrumbs }>

                <BreadCrumbs
                    crumbs={ selectedNames }
                    removeGroup={ ( value ) => removeFromSelection( value ) }
                />

            </article>



            <article className={ styles.searchBar }>

                <SearchBar
                    userInput={ handleUserInput }
                    searchText={ handleSearch }
                />

            </article>



            <article className={ styles.nameContainer }>

                <NameContainer
                    names={ filteredNames }
                    selectedGroups={ selectedNames }
                    filteredGroups={ filteredNames }
                    updateList={ ( name ) => handleSelection( name ) }
                />

            </article>
            
        </article>

    );
}