import React, {Component} from 'react';
import './Info.css';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

// MEMO!!
class IconText extends Component {

    constructor(props) {
        super(props);

    }


    render() {

        let styleCard = {
            width: '18rem',
            margin:'0 auto',
        }
      
        const imgStyle = {
        margin:'0 auto'
        }
    
        let textContent = {
        backgroundColor: 'rgba(255,255,255,0.5)',
        borderRadius: 15,
        padding: '1.3em',
        color: 'black'
       
        }

        const cardTitle = {
            
            fontSize: '1.8em'
        }

       

       

        return(
            <div className="card-no-bg card mt-sm-3" style={styleCard}>
                <img className="front-page-icon" style={imgStyle} src={this.props.imgSrc} alt="Card image cap" />
                <div className="card-body">
                    <h5 className="card-title" style={cardTitle}>{this.props.title}</h5>
                    <p className="card-text" style={textContent}>
                        {this.props.content}
                    </p>
                </div>
            </div>
        )

    }


}

IconText.propTypes = {
    title: PropTypes.string,
    content: PropTypes.string,
    imgSrc: PropTypes.string,
};

export default IconText;