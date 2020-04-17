import React, { useState } from 'react';
import { CssBaseline, Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';


const useStyles =
  makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    table: {
      minWidth: 300,
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
    span: {
      marginRight: 150,
    }
  }));

  function calculateRewards(price) {
    if (price >= 50 && price < 100) {
      //a Point for each dollar over 50 until 100
      return price - 50;
    } else if (price > 100) {
      //Every dollar spent over 100 gets 2 points => (price -50) 
      //a Point for each dollar over 50 until 100
      return (2 * (price - 100) + 50);
    }
    return 0;
  }

function Transaction({ index, price, deleteTransaction }) {

  return (
    <TableRow key={index}>
      <TableCell component="th" scope="row">
        {index + 1}
      </TableCell>
      <TableCell>{price}</TableCell>
      <TableCell>{calculateRewards(price)}</TableCell>
      <TableCell>
      <button onClick={() => deleteTransaction(index)}>  <DeleteIcon fontSize="small" /></button>
      </TableCell>
    </TableRow>
  );

}

function NewTransaction({ addTransaction }) {
  const classes = useStyles();
  const [price, setPrice] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (!price) return;
    addTransaction(price);
    setPrice("");
  };

  return (
    
    <form onSubmit={handleSubmit}>
      <span className={classes.span}>Enter a transaction record</span>
      <input
        type="text"
        className="input"
        placeholder="Enter a price value"
        value={price}
        onChange={e => setPrice(e.target.value)}
      />
    </form>
  );
}

function App() {

  const [transactions, setTransactions] = useState([{ id: "1", price: 120, rewards: "" },
  { id: "2", price: 186, rewards: "" },
  { id: "3", price: 36, rewards: "" },
  { id: "4", price: 54, rewards: "" },
  { id: "5", price: 89, rewards: "" },
  { id: "6", price: 230, rewards: "" },
  { id: "7", price: 22, rewards: "" },
  { id: "8", price: 123, rewards: "" },
  { id: "9", price: 456, rewards: "" },
  { id: "10", price: 503, rewards: "" }
  ]);


  const classes = useStyles();

  const addTransaction = price => {
    const newTransactions = [...transactions, { price }];
    setTransactions(newTransactions);
  };

  const deleteTransaction = index => {
    const newTransactions = [...transactions];
    newTransactions.splice(index, 1);
    setTransactions(newTransactions);
  };

  return (

    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="md" >
        <div className={classes.root}>


          <TableContainer component={Paper}>
            <Table className={classes.table} size="small" >
              <TableHead>
                <TableRow>
                  <TableCell>Transaction Id</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Rewards</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {transactions.map((transaction, index) => (
                  <Transaction
                    key={index}
                    index={index}
                    price={transaction.price}
                    deleteTransaction = {deleteTransaction}
                  />
                ))}
                <TableRow>
                  <TableCell colSpan= {2}>
                  <NewTransaction addTransaction={addTransaction} />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        
        </div>
      </Container>
    </React.Fragment>

  );
}

export default App;
