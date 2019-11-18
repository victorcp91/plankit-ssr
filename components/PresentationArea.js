import React from 'react';

const presentationArea = React.memo(props => (
  <>
    <p className="presentationText">{props.text}</p>
    <hr className="divisor"/>
    <style jsx>{`
    .presentationText{
      width: 100%;
      max-width: 864px;
      margin: 25px auto;
      padding: 0 20px;
      font-size: 18px;
      line-height: 30px;
      font-family: 'Helvetica Light';
      box-sizing: border-box;
    }
    .divisor{
      border: 2px solid $lightGray;
      border
    `}</style>
  </>
));

export default presentationArea;