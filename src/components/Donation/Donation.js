import { h } from 'preact';
import UIElement from '../UIElement';
import CoreProvider from '../../core/Context/CoreProvider';
import DonationComponent from './components/DonationComponent';

/**
 * DonationElement
 * @extends UIElement
 */
class DonationElement extends UIElement {
    static type = 'donation';

    constructor(props) {
        super(props);
        this.donate = this.donate.bind(this);
    }

    static defaultProps = {
        onCancel: () => {},
        onDonate: () => {}
    };

    /**
     * Returns the component payment data ready to submit to the Checkout API
     * @return {object} data
     */
    get data() {
        return this.state.data;
    }

    /**
     * Returns whether the component state is valid or not
     * @return {boolean} isValid
     */
    get isValid() {
        return this.state.isValid;
    }

    setState(newState) {
        this.state = { ...this.state, ...newState };
    }

    donate() {
        const { data, isValid } = this;
        this.props.onDonate({ data, isValid }, this);
    }

    handleRef = ref => {
        this.componentRef = ref;
    };

    render() {
        return (
            <CoreProvider i18n={this.props.i18n} loadingContext={this.props.loadingContext}>
                <DonationComponent {...this.props} ref={this.handleRef} onChange={this.setState} onDonate={this.donate} />
            </CoreProvider>
        );
    }
}

export default DonationElement;
