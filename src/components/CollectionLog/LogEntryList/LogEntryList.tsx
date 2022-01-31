import React from 'react';
import { Col } from 'react-bootstrap';

import './LogEntryList.scss';

interface LogEntryListProps {
  entries: { [key: string]: any };
  onEntryChangeHandler: (event: React.MouseEvent<HTMLElement>) => void;
}

class LogEntryList extends React.Component<LogEntryListProps> {

  constructor(props: LogEntryListProps) {
    super(props);
    this.setCompletedEntries();
  }

  setCompletedEntries = () => {
    for (let key in this.props.entries) {
      let completed = true;

      console.log(this.props.entries);
      for (let item of this.props.entries[key].items) {
        if (!item.obtained) {
          completed = false;
          break;
        }
      }
      
      let entry = document.getElementById(key);
      if (entry) {
        entry.className = '';
        if (completed) {
          entry.className = 'text-green';
        }
      }
    }
  }

  componentDidMount() {
    this.setCompletedEntries();
  }

  componentDidUpdate(prevProps: LogEntryListProps) {
    this.setCompletedEntries();
  }

  render() {
    return (
      <Col md='4' id='log-list-container' className='d-none d-md-block'>
        <div id='log-list' className='d-flex flex-column'>
          {Object.keys(this.props.entries).sort((a, b) => {
            a = a.replace(/^The /, '');
            b = b.replace(/^The /, '');
            return a.localeCompare(b);
          }).map((key, _i) => {
            return <p id={key} data-entryname={key} onClick={(e) => this.props.onEntryChangeHandler(e)}>{key}</p>
          })}
        </div>
      </Col>
    );
  }
}

export default LogEntryList;
