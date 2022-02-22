import React from 'react';
import { Col, Row } from 'react-bootstrap';

import './LogHeader.scss';

interface LogHeaderProps {
  total: string;
  unique: string;
  errorMessage: string | null;
  onSearchHandler: (event: React.FormEvent, username: string) => void;
}

interface LogHeaderState {
  username: string;
}

class LogHeader extends React.Component<LogHeaderProps, LogHeaderState> {

  constructor(props: LogHeaderProps) {
    super(props);
    this.state = {
      username: '',
    };
  }

  onUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ username: e.target.value });
  }

  render() {
    return (
      <Row>
        <Col md='12' className='log-header d-flex flex-column flex-lg-row justify-content-center justify-content-lg-between'>
          <form onSubmit={(e) => this.props.onSearchHandler(e, this.state.username)}>
            <input type='text' name='activeUser' placeholder='Enter username...' onChange={(e) => this.onUsernameChange(e)}></input>
            <button className='log-button' type='submit'>Search</button>
          </form>
          <h4 className='text-orange text-shadow text-center font-weight-bold'>
            Collection Log
            <p>Unique: <span className='text-white'>{this.props.unique}</span> Total: <span className='text-white'>{this.props.total}</span></p>
          </h4>
          {this.props.errorMessage ?
            <div className='error-message'><p>{this.props.errorMessage}</p></div>
            :
            <div className='spacer d-none d-lg-block'></div>
          }
        </Col>
      </Row>
    );
  }
}

export default LogHeader;
