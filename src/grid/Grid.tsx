import * as React from 'react';
import './Grid.css';
import type {Dict, TDataType} from '../Api';

export interface ColumnProps {
    displayProperty: string;
    isEditing?: boolean;
    template?: ({value}: {value: TDataType}) => React.ReactElement;
    width?: string;
    header?: string;
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
    let gridTemplateColumns = columns.map(c => (c.width || '1fr')).join(' ');
    return {'gridTemplateColumns': gridTemplateColumns};
}

const Cell = ({value, CellTemplate}: {value: TDataType, CellTemplate?: ({value}: {value: TDataType}) => React.ReactElement}) => {
    return (
        <div className='Grid-Cell'>
            {CellTemplate ? <CellTemplate value={value}/> : value?.toString()}
        </div>
    );
}
const Header = ({columnsProps}: {columnsProps: ColumnProps[]}) => {
    return ( 
        <div className='Grid-Header'>
            {
                columnsProps.map((column) => {
                    return (
                        <Cell key={column.header} value={column.header}/>
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
                        <Cell  key={column.displayProperty}
                               value={data[column.displayProperty]}
                               CellTemplate={column.template}/>
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
                    props.data.map((item, index) => {
                        return (
                            <Row key={index} columnsProps={props.columnsProps} data={item}/>
                        )
                    })
                }
            </>
        </div>
    );
}
 
export default Grid;