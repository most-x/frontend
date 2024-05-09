import { AssetDataType } from '@/app/assetView/[id]/page';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { EditPopupFormDataType } from '../assetView/EditPopup';

export default function DiscardEditPopup({
    id,
    handleEditClosePopup,
}: {
    id: number;
    handleEditClosePopup: () => void;
}) {
    const [editData, setEditData] = useState<AssetDataType>();
    const [editPopupFormData, setEditPopupFormData] = useState<EditPopupFormDataType>({
        sno: 0,
        initialStartDate: '', // 최초개시일자
        saleDate: '', // 실제판매일자
        saleAmount: '', // 실제판매금액
        disposalDate: '', // 실제폐기일자
        disposalAmount: '', // 실제폐기금액
    });

    const [status, setStatus] = useState('정상');

    const handleEditPopupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if ((name === 'salesRecognitionAmount' || name === 'saleAmount' || name === 'disposalAmount') && value !== '') {
            if (isNaN(Number(value))) {
                window.alert('숫자만 입력해주세요');
                return;
            }
            setEditPopupFormData({
                ...editPopupFormData,
                [name]: Number(value),
            });
            return;
        }
        setEditPopupFormData({
            ...editPopupFormData,
            [name]: value,
        });
    };

    const handleRadioChange = (status: '정상' | '매각' | '폐기') => {
        if (status === '매각') {
            setEditPopupFormData({
                ...editPopupFormData,
                saleDate: '',
                saleAmount: '',
            });
        }
        if (status === '폐기') {
            setEditPopupFormData({
                ...editPopupFormData,
                disposalDate: '',
                disposalAmount: '',
            });
        }
        setStatus(status);
    };

    const handleEditSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (editValidate(status)) {
            if (status === '매각') {
                const editData = {
                    ...editPopupFormData,
                    disposalAmount: 0,
                };
                axios.patch('https://japi.mostx.co.kr/api/assets/asset-update', [editData]).then((res) => {
                    console.log(res);

                    console.log(res);
                    // handleSetAssetData(res.data);
                    handleEditClosePopup();
                    window.alert('수정되었습니다');
                });
                return;
            }
            if (status === '폐기') {
                const editData = {
                    ...editPopupFormData,
                    saleAmount: 0,
                };
                axios.patch('https://japi.mostx.co.kr/api/assets/asset-update', [editData]).then((res) => {
                    console.log(res);
                    // handleSetAssetData(res.data);
                    handleEditClosePopup();
                    window.alert('수정되었습니다');
                });
                return;
            }

            axios.patch('https://japi.mostx.co.kr/api/assets/asset-update', [editPopupFormData]).then((res) => {
                console.log(res);
                // handleSetAssetData(res.data);
                handleEditClosePopup();
                window.alert('수정되었습니다');
            });
        }
    };

    const editValidate = (status: string) => {
        if (status === '정상') return true;
        if (status === '매각') {
            if (!editPopupFormData.saleDate) {
                window.alert('실제판매일자를 입력해주세요');
                return false;
            }
            if (!editPopupFormData.saleAmount) {
                window.alert('실제판매금액을 입력해주세요');
                return false;
            }
        }
        if (status === '폐기') {
            if (!editPopupFormData.disposalDate) {
                window.alert('실제폐기일자를 입력해주세요');
                return false;
            }
            if (!editPopupFormData.disposalAmount) {
                window.alert('실제폐기금액을 입력해주세요');
                return false;
            }
        }
        return true;
    };
    console.log(editData);
    useEffect(() => {
        if (!id) return;
        axios.get(`https://japi.mostx.co.kr/api/assets/${id}`).then((res) => {
            console.log(res.data);
            setEditData(res.data);
            const editFormData = {
                sno: res.data.sno,
                initialStartDate: res.data.initialStartDate,
                saleDate: res.data.saleDate,
                saleAmount: res.data.saleAmount,
                disposalDate: res.data.disposalDate,
                disposalAmount: res.data.disposalAmount,
            };
            setEditPopupFormData(editFormData);
        });
    }, []);
    return (
        editData && (
            <section className="popup on input_box">
                <h3>
                    자산 상세 정보
                    <button type="button" className="popup_close" onClick={handleEditClosePopup}></button>
                </h3>
                <form action="" onSubmit={handleEditSubmit}>
                    <div className="search">
                        <h4 className="m_title">기본정보</h4>
                        <ul className="input_list">
                            <li>
                                <h5 className="label">WRMS 자산코드</h5>
                                <p className="text">{editData.wrmsAssetCode}</p>
                            </li>
                            <li>
                                <h5 className="label">WRMS 품목코드</h5>
                                <p className="text">{editData.wrmsItemCode}</p>
                            </li>
                            <li>
                                <h5 className="label">일상구독 상품번호</h5>
                                <p className="text">{editData.ilsangProductCode}</p>
                            </li>
                            <li>
                                <h5 className="label">시리얼 번호</h5>
                                <p className="text">{editData.serialNumber}</p>
                            </li>
                            <li>
                                <h5 className="label">상품명</h5>
                                <p className="text">{editData.productName}</p>
                            </li>
                            <li>
                                <h5 className="label">최초 등록일자</h5>
                                <p className="text">{editData.assetRegistDate}</p>
                            </li>
                            <li>
                                <h5 className="label">최초 등록자 정보</h5>
                                <p className="text">{`${editData.registName} ${editData.registDepartment}`}</p>
                            </li>

                            <li>
                                <h5 className="label">공급가</h5>
                                <p className="text">{`${editData.supplyPrice}원`}</p>
                            </li>
                            <li>
                                <label className="label" htmlFor="">
                                    내용연수
                                </label>
                                <p className="text">{editData.usefulLife ? `${editData.usefulLife}년` : '-'}</p>
                            </li>
                            <li>
                                <h5 className="label">용도</h5>
                                <p className="text">{editData.assetUsage}</p>
                            </li>
                            <li>
                                <label className="label" htmlFor="">
                                    최초개시일자
                                </label>
                                <input
                                    type="date"
                                    className="m_text"
                                    id=""
                                    name="initialStartDate"
                                    value={editPopupFormData.initialStartDate || ''}
                                    onChange={handleEditPopupChange}
                                />
                            </li>
                            <li>
                                <h5 className="label">상태</h5>
                                <fieldset className="input_wrap">
                                    <input
                                        type="radio"
                                        name="status"
                                        id="status02"
                                        onChange={() => handleRadioChange('정상')}
                                    />
                                    <label htmlFor="status02">정상</label>
                                    <input
                                        type="radio"
                                        name="status"
                                        id="status03"
                                        onChange={() => handleRadioChange('매각')}
                                    />
                                    <label htmlFor="status03" className="sale">
                                        매각
                                    </label>
                                    <input
                                        type="radio"
                                        name="status"
                                        id="status04"
                                        onChange={() => handleRadioChange('폐기')}
                                    />
                                    <label htmlFor="status04" className="disuse">
                                        폐기
                                    </label>
                                </fieldset>
                            </li>
                        </ul>
                        {status === '매각' && (
                            <>
                                <h4 className="m_title">매각 정보</h4>
                                <ul className="input_list">
                                    <li>
                                        <label className="label" htmlFor="">
                                            장부가액
                                        </label>
                                        <p className="text">{`${editData.bookValue}원`}</p>
                                    </li>
                                    <li>
                                        <label className="label" htmlFor="">
                                            실제판매일자
                                        </label>
                                        <input
                                            type="date"
                                            name="saleDate"
                                            value={editPopupFormData.saleDate}
                                            className="m_text"
                                            id=""
                                            onChange={handleEditPopupChange}
                                        />
                                    </li>
                                    <li>
                                        <label className="label" htmlFor="">
                                            실제판매금액
                                        </label>
                                        <input
                                            type="text"
                                            name="saleAmount"
                                            value={editPopupFormData.saleAmount}
                                            className="m_text"
                                            id=""
                                            onChange={handleEditPopupChange}
                                        />
                                    </li>
                                </ul>
                            </>
                        )}
                        {status === '폐기' && (
                            <>
                                <h4 className="m_title">폐기 정보</h4>
                                <ul className="input_list">
                                    <li>
                                        <label className="label" htmlFor="">
                                            장부가액
                                        </label>
                                        <p className="text">{`${editData.bookValue}원`}</p>
                                    </li>
                                    <li>
                                        <label className="label" htmlFor="">
                                            실제폐기일자
                                        </label>
                                        <input
                                            type="date"
                                            name="disposalDate"
                                            value={editPopupFormData.disposalDate}
                                            className="m_text"
                                            id=""
                                            onChange={handleEditPopupChange}
                                        />
                                    </li>
                                    <li>
                                        <label className="label" htmlFor="">
                                            실제폐기금액
                                        </label>
                                        <input
                                            type="text"
                                            name="disposalAmount"
                                            value={editPopupFormData.disposalAmount}
                                            className="m_text"
                                            id=""
                                            onChange={handleEditPopupChange}
                                        />
                                    </li>
                                </ul>
                            </>
                        )}
                    </div>
                    <button className="btn blue_back popup_save" type="submit">
                        저장
                    </button>
                </form>
            </section>
        )
    );
}
