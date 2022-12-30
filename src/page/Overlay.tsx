import * as React from 'react';
import './Overlay.css';
 
const Overlay: React.FunctionComponent<{enabled: boolean}> = ({enabled}: {enabled: boolean}) => {
    return (<div className={'Overlay ' + (enabled ? 'on' : 'off')}></div>);
}
 
export default Overlay;