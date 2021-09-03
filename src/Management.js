import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import './Management.css'


const useStyles = theme => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      },
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  });

class Management extends Component
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
      // 奖品概率
      probability: [],

    }
  }

  componentDidMount()
  {
    // 从后端获取奖品列表和概率
    fetch('http://localhost:5000/prizeinfo')
    .then(res => res.json())
    .then((data) => {
      this.setState({
        content: data.data.prize_content,
        itemId: data.data.prize_id,
        probability: data.data.prize_prob,
      })
    })
  }

  contentChange(index,e){
    console.log("修改后的值为：",e.target.value);
    let { content } = this.state;
    content[index] = e.target.value;
    let newArr = content;
    this.setState({
        content:newArr
    })
  }

  probabilityChange(index,e){
    console.log("修改后的值为：",e.target.value);
    let { probability } = this.state;
    probability[index] = parseInt(e.target.value);
    let newArr = probability;
    this.setState({
        probability:newArr
    })
  }

  handleSubmit()
  {
    console.log("handleSubmit()! this.state.content: " + this.state.content)
    console.log("handleSubmit()! this.state.probability: " + this.state.probability)

    var sum = 0
    this.state.probability.forEach(ele => { sum += ele; });
    if (sum !== 100){
      alert("提交失败！概率总和要为100！目前概率总和"+sum+"!")
      return
    }

    var formData = new FormData();
    formData.append("content", this.state.content);
    formData.append("probability", this.state.probability);

    fetch("/setprize", {
      method: "POST",
      headers: new Headers({
        "Access-Control-Allow-Origin": "*",
      }),
      contentType: false,
      processData: false,
      body: formData,
      // dataType: "text",
    })
      .then(res => res.text())          // convert to plain text
      .catch(error => console.error('Error:', error))
      .then(response => {
        console.log('Success:', response)
        alert("提交成功！")
      });
  }

  render() 
  {
    if(this.state.content.length !== 0){
      const { classes } = this.props;
      let {content, itemId, probability} = this.state;

      return (
        <div>
          <div className="btn2">
            <Button variant="outlined" color="secondary" onClick={() => this.toHome()}>前往抽奖页面</Button>
          </div>
          <div className="prize_form">
            <div className="title2">管 理 抽 奖</div>
            <form className={classes.root} noValidate autoComplete="off">
              <TextField
                  required
                  id="outlined-required"
                  label="奖项1"
                  defaultValue={content[0]}
                  variant="outlined"
                  onChange={this.contentChange.bind(this,0)}

              />
              <TextField
                  id="outlined-number"
                  label="对应中奖概率(%)"
                  type="number"
                  InputLabelProps={{
                  shrink: true,
                  }}
                  variant="outlined"
                  defaultValue={probability[0]}
                  onChange={this.probabilityChange.bind(this,0)}
              />
              <br/>
              <TextField
                  required
                  id="outlined-required"
                  label="奖项2"
                  defaultValue={content[1]}
                  variant="outlined"
                  onChange={this.contentChange.bind(this,1)}
              />
              <TextField
                  id="outlined-number"
                  label="对应中奖概率(%)"
                  type="number"
                  InputLabelProps={{
                  shrink: true,
                  }}
                  variant="outlined"
                  defaultValue={probability[1]}
                  onChange={this.probabilityChange.bind(this,1)}
              />
              <br/>
              <TextField
                  required
                  id="outlined-required"
                  label="奖项3"
                  defaultValue={content[2]}
                  variant="outlined"
                  onChange={this.contentChange.bind(this,2)}
              />
              <TextField
                  id="outlined-number"
                  label="对应中奖概率(%)"
                  type="number"
                  InputLabelProps={{
                  shrink: true,
                  }}
                  variant="outlined"
                  defaultValue={probability[2]}
                  onChange={this.probabilityChange.bind(this,2)}
              />
              <br/>
              <TextField
                  required
                  id="outlined-required"
                  label="奖项4"
                  defaultValue={content[3]}
                  variant="outlined"
                  onChange={this.contentChange.bind(this,3)}
              />
              <TextField
                  id="outlined-number"
                  label="对应中奖概率(%)"
                  type="number"
                  InputLabelProps={{
                  shrink: true,
                  }}
                  variant="outlined"
                  defaultValue={probability[3]}
                  onChange={this.probabilityChange.bind(this,3)}
              />
              <br/>
              <TextField
                  required
                  id="outlined-required"
                  label="奖项5"
                  defaultValue={content[4]}
                  variant="outlined"
                  onChange={this.contentChange.bind(this,4)}
              />
              <TextField
                  id="outlined-number"
                  label="对应中奖概率(%)"
                  type="number"
                  InputLabelProps={{
                  shrink: true,
                  }}
                  variant="outlined"
                  defaultValue={probability[4]}
                  onChange={this.probabilityChange.bind(this,4)}
              />
              <br/>
              <TextField
                  required
                  id="outlined-required"
                  label="奖项6"
                  defaultValue={content[5]}
                  variant="outlined"
                  onChange={this.contentChange.bind(this,5)}
              />
              <TextField
                  id="outlined-number"
                  label="对应中奖概率(%)"
                  type="number"
                  InputLabelProps={{
                  shrink: true,
                  }}
                  variant="outlined"
                  defaultValue={probability[5]}
                  onChange={this.probabilityChange.bind(this,5)}
              />
              <br/>
              <TextField
                  required
                  id="outlined-required"
                  label="奖项7"
                  defaultValue={content[6]}
                  variant="outlined"
                  onChange={this.contentChange.bind(this,6)}
              />
              <TextField
                  id="outlined-number"
                  label="对应中奖概率(%)"
                  type="number"
                  InputLabelProps={{
                  shrink: true,
                  }}
                  variant="outlined"
                  defaultValue={probability[6]}
                  onChange={this.probabilityChange.bind(this,6)}
              />
              <br/>
              <TextField
                  required
                  id="outlined-required"
                  label="奖项8"
                  defaultValue={content[7]}
                  variant="outlined"
                  onChange={this.contentChange.bind(this,7)}
              />
              <TextField
                  id="outlined-number"
                  label="对应中奖概率(%)"
                  type="number"
                  InputLabelProps={{
                  shrink: true,
                  }}
                  variant="outlined"
                  defaultValue={probability[7]}
                  onChange={this.probabilityChange.bind(this,7)}
              />
            </form>
            <div className={classes.root} >
                <Button variant="contained" size="large" color="primary" onClick={() => this.handleSubmit()}>提交</Button>
            </div>
          </div>
        </div>
      );
    } 
    else{
      return (
        <div></div>
      )
    }
  }
  toHome(){
    this.props.history.push('/')
  }
}

export default withStyles(useStyles)(Management);