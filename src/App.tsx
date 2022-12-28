import React from "react";
import {default as Grid, ColumnProps} from './grid/Grid';
import './App.css';

const STUDENT_COLUMNS: ColumnProps[] = [
    {
        displayProperty: 'FullName',
        header: 'ФИО',
        width: '1fr'
    },
    {
        displayProperty: 'ID',
        header: '№ студенческого',
        width: '1fr'
    },
    {
        displayProperty: 'Year',
        header: 'Год поступления',
        width: '1fr'
    },
    {
        displayProperty: 'Degree',
        header: 'Ступень образования',
        width: '1fr'
    },
    {
        displayProperty: 'Faculty',
        header: 'Факультет',
        width: '1fr'
    },
    {
        displayProperty: 'Finished',
        header: 'Обучение окончено',
        width: '1fr'
    }
]

const STUDENTS_DATA = [
    {
        FullName: 'Колесов Вадим Александрович',
        ID: '12345678',
        Year: 2017,
        Degree: 'Бакалавриат',
        Faculty: 'Математический',
        Finished: true
    }
];
interface AppProps {
    
}
 
interface AppState {
    
}

const URL = '';

class App extends React.Component<AppProps, AppState> {
    componentDidMount() {
        fetch(URL).then((result) => {
            console.log(result);
        });
    }
    render() { 
        return ( 
        <>
            <Grid columnsProps={STUDENT_COLUMNS} data={STUDENTS_DATA}/>
        </> );
    }
}

export default App;
