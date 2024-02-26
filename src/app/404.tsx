import type { NextPage } from 'next';

const NotFound: NextPage = () => {
    return (
        <div>
            <article className="index">
                <section className="blue_back">
                    <h1><img src="img/logo_w.svg" alt="모스트엑스 로고" className="logo" /></h1>
                </section>
                <section>
                    <div>
                        <span className="warning">　</span>
                        <h2 className="title">404 ERROR</h2>
                        <p className="warning_msg">페이지를 찾을 수 없습니다.</p>
                        <p className="warning_msg_sub">존재하지 않는 주소를 입력하셨거나<br/>요청하신 페이지의 주소가 변경, 삭제되어 찾을 수 없습니다.</p>
                        <a href="javascript:window.history.back();" className="btn blue_back">뒤로가기</a>				
                    </div>
                </section>
            </article>
        </div>
    );
};

export default NotFound;