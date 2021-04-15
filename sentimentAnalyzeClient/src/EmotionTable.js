import React from 'react';
import './bootstrap.min.css';

class EmotionTable extends React.Component {
    render() {
      let emotions = this.props.emotions;
      let key_words = Object.keys(emotions);
      return (
        <div>
          <table className="table table-bordered">
            <tbody>
            {
                key_words.map(function(emotion, index) {
                    return <tr key={emotion}><td>{emotion}</td><td>{emotions[emotion]}</td></tr>;
                })
           }
            </tbody>
          </table>
          </div>
          );
        }

}
export default EmotionTable;
