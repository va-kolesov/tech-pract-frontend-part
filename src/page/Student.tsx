import React from 'react';
import { createStudent, getStudentInfoByStudentID, IAdvisorData, IStudentData, IWorkData, TDataType, updateStudentInfo } from '../Api';
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
        type: 'boolean',
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
    selectedStudentID: number | null;
    onExit: Function;
}
 
interface StudentState {
    loaded: boolean;
    changed: boolean;
    mode: 'read' | 'edit';
    studentData: IStudentData | null;
    worksData: IWorkData[] | null;
    advisorData: IAdvisorData[] | null;
}

class Student extends React.Component<StudentProps, StudentState> {
    props: StudentProps;
    state: StudentState;
    constructor(props: StudentProps) {
        super(props);
        this.state = {
            loaded: props.selectedStudentID ? false : true,
            changed: false,
            mode: props.selectedStudentID ? 'read' : 'edit',
            studentData: props.selectedStudentID ? null : {} as IStudentData,
            worksData: props.selectedStudentID ? null : [],
            advisorData: props.selectedStudentID ? null : []
        };
    }
    componentDidMount() {
        if (this.props.selectedStudentID) {
            getStudentInfoByStudentID(this.props.selectedStudentID).then((data) => {
                if (data) {
                    data.Works = data.Works || [];
                    this.setState({
                        worksData: data?.Works || [],
                        advisorData: data?.Works?.map((work)=>work.Advisor),
                        studentData: data,
                        loaded: true
                    });
                } else {

                }
            }).catch(() => {
                this.setState({
                    worksData: null,
                    advisorData: null,
                    studentData: null,
                    loaded: true
                });
            });
        }
    }

    validateData() {
        if (!this.state.studentData) {
            return false;
        } else {
            if (!this.state.studentData.FullName || !this.state.studentData.Degree || !this.state.studentData.Faculty || !this.state.studentData.ID || !this.state.studentData.Year) {
                return false;
            } else {
                this.state.studentData.Works = this.state.worksData || [];
                if (this.state.advisorData?.length !== this.state.worksData?.length) {
                    return false;
                } else {
                    this.state.worksData?.forEach((work, i) => work.Advisor=this.state.advisorData?.[i] as IAdvisorData)
                }
            }
        }
    }
    saveData() {
        if (this.validateData()) {
            if (this.props.selectedStudentID && this.state.studentData) {
                updateStudentInfo(this.state.studentData);
            } else if (this.state.studentData) {
                createStudent(this.state.studentData);
            }
            this.setState({mode: 'read'});
        } else {
            alert('Проверьте правильность введенных данных!');
        }
    }
    render() { 
        return (
            <div className='Student'>
                <Overlay enabled={!this.state.loaded}/>
                <span className='Heading'>Информация про студента</span>
                <div className='Content-Column'>
                {
                    this.state.studentData 
                    ? <Grid isEditable={this.state.mode === 'edit'}
                            columnsProps={STUDENT_COLUMNS}
                            onValueChanged={
                                (val, field) => {
                                    if (this.state.studentData) {
                                        this.state.studentData[field] = val;
                                        this.setState({
                                            studentData: this.state.studentData,
                                            changed: true
                                        });
                                    }
                                }
                            }
                            data={[this.state.studentData]}/>
                    : null
                }
                    <div className='Content-Row'>
                        <div className='Content-SubColumn Left'>
                            <span className='Heading'>Научные работы</span>
                            {
                                this.state.studentData 
                                ? <Grid isEditable={this.state.mode === 'edit'} 
                                        columnsProps={WORK_COLUMNS}
                                        data={this.state.worksData || []}
                                        onValueChanged={
                                            (val, field, index) => {
                                                if (this.state.worksData) {
                                                    this.state.worksData[index][field] = val;
                                                    this.setState({
                                                        worksData: this.state.worksData,
                                                        changed: true
                                                    });
                                                }
                                            }
                                        }
                                        />
                                : null
                            }
                        </div>
                        <div className='Content-SubColumn Right'>
                            <span className='Heading'>Научный руководитель</span>
                            {
                                this.state.studentData 
                                ? <Grid isEditable={this.state.mode === 'edit'}
                                        columnsProps={ADVISOR_COLUMNS}
                                        data={this.state.advisorData || []}
                                        onValueChanged={
                                            (val, field, index) => {
                                                if (this.state.advisorData) {
                                                    this.state.advisorData[index][field] = val;
                                                    this.setState({
                                                        advisorData: this.state.advisorData,
                                                        changed: true
                                                    });
                                                }
                                            }
                                        }/>
                                : null
                            }
                        </div>
                    </div>
                </div>
                <div className='Footer'>
                    { this.state.mode === 'read' && !this.state.studentData?.Finished && <Edit onClick={() => this.setState({mode: 'edit'})}/> }
                    { this.state.mode === 'edit' && <Save onClick={() => this.saveData()}/> || <span/> }
                    <Exit onClick={() => this.props.onExit?.()}/>
                </div>
            </div>
        );
    }
}

export default Student;
