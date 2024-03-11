import { TODAY } from '@/utils/constants';
import { toComma } from '@/utils/util';
import React, { CSSProperties } from 'react';

export type SearchCategoryType = {
    kind: string;
    percent: number;
    cnt: number;
};

type SearchBoxProps = {
    title: string;
    searchList: SearchCategoryType[];
    isTimeZone?: boolean;
    searchOpen: (e: any, kind: string) => void;
};

export default function SearchBox({ title, searchList, isTimeZone = false, searchOpen }: SearchBoxProps) {
    const isLive = (kind: string) => {
        return `${TODAY.getHours().toString().padStart(2, '0')}시` === kind;
    };

    const liveStyle = {
        position: 'absolute',
        left: '-45px',
        top: '50%',
        transform: 'translateY(-50%)',
        background: 'red',
        color: 'white',
        fontWeight: 'bold',
        padding: '2px 4px',
        borderRadius: '4px',
    };

    const liveBoxStyle = {
        background: '#011E41',
        color: '#fff',
    }

    return (
        <section className="search_box">
            <h3>{title}</h3>
            <ul className="chart_box_h">
                {searchList.map((search, idx: number) => {
                    const { kind, cnt, percent } = search;
                    return (
                        <li key={kind}>
                            <h4>{kind}</h4>
                            {isTimeZone ? (
                                <div className="chart" style={{position: 'relative'}}>
                                    {search.cnt ? (
                                        <>
                                            {isLive(kind) && (
                                                <span style={isLive(kind) ? (liveStyle as CSSProperties) : {}}>
                                                    LIVE
                                                </span>
                                            )}
                                            <a href="" onClick={(e: any) => searchOpen(e, kind)} key={idx}>
                                                <div style={isLive(kind) ? {...liveBoxStyle, width: `${percent}%`} : { width: `${percent}%` }}>{toComma(String(cnt))}</div>
                                            </a>
                                        </>
                                    ) : (
                                        <div style={{ width: `${percent}%` }}>{toComma(String(cnt))}</div>
                                    )}
                                </div>
                            ) : (
                                <div className="chart">
                                    {cnt ? (
                                        <a href="" onClick={(e: any) => searchOpen(e, kind)} key={idx}>
                                            <div style={{ width: `${percent}%` }}>{toComma(String(cnt))}</div>
                                        </a>
                                    ) : (
                                        <div style={{ width: `${percent}%` }}>{toComma(String(cnt))}</div>
                                    )}
                                </div>
                            )}
                        </li>
                    );
                })}
            </ul>
        </section>
    );
}
