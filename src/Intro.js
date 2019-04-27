import React, { Component } from 'react';

export default class Intro extends Component {
    render() {
        return (
            <div className='introWrapper'>
                <div className='introContainer'>
                    <h4>به برنامه ی دفترچه یادداشت خوش آمدید</h4>
                    <p>این یک برنامه کاملا رایگان بوده و برای یادداشت کردن نوشته های شما بکار می‌رود.</p>
                    <p>برای افزودن نوشته روی <i className="fas fa-plus-circle"></i> در گوشه ی صفحه کلیک کنید.</p>
                    <p>و پس از پر کردن عنوان نوشته و نوشته روی <span><span>افزودن</span></span> کلیک کنید.</p>
                    <p style={{ fontSize: '7.5pt' }}>شما کابر گرامی می توانید در راستای هر چه بهتر شدن این برنامه هر گونه نظر و یا پیشنهاد خود را با ما در میان بگذارید.</p>

                </div>
            </div>
        )
    }
}
