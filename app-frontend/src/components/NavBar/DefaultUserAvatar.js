import React, {Component} from 'react'
import './DefaultUserAvatar.css'
class DefaultUserAvatar extends Component {

    render() {
      let {FirstName, LastName} = this.props;
      let firstCharacter = FirstName.charAt(0).toUpperCase()
      let secondCharacter = LastName.charAt(0).toUpperCase()

      return(
          <div className="default-user-avatar">
            <h2 className="avatar-text">
              {firstCharacter}{secondCharacter}
            </h2>
          </div>
      );
    };
}

export default DefaultUserAvatar;
