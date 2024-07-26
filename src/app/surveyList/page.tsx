/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LargeNumberLike } from 'crypto';
import { convertDate } from '@/utils/util';
import { SURVEYDATES } from '@/utils/constants';

export type SurveySerchDataType = {
    id: number;
    serveyOne: number;
    serveyTwo: number;
    serveyThree: number;
    serveyFour: number;
    serveyFive: number;
    avgScore: number;
    totalScore: number;
    userName: string;
    userPhone: string;
    consultantName: string;
    platform: string;
    serveyNumber: string;
    createdDate: string;
}

function surveyList() {

    const [surveySearchData, setSurveySearchData] = useState<SurveySerchDataType[]>([]);
    const [surveyData, setSurveyData] = useState<SurveySerchDataType[]>([]);
    const [totalCnt, setTotalCnt] = useState<number>(0);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [totalPage, setTotalPage] = useState<number>(0);
    
    const [limit, setLimit] = useState(10);
    const pageLimit = 10;

    const [surveySearchForm, setSurveySearchForm] = useState({
        scoreType: '',
        searchWord: '',
        totalScore: '',
        startDate: '',
        endDate: '',
        size:10
    });

    console.log(surveyData);
    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
    
        console.log("name", value);
        
        if ((name === 'userPhone' ||
            name === 'totalScore' ||
            name === 'avgScore') &&
             value !== ''
        ) {
            if (isNaN(Number(value))) {
                window.alert('숫자만 입력해주세요');
                return;
            }
            setSurveySearchForm({
                ...surveySearchForm,
                [name]: Number(value),
            });
            return;
        }
        setSurveySearchForm({
            ...surveySearchForm,
            [name]: value,
        })
    };

    const handleSelectOptionChange = (e:React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        console.log(name, value);
        setSurveySearchForm({
            ...surveySearchForm,
            [name]: value,
        });
    }

    useEffect( () => {
        axios
            .get(`https://japi.mostx.co.kr/api/servey/list`, {
                params: {
                    ...surveySearchForm,
                    pageNumber,
                },
            })
            .then((res) => {
                console.log(res.data);
                console.log(res.data.data);
                setTotalCnt(res.data.totalElements);
                setSurveyData(res.data.data);
                setTotalPage(res.data.totalPage);
            });
    },[pageNumber]);

    const handleNextPage = () => {
        if (pageNumber === totalPage) return;
        setPageNumber(pageNumber + 1);
    };

    const handlePrevPage = () => {
        if (pageNumber === 1) return;
        setPageNumber(pageNumber - 1);
    };

    const handleSearchFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        axios.
            get(`https://japi.mostx.co.kr/api/servey/list`, {
                params: {
                    ...surveySearchForm,
                    page:1,
                },
            })
            .then((res) => {
                console.log("res", res);
                console.log("data", res.data.data);
                setSurveySearchData(res.data.data);
                setTotalCnt(res.data.totalCnt);
                setTotalPage(res.data.totalPage);
                setPageNumber(1);
            })
    }

    const now = new Date();
    const today = now.toISOString().slice(0, 10)
    const [startDate, setStartDate] = useState(today);
    const [endDate, setEndDate] = useState(today);

    const getToday = () => {
        return new Date;
    }

    const getOneWeekAgo = () => {
        const date = new Date();

        date.setDate(date.getDate() - 7);
        return date;
    }

    const getOneMonthAgo = () => {
        const date = new Date();
        date.setMonth(date.getMonth() - 1);
        return date;
    }

    const getOneYearAgo = () => {
        const date = new Date();
        date.setFullYear(date.getFullYear() - 1);
        return date;
    }

    const [selectedDate, setSelectDate] = useState(getToday());

    const handleChange = (event) => {
        const value = event.target.value;
        let date;

        switch(value) {
            case 'today':
                date = getToday();
                break;
            case 'oneWeek':
                date = getOneWeekAgo();
                break;
            case 'oneMonth':
                date = getOneMonthAgo();
                break;
            case 'oneYear':
                date =getOneYearAgo();
                break;
            default:
                date = getToday();
        }
        setSelectDate(date);
    };



    return (
        <div>
            <header>
                <h1><a href="index.html" className="logo"><img src="img/logo_w.svg" alt="모스트엑스 로고" /></a>만족도 조사 관리<a href="index.html" className="exit"><img src="img/exit.svg" alt="모스트엑스 로고" /></a></h1>
                <nav>
                    <ul className="nav">
                        <li className="on"><a className="link" href="survey.html">만족도 조사 현황</a></li>
                        <li><a className="link" href="survey_statistics.html">만족도 조사 통계</a></li>
                    </ul>
                </nav>			
            </header>

            <article className="status">
                <h2 className="sub_title">만족도 조사 현황</h2>
                <section className="search_box">
                    <h3>검색</h3>
                    <details open>
                    <form onSubmit={handleSearchFormSubmit} action="" className="search">
                        <ul className="search_list_full">
                            <li>
                                <div className="flex_center">
                                <label className="label" htmlFor="">검색기간</label>
                                <input
                                    type="date"
                                    id="startDate"
                                    onChange = {(e) => setStartDate(e.target.value)}
                                    name={startDate}
                                    defaultValue={today}
                                    className="s_text"
                                    max="9999-12-31"
                                />
                                <span className="date_blank">-</span>
                                <input 
                                    type="date"
                                    id="endDate"
                                    onChange= {(e) => setEndDate(e.target.value)}
                                    name={endDate}
                                    defaultValue={today}
                                    className="s_text"
                                    max='9999-12-31'
                                />

                                {/* SURVEYDATES */}
                                <fieldset className="date_radio">
                                    {/* <input type="radio" id="radio_today" name="date_radio" defaultChecked />
                                    <label htmlFor="radio_today">오늘</label>
                                    <input type="radio" id="radio_week" name="date_radio" />
                                    <label htmlFor="radio_week">1주일</label>
                                    <input type="radio" id="radio_month" name="date_radio" />
                                    <label htmlFor="radio_month">1개월</label>
                                    <input type="radio" id="radio_year" name="date_radio" />
                                    <label htmlFor="radio_year">1년</label> */}
                                    {/* {SURVEYDATES.map((data) => (
                                        <div key={data.id}>
                                            <input
                                                type='radio'
                                                id={data.id}
                                                name='date_radio'
                                                checked={selectedDate === data.id}
                                                onChange={handleDateChange}
                                                value={data.id}
                                            />
                                            <label htmlFor={data.id}>{data.label}</label>
                                        </div>
                                    ))
                                    } */}
                                    <input
                                        type="radio"
                                        value="today"
                                        checked = {selectedDate.toDateString() === getToday().toDateString()}
                                        onChange = {handleChange}
                                    />
                                    <label htmlFor="radio_tody">오늘</label>
                                    <input
                                        type="radio"
                                        value="today"
                                        checked = {selectedDate.toDateString() === getOneWeekAgo().toDateString()}
                                        onChange = {handleChange}
                                    />
                                    <label htmlFor="radio_tody">1주일</label>
                                    <input
                                        type="radio"
                                        value="today"
                                        checked = {selectedDate.toDateString() === getOneMonthAgo().toDateString()}
                                        onChange = {handleChange}
                                    />
                                    <label htmlFor="radio_tody">1개월</label>
                                    <input
                                        type="radio"
                                        value="today"
                                        checked = {selectedDate.toDateString() === getOneYearAgo().toDateString()}
                                        onChange = {handleChange}
                                    />
                                    <label htmlFor="radio_tody">1개월</label>
                                </fieldset>
                                </div>
                            </li>					
                            <li>
                                <label className="label" htmlFor="">검색어</label>
                                <select
                                    name=""
                                    // onChange={}
                                    // value={}
                                    id=""
                                >
                                    <option value="" selected>
                                        전체
                                    </option>
                                    <option value="serveyNumber">상담번호</option>
                                    <option value="userName">상담자명</option>
                                    <option value="userPhone">상담자번호</option>
                                </select>
                                <input 
                                    type="text" 
                                    id=""
                                    onChange={handleFormChange}
                                    name={'searchWord'}
                                    //value = {surveySearchForm.searchWord}
                                    className="l_text"
                                    placeholder="검색어를 입력해주세요"
                                />
                            </li>
                            <li className="flex">
                                <label className="label" htmlFor="">인입경로</label>
                                <fieldset className="date_radio checkbox">
                                        <input type="checkbox" id="cateall" checked />
                                        <label htmlFor="cateall">전체</label>							
                                        <input type="checkbox" id="cate01" />
                                        <label htmlFor="cate01">WRMS</label>
                                        <input type="checkbox" id="cate02" />
                                        <label htmlFor="cate02">일상구독</label>
                                </fieldset>
                            </li>
                            <li>
                                <label className="label" htmlFor="">점수검색</label>
                                <select 
                                    name="scoreType"
                                    onChange = {handleSelectOptionChange}
                                    //value = {surveySearchForm.scoreType}
                                    id=""
                                >
                                    <option value="" selected>
                                        선택
                                    </option>
                                    <option value="totalScore">총점</option>
                                    <option value="avgScore">평균</option>
                                </select>
                                <input type="text" id="" className="s_text" placeholder="최소" />
                                <span>-</span>
                                <input type="text" id="" className="s_text" placeholder="최대" />
                                <span className="redtxt">&nbsp;※ 매우만족 5점, 만족 4점, 보통 3점, 불만 2점, 매우불만 1점</span>
                            </li>
                        </ul>
                        <div className="flex" style= {{ width: '400px', margin: 'auto' }}>
                            <button className="btn" type="submit" style= {{ marginRight: '10px'}} >검색</button>
                            <button className="btn re_btn" type="submit">초기화</button>
                        </div>
                    </form>	
                    <summary></summary>
                    </details>
                </section>
                <section>
                    <h3 className="hidden">결과표</h3>
                    <div className="table_top">
                        <div className="sb_flex">
                            <p>총 {totalCnt} 건</p>
                            <form action="" className="table_select">
                                <button type="submit" className="btn blue_back select_btn excel"><span className="down">&nbsp;</span>엑셀 다운로드</button>
                                    <select
                                        onChange={(e) => {
                                            setLimit(Number(e.target.value));
                                        }}
                                        name=""
                                        id=""
                                    >
                                        <option value={10}>10건씩 조회</option>
                                        <option value={20}>20건씩 조회</option>
                                        <option value={30}>30건씩 조회</option>
                                        <option value={50}>50건씩 조회</option>
                                        <option value={100}>100건씩 조회</option>
                                    </select>						
                            </form>
                        </div>
                    </div>
                    <table className="table">
                        <thead>					
                            <tr>
                                <th>인입경로</th>
                                <th>상담번호</th>
                                <th>상담원</th>
                                <th>고객명</th>
                                <th>고객 번호</th>
                                <th>질문1</th>
                                <th>질문2</th>
                                <th>질문3</th>
                                <th>질문4</th>
                                <th>질문5</th>
                                <th>평균
                                    {/* <button className="align_down">&nbsp;</button> */}
                                </th>
                                <th>총점
                                    {/* <button className="align_up">&nbsp;</button> */}
                                </th>
                                <th>참여일자</th>
                            </tr>
                        </thead>
                        <tbody>
                            {surveyData.map((data, id) => {
                                return(
                                <tr key= {id} >
                                    <td> {data.platform} </td>
                                    <td> {data.serveyNumber} </td>
                                    <td> {data.consultantName} </td>
                                    <td> {data.userName} </td>
                                    <td> {data.userPhone} </td>
                                    <td> {data.serveyOne} </td>
                                    <td> {data.serveyTwo} </td>
                                    <td> {data.serveyThree} </td>
                                    <td> {data.serveyFour} </td>
                                    <td> {data.serveyFive} </td>
                                    <td> {data.avgScore} </td>
                                    <td> {data.totalScore} </td>
                                    <td> {data.createdDate} </td>
                                </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    <div className="center_flex page">
                        <a href="#" onClick={() => setPageNumber(1)}>처음</a>
                        <a href="#" onClick={handlePrevPage}>&nbsp;〈&nbsp;&nbsp;&nbsp;</a>
                        {
                            // total 페이지로 페이지네이션 뷰 구현해줘
                            new Array(totalPage).fill(0).map((_, index) => {
                                return (
                                    <a
                                        href="#"
                                        className={pageNumber === index + 1 ? 'on' : ''}
                                        onClick={() => setPageNumber(index + 1)}
                                        key={index}
                                    >
                                        {index + 1}
                                    </a>
                                );
                            })
                        }
                        <a href="#" onClick={handleNextPage}>&nbsp;&nbsp;&nbsp;〉&nbsp;</a>
                        <a href="#" onClick={() => setPageNumber(totalPage)}>끝</a>
                    </div>
 
                </section>
            </article>
        </div>
    );
}

 export default surveyList;