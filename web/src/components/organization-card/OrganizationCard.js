import * as React  from 'react';
import * as styles from './OrganizationCard.module.css';







export const OrganizationCard = ( { data, selection } ) => {
    //  data      : Organization data.
    //  selection : passes event data to parent for modal.



    return(
        
        <article className={ styles.mainContainer }>


            
            <img src={ data.image } alt="Group Logo" className={ styles.companyLogo } />

            <h3 className={ `srcryTxt ${styles.companyName}` }>{ data.name }</h3>

            {
                data.events.length < 1 &&

                <p className={ `srcryTxt ${ styles.noEventText }` }>
                    <i>no upcoming events at this time</i>
                </p>
            }

            {
                data.events.length > 0 &&

                <article className={ styles.eventContainer }>


                    <p className={ `srcryTxt ${ styles.eventText }` }>
                        <span className={ styles.eventCount }>{ data.events.length }</span> upcoming event{ data.events.length > 1 ? 's' : '' }
                    </p>

                    <button
                        className={ `srcryTxt ${ styles.buttonCore } ${ styles.viewButton }` }
                        onClick={ () => selection( data.events ) }
                    >
                        view events
                    </button>

                    
                </article>
            }

            <a
                className={ `srcryTxt ${ styles.buttonCore } ${ styles.visitButton }` }
                target="_blank"
                rel="noreferrer"
                href={ data.url }
            >
                learn more
            </a>



        </article>
    );
}