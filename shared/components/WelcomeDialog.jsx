import React, {Component, PropTypes} from 'react';
import cx                            from 'classnames';

import Dialog      from './Dialog.jsx';
import Button      from 'react-mdl/lib/Button';
import IconButton  from 'react-mdl/lib/IconButton';
import Checkbox    from 'react-mdl/lib/Checkbox';

if ( process.env.BROWSER ) {
    require('./WelcomeDialog.less');
}

export default class WelcomeDialog extends Component {

    static contextTypes = { i18n: PropTypes.object };

    static propTypes = {
        isOpen         : PropTypes.bool.isRequired,
        onDismiss      : PropTypes.func.isRequired
    };

    state = {
        currentSlide: 0,
        needToSkip: false
    };

    handleNextSlide = () => {
        const { currentSlide } = this.state;

        this.setState({
            currentSlide: currentSlide + 1
        });
    };

    handlePrevSlide = () => {
        const { currentSlide } = this.state;

        this.setState({
            currentSlide: currentSlide - 1
        });
    };

    handleSkipToggle = () => {
        const { needToSkip } = this.state;

        this.setState({
            needToSkip: !needToSkip
        });
    };

    handleClose = () => {
        const { needToSkip } = this.state;

        this.props.onDismiss(needToSkip);
    };

    render() {
        const { l } = this.context.i18n;
        const { onCreateTest, onDiscoverTests, onLearnMoreAboutItsquiz } = this.props;
        const { currentSlide, needToSkip } = this.state;

        const slides = [
            <div className='WelcomeDialog__slide'>
                <div className='WelcomeDialog__slide-image'>
                    <img src="/static/images/welcome/06.png" />
                </div>

                <div className='WelcomeDialog__slide-content'>
                    <h1> {l('Weeks of English language!')} </h1>
                    <p> {l('In the next 2 weeks you can get gifts from our friends - exclusive discounts on courses of '
                        + 'English language!')}
                    </p>
                    <Button className='WelcomeDialog__btn' raised colored onClick={this.handleNextSlide}>
                        {l('Get exclusive discount')}
                    </Button>
                </div>
            </div>,

            <div className='WelcomeDialog__slide'>
                <div className='WelcomeDialog__slide-image'>
                    <img src="/static/images/welcome/01.png" />
                </div>

                <div className='WelcomeDialog__slide-content'>
                    <h1> {l('Welcome to It\'s quiz!')} </h1>
                    <p> {l('Explore hundreds of open tests on Quiz Wall, check your knowledge, explore new topics, '
                        + 'share your achievements with friends!')}
                    </p>
                    <Button className='WelcomeDialog__btn' raised colored onClick={this.handleNextSlide}>
                        {l('Learn more')}
                    </Button>
                </div>
            </div>,

            <div className='WelcomeDialog__slide'>
                <div className='WelcomeDialog__slide-image'>
                    <img src="/static/images/welcome/03.png" />
                </div>

                <div className='WelcomeDialog__slide-content'>
                    <h1>{l('Check your knowledge')}</h1>
                    <p> {l('Find out your language level, check knowledge of professional topics, pass entertainment '
                        + 'tests or even find a new job! Everything absolutely free!')}</p>
                    <Button className='WelcomeDialog__btn' raised colored onClick={onDiscoverTests}>
                        {l('Discover tests')}
                    </Button>
                </div>
            </div>,

            <div className='WelcomeDialog__slide'>
                <div className='WelcomeDialog__slide-image'>
                    <img src="/static/images/welcome/04.png" />
                </div>

                <div className='WelcomeDialog__slide-content'>
                    <h1> {l('Find best ever employees')} </h1>
                    <p>{l('Filter out candidates who don’t meet your standards before you interview them. '
                        + 'Create test for a position, publish on Quiz Wall, enjoy interviewing only the best!')}</p>
                    <Button className='WelcomeDialog__btn' raised colored onClick={onCreateTest}>
                        {l('Create a vacancy')}
                    </Button>
                </div>
            </div>,

            <div className='WelcomeDialog__slide'>
                <div className='WelcomeDialog__slide-image'>
                    <img src="/static/images/welcome/02.png" />
                </div>

                <div className='WelcomeDialog__slide-content'>
                    <h1> {l('Create your own tests!')} </h1>
                    <p> {l('Everyone can create a test on It\'s quiz! Simply add new questions, compose a quiz, '
                        + 'activate and share with your friends!')} </p>
                    <Button className='WelcomeDialog__btn' raised colored onClick={onCreateTest}>
                        {l('Create a test')}
                    </Button>
                </div>
            </div>
        ];

        const currentSlideIndex = currentSlide % slides.length;

        return (
            <div className='WelcomeDialog'>
                <Dialog
                    className = 'WelcomeDialog__dialog'
                    onRequestClose={this.handleClose}
                    {...this.props}>
                    <div className='WelcomeDialog__content'>
                        <IconButton ripple
                            className = 'WelcomeDialog__close'
                            name      = 'close'
                            onClick   = {this.handleClose}
                        />

                        <div className='WelcomeDialog__carousel'>
                            <IconButton ripple
                                name     = 'keyboard_arrow_left'
                                disabled = {currentSlide === 0}
                                onClick  = {this.handlePrevSlide}
                            />

                            <div className='WelcomeDialog__slide-wrapper'>
                                {slides[currentSlideIndex]}
                            </div>

                            <IconButton ripple
                                name     = 'keyboard_arrow_right'
                                onClick  = {this.handleNextSlide}
                            />
                        </div>

                        <span className='WelcomeDialog__skip'>
                            <Checkbox ripple
                                label={l('Do not show me this message again')}
                                checked={needToSkip}
                                onChange={this.handleSkipToggle}
                            />
                        </span>
                    </div>
                </Dialog>
            </div>
        );
    }
}
