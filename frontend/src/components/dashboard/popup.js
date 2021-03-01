import React from 'react';


class Popup extends React.Component {
    render() {
        return (
            <div className='popup' style={{
                "position": "fixed",
                "width": "100%",
                "height": "100%",
                "top": "0",
                "left": "0",
                "right": "0",
                "bottom": "0",
                "margin": "auto",
                "background-color": "rgba(0,0,0, 0.5)"

            }
            }>
                <div className='popup_inner' style={{
                    "position": "absolute",
                    "left": "25%" ,
                    "right": "25%" ,
                    "top": "25%" ,
                    "bottom": "25%" ,
                    'margin': "auto",
                    "border-radius" : "20 px",
  'background': 'white'
  }}>
                <h1>{this.props.text}</h1>
                
            </div>
      </div >
    );
    }
}

export default Popup;