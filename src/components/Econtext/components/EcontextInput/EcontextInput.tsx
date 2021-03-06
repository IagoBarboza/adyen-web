import { h } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';
import PersonalDetails from '~/components/internal/PersonalDetails/PersonalDetails';
import useCoreContext from '~/core/Context/useCoreContext';
import { EcontextInputSchema } from '../../types';

export default function EcontextInput(props) {
    const [data, setData] = useState<EcontextInputSchema>({ ...props.data });
    const [isValid, setIsValid] = useState(false);
    const personalDetailsRef = useRef(null);
    const { i18n } = useCoreContext();

    useEffect(() => {
        props.onChange({ data, isValid });
    }, [data, isValid]);

    const handleChange = (state): void => {
        setData({ ...data, ...state.data });
        setIsValid(state.isValid);
    };

    this.showValidation = () => {
        if (personalDetailsRef.current) personalDetailsRef.current.showValidation();
    };

    return (
        <div className="adyen-checkout__econtext-input__field">
            <PersonalDetails
                data={data}
                requiredFields={['firstName', 'lastName', 'telephoneNumber', 'shopperEmail']}
                onChange={handleChange}
                namePrefix="econtext"
                ref={personalDetailsRef}
            />

            {props.showPayButton && props.payButton({ label: i18n.get('confirmPurchase') })}
        </div>
    );
}
