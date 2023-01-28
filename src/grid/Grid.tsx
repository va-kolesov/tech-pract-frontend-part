import * as React from 'react';
import './Grid.css';
import type {Dict, ISelectorData, TDataType} from '../Api';

export interface ColumnProps {
    displayProperty: string;
    type?: 'boolean' | 'string' | 'number' | 'enum';
    isEditing?: boolean;
    editorData?: ISelectorData[];
    template?: ({value}: {value: TDataType}) => React.ReactElement;
    width?: string;
    header?: string;
}

interface GridProps {
    data: Dict[];
    columnsProps: ColumnProps[];
    isEditable?: boolean;
    onValueChanged?: (val: TDataType, field: string, index: number) => void;
}

interface RowProps {
    data: Dict;
    columnsProps: ColumnProps[];
}

const getColumnsStyle = (columns: ColumnProps[]) => {
    let gridTemplateColumns = columns.map(c => (c.width || '1fr')).join(' ');
    return {'gridTemplateColumns': gridTemplateColumns};
}

const Cell = ({value, CellTemplate, editorData}:
    {
        value: TDataType,
        editorData?: ISelectorData[],
        CellTemplate?: ({value}: {value: TDataType}) => React.ReactElement
    }) => {
        const val = editorData?.find(e => e.id == value)?.name ?? value;
    return (
        <div className='Grid-Cell'>
            {CellTemplate ? <CellTemplate value={value}/> : val?.toString()}
        </div>
    );
}
const Editor = ({value, type, onValueChanged, editorData}:
    {
        value: TDataType,
        type?: string,
        editorData?: ISelectorData[]
        onValueChanged: (val: TDataType) => void
    }) => {
    switch(type) {
        case 'boolean':
            return (
                <div className='Grid-Cell'>
                    <input type={'checkbox'} checked={value as boolean} onChange={(event) => onValueChanged(event.target.value as unknown as TDataType)}/>
                </div>
            );
        case 'enum':
            if (editorData) {
                return (
                    <div className='Grid-Cell'>
                        <select onChange={(event) => onValueChanged(event.target.value as unknown as TDataType)}>
                            {editorData.map(e => {
                                return <option key={e.id} value={e.id}>{e.name}</option>
                            })}
                        </select>
                    </div>
                );
            }
        default: 
            return (
                <div className='Grid-Cell'>
                    <input value={value as string} onChange={(event) => onValueChanged(event.target.value as unknown as TDataType)}/>
                </div>
            );;
    } 
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
const Row = ({
    columnsProps,
    data,
    editable,
    onValueChanged
}: {
    columnsProps: ColumnProps[],
    editable?: boolean,
    data: Dict,
    onValueChanged: (val: TDataType, field: string) => void}) => {
    return (
        <div className='Grid-Row'>
            {
                columnsProps.map((column) => {
                    if (editable) {
                        return <Editor key={column.displayProperty}
                                       value={data[column.displayProperty] || ''}
                                       type={column.type}
                                       editorData={column.editorData}
                                       onValueChanged={(newVal) => {
                                            onValueChanged(newVal, column.displayProperty)
                                       }}/>
                    }
                    return (
                        <Cell  key={column.displayProperty}
                               editorData={column.editorData}
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
                            <Row
                                key={index}
                                columnsProps={props.columnsProps}
                                data={item}
                                editable={props.isEditable}
                                onValueChanged={(newVal: TDataType, field: string) => {
                                    props.onValueChanged?.(newVal, field, index);
                                }}/>
                        )
                    })
                }
            </>
        </div>
    );
}
 
export default Grid;