import React, { Component } from 'react';

export default class Intro extends Component {
    render() {
        return (
            <div className='introWrapper'>
                <div style={{ height: '60px' }} className='introContainer'>
                    <h4 className='searchResult'>
                        <i style={{ fontSize: '16pt', padding: '0px 7px' }} className="fas fa-search fa-flip-horizontal"></i>
                        جستوجوی شما نتیجه ای نداشت!
                    </h4>

                </div>
            </div>
        )
    }
}