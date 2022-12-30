import { STUDENTS, WORKS } from './DataMock';

export type TDataType = string | number | boolean | undefined | Dict | Dict[];

export interface Dict {
    [key:string]: TDataType;
}

export interface IWorkData extends Dict {
    Caption: string;
    AuthorID: number;
    Type: string;
    Mark: string;
    Advisor: IAdvisorData;
}

export interface IStudentData extends Dict {
    FullName: string;
    ID: number;
    Year: number;
    Degree: string;
    Faculty: string;
    Finished: boolean;
    Works?: IWorkData[];
}

export interface IAdvisorData extends Dict {
    FullName: string;
    Department: string;
    Degree: string;
}

const DELAY = 250;
const USE_MOCK = true;
const BACKEND_URL = 'http://localhost:8000/';

const API_METHODS = {
    getStudentsList: BACKEND_URL + 'getStudents',
    getStudentInfoByStudentID: BACKEND_URL + 'getStudentInfoByStudentID',
    // getWorksByStudentID: BACKEND_URL + 'getWorksByStudentID',
    // getAdvisorInfoByStudentID: BACKEND_URL + 'getAdvisorInfoByStudentID',
    updateStudentInfo: BACKEND_URL + 'updateStudentInfo',
    createStudent: BACKEND_URL + 'createStudent',
    removeStudent: BACKEND_URL + 'removeStudent',
    createWork: BACKEND_URL + 'createWork',
    removeWork: BACKEND_URL + 'removeWork'
};

export function getStudentsList(): Promise<IStudentData[]> {
    if (USE_MOCK) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(STUDENTS);
            }, DELAY)
        });
    } else {
        return fetch(
            API_METHODS.getStudentsList, 
            {
                mode: 'no-cors'
            }
        )
        .then((response: Response) => {
            return response.json();
        })
        .then(({value}: {value: IStudentData[]}) => {
            return value;
        });
    }
}

export function getStudentInfoByStudentID(ID: number): Promise<IStudentData|null> {
    if (USE_MOCK) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const data = STUDENTS.find((student => student.ID === ID)) || null;
                const worksData = WORKS.filter((work) => work.AuthorID === ID).map(work => ({...work}));
                if (data) {
                    resolve({...data, Works: worksData});
                } else {
                    reject(`Ошбика получения данных. Студент с номером студенческого ${ID} не существует.`);
                }
            }, DELAY)
        });
    } else {
        return fetch(
            API_METHODS.getStudentInfoByStudentID + `?ID=${ID}`, 
            {
                mode: 'no-cors'
            }
        )
        .then((response: Response) => {
            return response.json();
        })
        .then(({value}: {value: IStudentData}) => {
            return value;
        }).catch((reason) => {
            alert(`Ошбика получения данных. Студент с номером студенческого ${ID} не существует.`);
        }).then();
    }
}

export function updateStudentInfo(StudentInfo: IStudentData): Promise<void> {
    if (USE_MOCK) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const index = STUDENTS.findIndex((student => student.ID === StudentInfo.ID));
                if (index !== -1) {
                    STUDENTS[index] = {
                        ...STUDENTS[index],
                        ...StudentInfo
                    }
                    resolve();
                } else {
                    reject()
                }
            }, DELAY)
        });
    } else {
        return fetch(
            API_METHODS.updateStudentInfo, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
                body: JSON.stringify(StudentInfo),
            }).catch((reason) => {
                alert(`Ошбика обновления данных. Студент с номером студенческого ${StudentInfo.ID} не существует, либо он в архиве.`);
            }).then();
    }
}

export function createStudent(StudentInfo: IStudentData): Promise<void> {
    if (USE_MOCK) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const index = STUDENTS.findIndex((student => student.ID === StudentInfo.ID));
                if (index === -1) {
                    STUDENTS.push({
                        ...StudentInfo
                    });
                    resolve();
                } else {
                    reject(`Ошбика создания студента. Студент с номером студенческого ${StudentInfo.ID} уже существует.`);
                }
            }, DELAY)
        });
    } else {
        return fetch(
            API_METHODS.createStudent, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
                body: JSON.stringify(StudentInfo),
            }).catch((reason) => {
                alert(`Ошбика создания студента. Студент с номером студенческого ${StudentInfo.ID} уже существует.`);
            }).then();
    }
}

export function createWork(WorkData: IWorkData): Promise<void> {
    if (USE_MOCK) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                    WORKS.push({
                        ...WorkData,
                    });
                    resolve();
            }, DELAY)
        });
    } else {
        return fetch(
            API_METHODS.createWork, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
                body: JSON.stringify(WorkData),
            }).then();
    }
}