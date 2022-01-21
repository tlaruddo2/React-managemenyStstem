import React, { Component } from 'react';
import './App.css';
import Customer from './components/Customer';
import { Table } from '@material-ui/core';
import { TableHead } from '@material-ui/core';
import { TableBody } from '@material-ui/core';
import { TableRow } from '@material-ui/core';
import { TableCell } from '@material-ui/core';
import { withStyles } from '@material-ui/styles'; //apply scc to material-us
import { Paper } from '@material-ui/core';  //wrap outside of components
import { CircularProgress } from '@material-ui/core';

const styles =  theme => ({
  //findout how to use theme here?
  root:{
    width: '100%',
    // marginTop: theme.spacing.unit *3, 
    // marginTop: theme.spacing(3),
    overflowX: "auto"
  },
  table:{
    minWidth: 1080
  },
  progress:{
    // margin:
  }
});


class App extends Component {
  state = {
    customers:"",
    completed:0 //progress바
  }

  componentDidMount(){
    //0.02초마다 프로그레스바 실행
    this.timer = setInterval(this.progrss,20);
    this.callApi()
      .then(res => this.setState({customers:res}))
      .catch(err => console.log(err)); 
  }
  

  callApi = async() => {
    const response = await fetch('/api/customers');
    const body = await response.json();
    return body;
  }

  progress = () =>{
    const{completed} = this.state;
    this.setState({completed:completed >= 100 ? 0 : completed +1});
  }

  render() { 
    //여기서 왜 이렇게 props를 ?
    const{classes} = this.props
    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>No.</TableCell>
              <TableCell>Photo</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Birthday</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Job</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.customers ? this.state.customers.map( c => { return ( <Customer key={c.id} id={c.id} image={c.image} name={c.name} birthday={c.birthday} gender={c.gender}job={c.job}/>);})
            :
            <TableRow>
              <TableCell colSpan = "6" align="center">
                <CircularProgress className= {classes.progress}/>
              </TableCell>
            </TableRow>
            }
          </TableBody>
        </Table>
      </Paper>
      
    );
  }
}

export default withStyles(styles)(App);