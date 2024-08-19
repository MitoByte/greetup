import * as React from 'react';
import * as styles from './NameButton.module.css';

export const NameButton = ({name, selected, active})=>{
    return(
        <span
            className={`srcryBox ${styles.nameButton}`}
            onClick={()=> selected(name)}
            style={active?
                    {
                        backgroundColor : 'var(--active-background)',
                        color : 'var(--active-color)'
                    }
                    :
                    {
                        backgroundColor : 'var(--inactive-background)',
                        color : 'var(--inactive-color)'
                    }
                }
        >
            {name}
            <div
                className={styles.indicator}
                style={active? 
                    {
                        backgroundColor : 'var(--active)'
                    }
                    :
                    {
                        backgroundColor : 'var(--inactive)'
                    }
                }
            ></div>
        </span>
    );
}