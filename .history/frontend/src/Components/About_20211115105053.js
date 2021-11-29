import React from 'react';

const About = () => {
    return (
        <div className="aboutWrapper">
            <div className="image">
                <img src={process.env.PUBLIC_URL + `/images/image.png`}></img>
            </div>
            <div className="text">
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. In iaculis nunc sed augue lacus viverra. Quam viverra orci sagittis eu volutpat odio. Donec massa sapien faucibus et molestie ac feugiat sed lectus. Risus feugiat in ante metus dictum at tempor. Velit aliquet sagittis id consectetur purus ut faucibus. Risus nec feugiat in fermentum. Mauris cursus mattis molestie a. Fringilla est ullamcorper eget nulla. Id interdum velit laoreet id donec ultrices tincidunt arcu.

                    Praesent tristique magna sit amet. Nunc non blandit massa enim nec dui. Feugiat nibh sed pulvinar proin gravida hendrerit. At varius vel pharetra vel turpis nunc eget. Sit amet porttitor eget dolor morbi. Mattis molestie a iaculis at erat pellentesque adipiscing commodo elit. Non pulvinar neque laoreet suspendisse interdum. Commodo ullamcorper a lacus vestibulum sed. In nulla posuere sollicitudin aliquam. Vulputate ut pharetra sit amet. Eleifend quam adipiscing vitae proin sagittis. Euismod lacinia at quis risus sed vulputate odio ut.
                </p>
            </div>
        </div>
    );
};

export default About;