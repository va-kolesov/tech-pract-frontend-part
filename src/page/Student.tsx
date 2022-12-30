import React from 'react';
import { getStudentInfoByStudentID, IStudentData, TDataType } from '../Api';
import {default as Grid, ColumnProps} from '../grid/Grid';
import './Student.css';
import {Edit, Exit, Save} from '../Icons';
import Overlay from './Overlay';

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
        width: '1fr',
        template: ({value} : {value: TDataType}) => (<div>{value ? 'Да' : 'Нет'}</div>)
    }
];

const WORK_COLUMNS: ColumnProps[] = [
    {
        displayProperty: 'Caption',
        header: 'Название',
        width: '1fr'
    },
    {
        displayProperty: 'Type',
        header: 'Тип',
        width: '1fr'
    },
    {
        displayProperty: 'Mark',
        header: 'Оценка',
        width: '1fr'
    }
];

const ADVISOR_COLUMNS: ColumnProps[] = [
    {
        displayProperty: 'FullName',
        header: 'ФИО',
        width: '1fr'
    },
    {
        displayProperty: 'Department',
        header: 'Кафедра',
        width: '1fr'
    },
    {
        displayProperty: 'Degree',
        header: 'Научная степень',
        width: '1fr'
    }
];

interface StudentProps {
    selectedStudentID: number;
    onExit: Function;
}
 
interface StudentState {
    loaded: boolean;
    mode: 'read' | 'edit';
    studentData: IStudentData | null;
    worksData: IStudentData | null;
    advisorData: IStudentData | null;
}

class Student extends React.Component<StudentProps, StudentState> {
    props: StudentProps;
    state: StudentState;
    constructor(props: StudentProps) {
        super(props);
        this.state = {
            loaded: false,
            mode: 'read',
            studentData: null,
            worksData: null,
            advisorData: null
        };
    }
    componentDidMount() {
        getStudentInfoByStudentID(this.props.selectedStudentID).then((data) => {
            this.setState({
                studentData: data,
                loaded: true
            });
        })
    }
    render() { 
        return (
            <div className='Student'>
                <Overlay enabled={!this.state.loaded}/>
                <span className='Heading'>Информация про студента</span>
                <div className='Content-Column'>
                {
                    this.state.studentData 
                    ? <Grid columnsProps={STUDENT_COLUMNS} data={[this.state.studentData]}/>
                    : null
                }
                    <div className='Content-Row'>
                        <div className='Content-SubColumn Left'>
                            <span className='Heading'>Научные работы</span>
                            {
                                this.state.studentData 
                                ? <Grid columnsProps={WORK_COLUMNS} data={this.state.studentData.Works || []}/>
                                : null
                            }
                        </div>
                        <div className='Content-SubColumn Right'>
                            <span className='Heading'>Научный руководитель</span>
                            {
                                this.state.studentData 
                                ? <Grid columnsProps={ADVISOR_COLUMNS} data={[this.state.studentData]}/>
                                : null
                            }
                        </div>
                    </div>
                </div>
                <div className='Footer'>
                    { this.state.mode === 'read'
                        ? <Edit onClick={() => this.setState({mode: 'edit'})}/>
                        : <Save onClick={() => this.setState({mode: 'read'})}/>}
                    <Exit onClick={() => this.props.onExit?.()}/>
                </div>
            </div>
        );
    }
}

export default Student;
