import { Col, Row } from 'react-bootstrap';

import LogItem from '../LogItem/LogItem';

import './LogItems.scss';

interface LogItemsProps {
  entryName: string;
  data: {[key: string]: any};
}

const LogItems = (props: LogItemsProps) => {
  const obtained = (props.data['items'] as Array<any>).filter((item, _i) => {
    return item.obtained;
  }).length;
  const total = props.data['items'].length;

  let obtainedClass = '';
  if (obtained == total) {
    obtainedClass = 'text-green';
  } else if (obtained == 0) {
    obtainedClass = 'text-red';
  }

  return (
    <Col md='8' className='log-item-container'>
      <div className='log-entry-info'>
        <h5>{props.entryName}</h5>
        <p>Obtained: <span className={obtainedClass}>{obtained}/{total}</span></p>
        {props.data['kill_count'] != undefined &&
        (props.data['kill_count'] as Array<string>).map((kc, _i) => {
          return <p>{`${kc.split(': ')[0]}`}: <span>{kc.split(': ')[1]}</span></p>
        })}
      </div>
      <div className='log-items'>
        {(props.data['items'] as Array<any>).map((item, _i) => {
            return <LogItem item={item} />
        })}
      </div>
    </Col>
  );
};

export default LogItems;
