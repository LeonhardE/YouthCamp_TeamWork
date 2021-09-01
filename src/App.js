import React, { Component } from 'react';
import './App.css';
import RowItem from './component/RowItem.js'

const gainList = []

class App extends Component 
{
  constructor() 
  {
    super()
    this.state = 
    {
      // 奖品内容
      content: [],
      // 奖品ID
      itemId: [],
      // 被选中的格子的ID
      activedId: '',
      // 中奖ID
      prizeId: null,
      // 获得prizeId之后计算出的动画次数
      times: 0,
      // 当前动画次数
      actTimes: 0,
      // 是否正在抽奖
      isRolling: false,
      // 金币
      gold: 0,
      // 中奖数组
      gainList: []
    }
  }

  componentDidMount()
  {
    // 从后端获取奖品列表
    fetch('http://localhost:5000/prizeinfo')
    .then(res => res.json())
    .then((data) => {
      this.setState({
        content: data.data.prize_content,
        itemId: data.data.prize_id
      })
    })
  }

  handleBegin() 
  {
    // 判断是否在抽取过程中，以及金币是否足够
    if (!this.state.isRolling && this.state.gold > 10) 
    {
      // 通过后台API获取奖品Id和转动次数
      fetch('http://localhost:5000/roll')
      .then(res => res.json())
      .then((data) => {
        console.log("data")
        console.log(data.data.id)
        console.log(data.data.time)
        // 设置状态
        this.setState({
          activedId: 0,
          actTimes: 0,
          isRolling: true,
          gold: this.state.gold - 10,
          prizeId: data.data.id,
          times: data.data.time
        })
      })
      // 抽奖动画执行开始
      this.begin = setInterval(() => 
      {
        if (this.state.activedId === this.state.prizeId && this.state.actTimes > this.state.times) 
        {
          // 符合上述所有条件时才是中奖的时候，两个ID相同并且动画执行的次数大于(或等于也行)设定的最小次数
          clearInterval(this.begin)
          this.setState({
            isRolling: false
          })
          alert('恭喜获得 '+ this.state.content[this.state.prizeId] +'！请联系管理员兑换奖品');
          gainList.push(this.state.content[this.state.prizeId]);
          // console.log(gainList);
          return
        }
        // 以下是动画执行时对id的判断
        if (this.state.activedId === 7) 
        {
          this.setState({
            activedId: 0,
            actTimes: this.state.actTimes + 1
          })
        } 
        else 
        {
          this.setState({
            activedId: this.state.activedId + 1,
            actTimes: this.state.actTimes + 1
          })
        }
      }, 80)
    }
    else if (!this.state.isRolling && this.state.gold < 10)
    {
      // 余额不足
      alert('金币余额不足，请充值')
    }
  }

  chargeGold()
  {
    // 充值
    this.setState({
      gold: this.state.gold + 100
    })
  }

  render() 
  {
    const {content, itemId, activedId, gold} = this.state;
    const newArr = [];
    gainList.forEach((ele,index) => {
      var temp = <li key={index}>{ele}</li>;
      newArr.push(temp);
    })
    return (
      <div className="App">
        <div className="title">幸 运 大 抽 奖</div>
        <div className="left">
          <p className="intro">欢迎来到幸运大抽奖！</p>
          <p className="intro">以下为您目前所持的金币数量。</p>
          <div className="goldNum"> 
            <div className="goldNumText">金 币: {gold} </div>
          </div>
          <button className="charge__btn" onClick={() => this.chargeGold()}>充 值</button>
        </div> 
        <div className="centre">
          <div className="prize__container">
            <div className="container__area">
              <div className="begin__btn" onClick={() => this.handleBegin()}>
                点击开始
              </div>
              <div className="area__row">
                <RowItem content={content[0]} itemId={itemId[0]} activedId={activedId} />
                <RowItem content={content[1]} itemId={itemId[1]} activedId={activedId} />
                <RowItem content={content[2]} itemId={itemId[2]} activedId={activedId} />
              </div>
              <div className="area__row">
                <RowItem content={content[7]} itemId={itemId[7]} activedId={activedId} />
                <RowItem content={content[3]} itemId={itemId[3]} activedId={activedId} />
              </div>
              <div className="area__row">
                <RowItem content={content[6]} itemId={itemId[6]} activedId={activedId} />
                <RowItem content={content[5]} itemId={itemId[5]} activedId={activedId} />
                <RowItem content={content[4]} itemId={itemId[4]} activedId={activedId} />
              </div>
            </div>
          </div>
        </div> 
        <div className="right">
          <p className="lists">您的奖品列表： </p>
          <div className="showLists">
            <ul className="listStyle">{newArr}</ul>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
