import React from 'react';
import { toComma } from '@/utils/util';
import { SearchCategoryType } from './SearchBox';

type SearchBoxProps = {
    title: string;
    searchList: SearchCategoryType[];
    isTimeZone?: boolean;
    searchOpen: (kind: string) => void;
};

export default function SearchBoxByChart({ title, searchList, searchOpen }: SearchBoxProps) {
    const totalCnt = searchList.reduce((acc, cur) => acc + cur.cnt, 0);
    console.log(searchList[1].cnt)
    console.log(searchList[0].cnt)
    return (
        <section className="search_box">
                        <h3>{title}</h3>
                        <ul className="chart_box_donut">
                            <li className="chart_donut_wrap">
                                {searchList.map((search, idx: number) => {
                                    const { kind, cnt } = search;
                                    return (
                                        <h4 key={kind}>
                                            {cnt ? (
                                                <a href="#" key={idx} onClick={() => searchOpen(kind)}>
                                                    <span
                                                        style={
                                                            kind === '일반'
                                                                ? { color: '#ddd' }
                                                                : { color: '#011E41' }
                                                        }
                                                    >
                                                        ■{' '}
                                                    </span>
                                                    <strong>{kind}</strong>
                                                    {toComma(String(cnt))}
                                                </a>
                                            ) : (
                                                <a href="#">
                                                    <span
                                                        style={
                                                            kind === '일반'
                                                                ? { color: '#ddd' }
                                                                : { color: '#011E41' }
                                                        }
                                                    >
                                                        ■{' '}
                                                    </span>
                                                    <strong>{kind}</strong>
                                                    {toComma(String(cnt))}
                                                </a>
                                            )}
                                        </h4>
                                    );
                                })}
                                <div
                                    className="chart_donut"
                                    style={{
                                        background: `conic-gradient(#011E41 ${(searchList[1].cnt / totalCnt) * 100}%, #ddd ${100 - ((searchList[0].cnt / totalCnt) * 100)}% 100%)`,
                                    }}

                                ></div>
                            </li>
                        </ul>
                    </section>
    );
}

