import React from 'react';
import { Dict, TDataType } from '../Api';
import './List.css';

interface ListProps {
    colorStyle: string;
    data: Dict[] | null;
    template: ({data}: {data: Dict}) => React.ReactElement;
}
 
interface ListState {
    
}

class List extends React.Component<ListProps, ListState> {
    constructor(props: ListProps) {
        super(props);

    }
    render() { 
        return ( 
            <div className={'List ' + this.props.colorStyle}>
                {
                    this.props.data && this.props.data.map((item, index) => {
                        return (
                            <this.props.template
                                key={index}
                                data={item}
                                />
                        )
                    })
                }
            </div>
        );
    }
}

export default List;
