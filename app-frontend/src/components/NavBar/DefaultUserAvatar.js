import React, {Component} from 'react'
import './DefaultUserAvatar.css'
class DefaultUserAvatar extends Component {

    render() {
      const {FirstName, LastName} = this.props;
      const firstCharacter = FirstName && FirstName.charAt(0).toUpperCase()
      const secondCharacter = LastName && LastName.charAt(0).toUpperCase()

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
