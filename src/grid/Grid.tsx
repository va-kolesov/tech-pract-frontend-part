import * as React from 'react';
import './Grid.css';

interface Dict {
    [key:string]: unknown;
}

export interface ColumnProps {
    displayProperty: string;
    isEditing?: boolean;
    width: string;
    header: string;
}

interface GridProps {
    data: Dict[];
    columnsProps: ColumnProps[];
    isEditable?: boolean;
}

interface RowProps {
    data: Dict;
    columnsProps: ColumnProps[];
}

const getColumnsStyle = (columns: ColumnProps[]) => {
    let gridTemplateColumns = columns.map(c => c.width).join(' ');
    return {'gridTemplateColumns': gridTemplateColumns};
}

const Cell = ({value}: {value: string | number | boolean}) => {
    return (
        <div className='Grid-Cell'>
            {value}
        </div>
    );
}
const Header = ({columnsProps}: {columnsProps: ColumnProps[]}) => {
    return ( 
        <div className='Grid-Header'>
            {
                columnsProps.map((column) => {
                    return (
                        <Cell value={column.header}/>
                    )
                })
            }
        </div>
    );
}
const Row = ({columnsProps, data}: {columnsProps: ColumnProps[], data: Dict}) => {
    return (
        <div className='Grid-Row'>
            {
                columnsProps.map((column) => {
                    return (
                        <Cell value={data[column.displayProperty]}/>
                    )
                })
            }
        </div>
    );
}
const Grid = (props: GridProps) => {
    return (
        <div className='Grid-wrapper' style={getColumnsStyle(props.columnsProps)}>
            <>
                <Header columnsProps={props.columnsProps}/>
                {
                    props.data.map((item) => {
                        return (
                            <Row columnsProps={props.columnsProps} data={item}/>
                        )
                    })
                }
            </>
        </div>
    );
}
 
export default Grid;